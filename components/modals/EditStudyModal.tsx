"use client";

import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Study, CATEGORY_INFO, StudyCategory } from "@/types";
import { mockFamilyMembers } from "@/lib/mockData";

interface EditStudyModalProps {
  show: boolean;
  onHide: () => void;
  study: Study;
  onDelete?: () => void;
  onUpdate?: (updatedStudy: Study) => void;
}

export default function EditStudyModal({
  show,
  onHide,
  study,
  onDelete,
  onUpdate,
}: EditStudyModalProps) {
  const [category, setCategory] = useState<StudyCategory>(study.category);
  const [title, setTitle] = useState(study.title || "");
  const [date, setDate] = useState(new Date(study.date).toISOString().split("T")[0]);
  const [description, setDescription] = useState(study.description || "");
  const [owner, setOwner] = useState<string>(study.familyMemberId || "self");
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // TODO: Implement update to backend
    const updatedStudy: Study = {
      ...study,
      category,
      title: title.trim() || undefined,
      date: new Date(date),
      description: description.trim() || undefined,
      familyMemberId: owner === "self" ? undefined : owner,
    };

    console.log("Updating study:", updatedStudy);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaving(false);
    if (onUpdate) {
      onUpdate(updatedStudy);
    }
    handleClose();
  };

  const handleDelete = async () => {
    setDeleting(true);

    // TODO: Implement delete to backend
    console.log("Deleting study:", study.id);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setDeleting(false);
    if (onDelete) {
      onDelete();
    }
    handleClose();
  };

  const handleClose = () => {
    setShowDeleteConfirm(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" fullscreen="sm-down">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="h5 fw-semibold">Editar estudio</Modal.Title>
      </Modal.Header>

      {!showDeleteConfirm ? (
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {/* File info (read-only) */}
            <div
              className="border rounded p-3 mb-4"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="d-flex align-items-center gap-3">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20" cy="20" r="20" fill="var(--saluteca-primary)" fillOpacity="0.1" />
                  <path
                    d="M21.6667 13.3333H15C14.558 13.3333 14.1341 13.5089 13.8215 13.8215C13.5089 14.1341 13.3333 14.558 13.3333 15V25C13.3333 25.442 13.5089 25.8659 13.8215 26.1785C14.1341 26.4911 14.558 26.6667 15 26.6667H25C25.442 26.6667 25.8659 26.4911 26.1785 26.1785C26.4911 25.8659 26.6667 25.442 26.6667 25V18.3333L21.6667 13.3333Z"
                    stroke="var(--saluteca-primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.6667 13.3333V18.3333H26.6667"
                    stroke="var(--saluteca-primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex-grow-1">
                  <div className="fw-medium text-dark">{study.fileName}</div>
                  <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                    {(study.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-3 mb-3">
              {/* Category */}
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="fw-medium">Tipo de estudio</Form.Label>
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
                </Form.Group>
              </div>

              {/* Date */}
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="fw-medium">Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </Form.Group>
              </div>
            </div>

            {/* Title */}
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
            </Form.Group>

            {/* Owner */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Para quién es este estudio</Form.Label>
              <Form.Select value={owner} onChange={(e) => setOwner(e.target.value)}>
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

          <Modal.Footer className="border-0 pt-0 d-flex justify-content-between">
            <Button
              variant="link"
              className="text-danger fw-medium p-0"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={saving}
            >
              Eliminar estudio
            </Button>
            <div className="d-flex gap-2">
              <Button
                className="btn-secondary-saluteca"
                onClick={handleClose}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="btn-primary-saluteca"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Guardando...
                  </>
                ) : (
                  "Guardar cambios"
                )}
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      ) : (
        <>
          <Modal.Body>
            <div className="text-center py-4">
              <div
                className="mx-auto mb-4"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#fee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9V13M12 17H12.01M5.07 19H18.93C20.14 19 21 17.93 20.43 16.87L13.5 5.12C12.93 4.06 11.07 4.06 10.5 5.12L3.57 16.87C3 17.93 3.86 19 5.07 19Z"
                    stroke="#dc3545"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h5 className="fw-semibold mb-2">¿Eliminar este estudio?</h5>
              <p className="text-muted mb-0">
                Esta acción no se puede deshacer. El archivo se eliminará permanentemente.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 gap-2">
            <Button
              className="btn-secondary-saluteca flex-fill flex-md-grow-0"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={deleting}
            >
              Cancelar
            </Button>
            <Button
              className="flex-fill flex-md-grow-0"
              style={{
                background: "#dc3545",
                border: "none",
                color: "white",
                fontWeight: 500,
                padding: "0.75rem 1.5rem",
                borderRadius: "12px",
              }}
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Eliminando...
                </>
              ) : (
                "Sí, eliminar"
              )}
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
