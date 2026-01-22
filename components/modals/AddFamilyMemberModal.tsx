"use client";

import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AddFamilyMemberModalProps {
  show: boolean;
  onHide: () => void;
}

export default function AddFamilyMemberModal({
  show,
  onHide,
}: AddFamilyMemberModalProps) {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // TODO: Implement API call to add family member
    console.log({
      name,
      dateOfBirth,
    });

    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaving(false);
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setDateOfBirth("");
    onHide();
  };

  const isValid = name.trim() !== ""; // Solo el nombre es obligatorio

  return (
    <Modal show={show} onHide={handleClose} centered fullscreen="sm-down">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="h5 fw-semibold">Agregar familiar</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <p className="text-muted mb-4">
            Agregá a un familiar para poder gestionar sus estudios médicos
          </p>

          {/* Name - OBLIGATORIO */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">
              Nombre <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Juan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>

          {/* Date of Birth - OPCIONAL */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">
              Fecha de nacimiento{" "}
              <span className="text-muted">(opcional)</span>
            </Form.Label>
            <Form.Control
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
            <Form.Text className="text-muted">
              Ayuda a calcular la edad automáticamente
            </Form.Text>
          </Form.Group>

          <div
            className="bg-light rounded p-3"
            style={{ border: "1px solid #E5E5E5" }}
          >
            <div className="d-flex align-items-start gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0, marginTop: "2px" }}
              >
                <path
                  d="M10 6V10"
                  stroke="var(--saluteca-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="13" r="1" fill="var(--saluteca-primary)" />
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="var(--saluteca-primary)"
                  strokeWidth="2"
                />
              </svg>
              <div style={{ fontSize: "0.875rem" }}>
                <div className="fw-medium mb-1 text-dark">Privacidad</div>
                <div className="text-muted">
                  Solo vos tendrás acceso a esta información. Los datos están protegidos
                  y encriptados.
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 gap-2">
          <Button className="btn-secondary-saluteca flex-fill flex-md-grow-0" onClick={handleClose} disabled={saving}>
            Cancelar
          </Button>
          <Button
            type="submit"
            className="btn-primary-saluteca flex-fill flex-md-grow-0"
            disabled={!isValid || saving}
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
              "Agregar familiar"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
