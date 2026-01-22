"use client";

import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { mockFamilyMembers } from "@/lib/mockData";
import { CATEGORY_INFO, StudyCategory } from "@/types";

interface UploadStudyModalProps {
  show: boolean;
  onHide: () => void;
  familyMemberId?: string; // If provided, preselect this family member
}

export default function UploadStudyModal({
  show,
  onHide,
  familyMemberId,
}: UploadStudyModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<StudyCategory>("uncategorized");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState<string>(familyMemberId || "self");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    // Generate title if empty: "Compartido [fecha]"
    const finalTitle = title.trim() || `Compartido ${new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date))}`;

    // TODO: Implement file upload to backend
    console.log({
      file: selectedFile,
      category,
      title: finalTitle,
      date,
      description,
      owner,
    });

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setUploading(false);
    handleClose();
  };

  const handleClose = () => {
    setSelectedFile(null);
    setCategory("uncategorized");
    setTitle("");
    setDate(new Date().toISOString().split("T")[0]);
    setDescription("");
    setOwner(familyMemberId || "self");
    onHide();
  };

  const isValid = selectedFile; // Solo el archivo es obligatorio

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" fullscreen="sm-down">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="h5 fw-semibold">Subir estudio médico</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* File Upload */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">
              Archivo <span className="text-danger">*</span>
            </Form.Label>
            <div
              className="border border-2 border-dashed rounded p-4 text-center"
              style={{
                borderColor: selectedFile ? "var(--saluteca-secondary)" : "#dee2e6",
                backgroundColor: selectedFile ? "#f0f9f4" : "#f8f9fa",
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("fileInput")?.click()}
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
                    <div className="fw-medium text-dark">{selectedFile.name}</div>
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
                    }}
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
                  <div className="fw-medium mb-1">Hacé clic para seleccionar un archivo</div>
                  <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                    PDF, JPG, PNG (máx. 10MB)
                  </div>
                </>
              )}
              <Form.Control
                id="fileInput"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="d-none"
              />
            </div>
          </Form.Group>

          <div className="row g-3 mb-3">
            {/* Category - OPCIONAL */}
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="fw-medium">
                  Tipo de estudio <span className="text-muted">(opcional)</span>
                </Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as StudyCategory)}
                >
                  {Object.values(CATEGORY_INFO).map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </Form.Select>
                <Form.Text className="text-muted" style={{ fontSize: "0.8rem" }}>
                  Por defecto: Sin clasificar
                </Form.Text>
              </Form.Group>
            </div>

            {/* Date - OPCIONAL */}
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="fw-medium">
                  Fecha <span className="text-muted">(opcional)</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
                <Form.Text className="text-muted" style={{ fontSize: "0.8rem" }}>
                  Por defecto: Hoy
                </Form.Text>
              </Form.Group>
            </div>
          </div>

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
            />
            <Form.Text className="text-muted" style={{ fontSize: "0.8rem" }}>
              Por defecto: Compartido [fecha]
            </Form.Text>
          </Form.Group>

          {/* Owner */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Para quién es este estudio</Form.Label>
            <Form.Select
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            >
              <option value="self">Para mí</option>
              {mockFamilyMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">
              Notas <span className="text-muted">(opcional)</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Agregá cualquier detalle relevante sobre el estudio..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 gap-2">
          <Button className="btn-secondary-saluteca flex-fill flex-md-grow-0" onClick={handleClose} disabled={uploading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            className="btn-primary-saluteca flex-fill flex-md-grow-0"
            disabled={!isValid || uploading}
          >
            {uploading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Subiendo...
              </>
            ) : (
              "Subir estudio"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
