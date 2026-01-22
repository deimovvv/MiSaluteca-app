"use client";

import { Modal, Button } from "react-bootstrap";
import { Study, CATEGORY_INFO } from "@/types";
import { formatDate, getFamilyMemberById } from "@/lib/mockData";

interface ViewStudyModalProps {
  show: boolean;
  onHide: () => void;
  study: Study;
}

export default function ViewStudyModal({
  show,
  onHide,
  study,
}: ViewStudyModalProps) {
  const categoryInfo = CATEGORY_INFO[study.category];
  const familyMember = study.familyMemberId
    ? getFamilyMemberById(study.familyMemberId)
    : null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-semibold">
          {study.title || categoryInfo.label}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4">
        {/* Category & Date */}
        <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
          <span className={`category-pill ${categoryInfo.className}`}>
            {categoryInfo.label}
          </span>
          <span className="text-muted" style={{ fontSize: "0.875rem" }}>
            {formatDate(study.date)}
          </span>
        </div>

        {/* For whom */}
        <div className="mb-4">
          <div className="fw-semibold mb-2" style={{ fontSize: "0.875rem", color: "#6c757d" }}>
            Para:
          </div>
          {familyMember ? (
            <div className="d-flex align-items-center gap-2">
              <div
                className="bg-secondary-saluteca d-flex align-items-center justify-content-center text-white fw-semibold"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  fontSize: "0.75rem",
                }}
              >
                {familyMember.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <span className="fw-medium">{familyMember.name}</span>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10"
                  cy="7"
                  r="3"
                  stroke="var(--saluteca-gray)"
                  strokeWidth="2"
                />
                <path
                  d="M4 17C4 13.6863 6.68629 11 10 11C13.3137 11 16 13.6863 16 17"
                  stroke="var(--saluteca-gray)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="fw-medium">Mi estudio</span>
            </div>
          )}
        </div>

        {/* Description */}
        {study.description && (
          <div className="mb-4">
            <div className="fw-semibold mb-2" style={{ fontSize: "0.875rem", color: "#6c757d" }}>
              Descripción:
            </div>
            <p className="mb-0" style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}>
              {study.description}
            </p>
          </div>
        )}

        {/* File */}
        <div className="mb-4">
          <div className="fw-semibold mb-2" style={{ fontSize: "0.875rem", color: "#6c757d" }}>
            Archivo:
          </div>
          <div
            className="d-flex align-items-center gap-3 p-3 rounded border"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                backgroundColor: "#e9ecef",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z"
                  stroke="#495057"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 2V9H20"
                  stroke="#495057"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-grow-1" style={{ minWidth: 0 }}>
              <div className="fw-medium text-truncate" style={{ fontSize: "0.9375rem" }}>
                {study.fileName}
              </div>
              <div className="text-muted" style={{ fontSize: "0.8125rem" }}>
                {(study.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
            <Button
              className="btn-outline-saluteca"
              size="sm"
              onClick={() => {
                // TODO: Implement file download/view from backend
                console.log("Open/download file:", study.fileKey);
              }}
            >
              Abrir
            </Button>
          </div>
        </div>

        {/* Uploaded info */}
        <div className="text-muted" style={{ fontSize: "0.8125rem" }}>
          Subido el {formatDate(study.createdAt)}
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
