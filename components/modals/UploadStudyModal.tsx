"use client";

import { useState, useRef } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { FamilyMember } from "@/types";
import { uploadStudy } from "@/user-dashboard/server-actions/upload-study";
import { analyzeStudyWithAI } from "@/user-dashboard/server-actions/analyze-study";
import { extractTextFromFile } from "@/lib/ocr-utils";
import { quickValidateFileType } from "@/lib/file-validator";
import { useRouter } from "next/navigation";
import moment from "moment";
import { STUDY_FIELD_LIMITS } from "@/config/constants";

interface UploadStudyModalProps {
  show: boolean;
  onHide: () => void;
  familyMembers?: FamilyMember[];
  familyMemberId?: string; // If provided, preselect this family member
}

export default function UploadStudyModal({
  show,
  onHide,
  familyMembers = [],
  familyMemberId,
}: UploadStudyModalProps) {
  const router = useRouter();
  const modalTopRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(moment().format("DD-MM-YYYY")); // Formato DD-MM-YYYY
  const [institution, setInstitution] = useState("");
  const [doctor, setDoctor] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState<string>(familyMemberId || "self");

  // Función para convertir DD-MM-YYYY a YYYY-MM-DD (para el input)
  const formatDateForInput = (dateStr: string): string => {
    const parsed = moment(dateStr, "DD-MM-YYYY", true);
    return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
  };

  // Función para convertir YYYY-MM-DD a DD-MM-YYYY (desde el input)
  const formatDateFromInput = (dateStr: string): string => {
    const parsed = moment(dateStr, "YYYY-MM-DD", true);
    return parsed.isValid() ? parsed.format("DD-MM-YYYY") : "";
  };

  // Estados para el flujo de análisis
  const [ocrText, setOcrText] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [ocrProgress, setOcrProgress] = useState<string>("");

  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = async (file: File) => {
    const validation = await quickValidateFileType(file);
    if (!validation.isValid) {
      setErrorMessage(validation.error || "Archivo no válido");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setErrorMessage(null);
    setAnalyzed(false);
    setOcrText("");
    setTitle("");
    setDate(moment().format("DD-MM-YYYY"));
    setInstitution("");
    setDoctor("");
    setConclusion("");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!(uploading || analyzing)) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (uploading || analyzing) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setErrorMessage("Por favor, seleccioná un archivo.");
      return;
    }

    setAnalyzing(true);
    setErrorMessage(null);
    setOcrProgress("Iniciando análisis...");

    // Hacer scroll al top del modal usando scrollIntoView
    setTimeout(() => {
      if (modalTopRef.current) {
        modalTopRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 50);

    try {
      // Paso 1: Extraer texto del archivo con OCR
      setOcrProgress("Extrayendo texto del documento...");
      const ocrResult = await extractTextFromFile(selectedFile, (progress) => {
        setOcrProgress(progress);
      });

      if (!ocrResult.success || !ocrResult.text) {
        setTimeout(() => {
          if (modalTopRef.current) {
            modalTopRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 50);
        setErrorMessage(ocrResult.error || "No se pudo extraer texto del documento.");
        setAnalyzing(false);
        setOcrProgress("");
        return;
      }

      setOcrText(ocrResult.text);
      setOcrProgress("Analizando documento con inteligencia artificial...");

      // Paso 2: Analizar con IA
      const analysisResult = await analyzeStudyWithAI(ocrResult.text);

      if (!analysisResult.success) {
        setTimeout(() => {
          if (modalTopRef.current) {
            modalTopRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 50);
        setErrorMessage(analysisResult.message || "Error al analizar el documento.");
        setAnalyzing(false);
        setOcrProgress("");
        return;
      }

      // Paso 3: Inyectar datos analizados en el formulario
      if (analysisResult.studyName && analysisResult.studyName.trim()) {
        setTitle(analysisResult.studyName);
      }
      if (analysisResult.institution && analysisResult.institution.trim()) {
        setInstitution(analysisResult.institution);
      }
      if (analysisResult.doctor && analysisResult.doctor.trim()) {
        setDoctor(analysisResult.doctor);
      }
      if (analysisResult.conclusion && analysisResult.conclusion.trim()) {
        setConclusion(analysisResult.conclusion);
      }
      if (analysisResult.studyDate && analysisResult.studyDate.trim()) {
        // La fecha ya viene en formato DD-MM-YYYY desde la IA
        setDate(analysisResult.studyDate);
      }

      setAnalyzed(true);
      setAnalyzing(false);
      setOcrProgress("");
    } catch (error) {
      console.error("Error al analizar estudio:", error);
      setErrorMessage("Ocurrió un error al analizar el documento. Por favor, intentá nuevamente.");
      setTimeout(() => {
        if (modalTopRef.current) {
          modalTopRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 50);
      setAnalyzing(false);
      setOcrProgress("");
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setErrorMessage("Por favor, seleccioná un archivo.");
      setTimeout(() => {
        if (modalTopRef.current) {
          modalTopRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 50);
      return;
    }

    setUploading(true);
    setErrorMessage(null);

    try {
      // Generate title if empty: "Compartido [fecha]"
      const dateMoment = moment(date).format("DD-MM-YYYY");
      const finalTitle = title.trim() || `Estudio médico`;

      // Crear FormData para enviar al server action
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", finalTitle);
      formData.append("date", date); // Enviar en formato DD-MM-YYYY
      if (institution.trim()) {
        formData.append("institution", institution.trim());
      }
      if (doctor.trim()) {
        formData.append("medico", doctor.trim());
      }
      if (conclusion.trim()) {
        formData.append("conclusion", conclusion.trim());
      }
      if (description.trim()) {
        formData.append("description", description.trim());
      }
      formData.append("familyMemberId", owner);

      // Llamar al server action
      const result = await uploadStudy(formData);

      if (result.success) {
        setUploadSuccess(true);
        setUploading(false);
        // Refrescar la página para mostrar el nuevo estudio
        router.refresh();
      } else {
        setErrorMessage(result.message);
        setTimeout(() => {
          if (modalTopRef.current) {
            modalTopRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 50);
        setUploading(false);
      }
    } catch (error) {
      console.error("Error al subir estudio:", error);
      setErrorMessage("Ocurrió un error inesperado. Por favor, intentá nuevamente.");
      setTimeout(() => {
        if (modalTopRef.current) {
          modalTopRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 50);
      setUploading(false);
    }
  };

  const handleClose = () => {
    if ((uploading || analyzing) && !uploadSuccess) return; // No cerrar mientras se está procesando

    onHide();
    setTimeout(() => {
      setSelectedFile(null);
      setTitle("");
      setDate(moment().format("DD-MM-YYYY"));
      setInstitution("");
      setDoctor("");
      setConclusion("");
      setDescription("");
      setOwner(familyMemberId || "self");
      setOcrText("");
      setAnalyzing(false);
      setAnalyzed(false);
      setOcrProgress("");
      setUploadSuccess(false);
      setErrorMessage(null);
      setUploading(false);
    }, 750)
  };

  const isValid = selectedFile; // Solo el archivo es obligatorio

  return (
    <Modal show={show} onHide={handleClose} centered size="lg"
      // fullscreen="sm-down"
      backdrop="static">
      <Modal.Header closeButton={!uploading && !analyzing} className="border-0 pb-0" ref={modalTopRef}>
        <Modal.Title className="h5 fw-semibold">
          {uploadSuccess ? "Estudio subido" : "Subir estudio médico"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={analyzed ? handleConfirm : handleAnalyze}>
        <Modal.Body>
          {uploadSuccess ? (
            // Success State
            <div className="text-center py-4">
              <div
                className="d-inline-flex align-items-center justify-content-center mb-4"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#E8F5E9",
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.3333 10L15 28.3333L6.66667 20"
                    stroke="#2E7D32"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="fw-semibold mb-3" style={{ color: "#1B5E20" }}>
                Estudio subido con éxito
              </h4>
              <p className="text-muted mb-4">
                Tu estudio médico ha sido guardado de forma segura y ya está disponible en tu historial.
              </p>
              <Button
                className="btn-primary-saluteca"
                onClick={handleClose}
              >
                Aceptar
              </Button>
            </div>
          ) : (
            // Form State
            <>
              {errorMessage && (
                <div
                  className="mb-3 p-3 rounded-3 position-relative"
                  style={{
                    backgroundColor: 'rgba(254, 235, 238, 0.95)',
                    border: '1px solid #FFCDD2',
                    animation: 'slideDown 0.3s ease-out'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#EF5350',
                        borderRadius: '50%',
                        flexShrink: 0
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span style={{
                      color: '#B71C1C',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      flex: 1,
                      paddingRight: '24px'
                    }}>
                      {errorMessage}
                    </span>
                    <button
                      type="button"
                      onClick={() => setErrorMessage(null)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.7,
                        transition: 'opacity 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                      aria-label="Cerrar"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 4L4 12M4 4L12 12"
                          stroke="#B71C1C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {ocrProgress && analyzing && (
                <div
                  className="mb-3 p-3 rounded-3"
                  style={{
                    backgroundColor: '#E3F2FD',
                    border: '1px solid #90CAF9'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Spinner
                      animation="border"
                      size="sm"
                      className="me-3"
                      style={{
                        color: '#016390',
                        borderWidth: '2px'
                      }}
                    />
                    <span style={{
                      color: '#014A6B',
                      fontSize: '0.9375rem',
                      fontWeight: 500
                    }}>
                      {ocrProgress}
                    </span>
                  </div>
                </div>
              )}

              {analyzed && !analyzing && (
                <div
                  className="mb-3 p-3 rounded-3"
                  style={{
                    backgroundColor: '#E8F5E9',
                    border: '1px solid #A5D6A7'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#7ABB85',
                        borderRadius: '50%',
                        flexShrink: 0
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.6667 5L7.5 14.1667L3.33333 10"
                          stroke="#FFFFFF"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span style={{
                      color: '#2D5F3F',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      lineHeight: 1.5
                    }}>
                      Documento analizado correctamente. Revisá los datos y confirmá para guardar.
                    </span>
                  </div>
                </div>
              )}

              {/* File Upload */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">
                  Archivo <span className="text-danger">*</span>
                </Form.Label>
                <div
                  className="border border-2 border-dashed rounded p-4 text-center"
                  style={{
                    borderColor: isDragging
                      ? "var(--saluteca-primary)"
                      : selectedFile
                        ? "var(--saluteca-secondary)"
                        : "#dee2e6",
                    backgroundColor: isDragging
                      ? "#e8f4fd"
                      : selectedFile
                        ? "#f0f9f4"
                        : "#f8f9fa",
                    cursor: (uploading || analyzing) ? "not-allowed" : "pointer",
                    opacity: (uploading || analyzing) ? 0.6 : 1,
                    transition: "border-color 0.2s ease, background-color 0.2s ease",
                  }}
                  onClick={() => !(uploading || analyzing) && document.getElementById("fileInput")?.click()}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {selectedFile ? (
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="20" cy="20" r="20" fill="var(--saluteca-secondary)" fillOpacity="0.2" />
                        <path
                          d="M21.6667 13.3333H15C14.558 13.3333 14.1341 13.5089 13.8215 13.8215C13.5089 14.1341 13.3333 14.558 13.3333 15V25C13.3333 25.442 13.5089 25.8659 13.8215 26.1785C14.1341 26.4911 14.558 26.6667 15 26.6667H25C25.442 26.6667 25.8659 26.4911 26.1785 26.1785C26.4911 25.8659 26.6667 25.442 26.6667 25V18.3333L21.6667 13.3333Z"
                          stroke="var(--saluteca-secondary)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.6667 13.3333V18.3333H26.6667"
                          stroke="var(--saluteca-secondary)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-start">
                        <div className="fw-medium text-dark">Estudio seleccionado</div>
                        <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                      <Button
                        variant="link"
                        className="text-danger ms-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          setAnalyzed(false);
                          setOcrText("");
                          setTitle("");
                          setDate(moment().format("DD-MM-YYYY"));
                          setInstitution("");
                          setDoctor("");
                          setConclusion("");
                        }}
                        disabled={uploading || analyzing}
                      >
                        Eliminar
                      </Button>
                    </div>
                  ) : (
                    <>
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mb-3"
                      >
                        <path
                          d="M24 16V32"
                          stroke="var(--saluteca-gray)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 24H32"
                          stroke="var(--saluteca-gray)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="12"
                          stroke="var(--saluteca-gray)"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                      </svg>
                      <div className="fw-medium mb-1">
                        {isDragging ? "Soltá el archivo aquí" : "Arrastrá un archivo o hacé clic para seleccionar"}
                      </div>
                      <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                        PDF, JPG, PNG, DOCX (máx. 10MB)
                      </div>
                    </>
                  )}
                  <Form.Control
                    id="fileInput"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.docx"
                    onChange={handleFileChange}
                    className="d-none"
                    disabled={uploading || analyzing}
                  />
                </div>
              </Form.Group>

              {/* Date - OPCIONAL */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  Fecha <span className="text-muted">(opcional)</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  value={formatDateForInput(date)}
                  onChange={(e) => setDate(formatDateFromInput(e.target.value))}
                  max={new Date().toISOString().split("T")[0]}
                  maxLength={STUDY_FIELD_LIMITS.date}
                  disabled={!analyzed || uploading || analyzing}
                />
                <Form.Text className="text-muted" style={{ fontSize: "0.8rem" }}>
                  {analyzed ? "Modificá si es necesario" : "Se completará automáticamente al analizar"}
                </Form.Text>
              </Form.Group>

              {/* Title (optional) */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  Nombre del estudio <span className="text-muted">(opcional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Hemograma completo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={STUDY_FIELD_LIMITS.title}
                  disabled={!analyzed || uploading || analyzing}
                />
                <Form.Text className="text-muted" style={{ fontSize: "0.8rem" }}>
                  {analyzed ? "Modificá si es necesario" : "Se completará automáticamente al analizar"}
                </Form.Text>
              </Form.Group>

              {/* Institution */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  Institución <span className="text-muted">(opcional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Hospital Italiano"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  maxLength={STUDY_FIELD_LIMITS.institution}
                  disabled={!analyzed || uploading || analyzing}
                />
                <Form.Text className="text-muted" style={{ fontSize: "0.8rem" }}>
                  {analyzed ? "Modificá si es necesario" : "Se completará automáticamente al analizar"}
                </Form.Text>
              </Form.Group>

              {/* Doctor */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  Médico <span className="text-muted">(opcional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Dr. Juan Pérez"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  maxLength={STUDY_FIELD_LIMITS.doctor}
                  disabled={!analyzed || uploading || analyzing}
                />
                <Form.Text className="text-muted" style={{ fontSize: "0.8rem" }}>
                  {analyzed ? "Modificá si es necesario" : "Se completará automáticamente al analizar"}
                </Form.Text>
              </Form.Group>

              {/* Conclusion */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  Observaciones <span className="text-muted">(opcional)</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Conclusión o diagnóstico del estudio..."
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  maxLength={STUDY_FIELD_LIMITS.conclusion}
                  // disabled={!analyzed || uploading || analyzing}
                  disabled={true}
                />
                <Form.Text className="text-muted" style={{ fontSize: "0.8rem" }}>
                  {analyzed ? "Modificá si es necesario" : "Se completará automáticamente al analizar"}
                </Form.Text>
              </Form.Group>

              {/* Owner */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">De quién es este estudio</Form.Label>
                <Form.Select
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  disabled={!analyzed || uploading || analyzing || !!familyMemberId}
                >
                  <option value="self">Para mí</option>
                  {familyMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Text className="text-muted" style={{ fontSize: "0.8rem" }}>
                  {analyzed ? "Seleccioná el destinatario" : "Disponible después de analizar"}
                </Form.Text>
              </Form.Group>

              {/* Description */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  Notas adicionales <span className="text-muted">(opcional)</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Agregá cualquier detalle adicional sobre el estudio..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={STUDY_FIELD_LIMITS.description}
                  disabled={!analyzed || uploading || analyzing}
                />
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Text className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {analyzed ? "Agregá notas personales si lo necesitás" : "Disponible después de analizar"}
                  </Form.Text>
                  <Form.Text className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {description.length}/{STUDY_FIELD_LIMITS.description}
                  </Form.Text>
                </div>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 gap-2">
          {!uploadSuccess && (
            <>
              <Button
                className="btn-secondary-saluteca flex-fill flex-md-grow-0"
                onClick={handleClose}
                disabled={uploading || analyzing}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="btn-primary-saluteca flex-fill flex-md-grow-0 d-flex align-items-center justify-content-center"
                disabled={!isValid || uploading || analyzing}
              >
                {(uploading || analyzing) && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                )}
                {analyzing
                  ? "Analizando..."
                  : uploading
                    ? "Guardando..."
                    : analyzed
                      ? "Confirmar y guardar"
                      : "Analizar estudio"}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
