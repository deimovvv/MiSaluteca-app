"use client";

import { use } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { mockStudies, mockShareLinks, formatDate, formatFileSize } from "@/lib/mockData";
import { CATEGORY_INFO } from "@/types";

export default function SharedStudyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);

  // Find the share link
  const shareLink = mockShareLinks.find((link) => link.token === token);

  if (!shareLink) {
    return (
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div
            className="bg-light d-inline-flex align-items-center justify-content-center mb-4"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
              />
              <path
                d="M20 13.3333V20"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="20" cy="26.6667" r="1.5" fill="var(--saluteca-gray)" />
            </svg>
          </div>
          <h1 className="h4 fw-semibold mb-2">Link no válido</h1>
          <p className="text-muted mb-4">
            Este link de compartir no existe o ha sido revocado
          </p>
        </div>
      </Container>
    );
  }

  // Check if expired
  const isExpired = new Date() > shareLink.expiresAt;
  const isRevoked = !!shareLink.revokedAt;

  if (isExpired || isRevoked) {
    return (
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div
            className="bg-light d-inline-flex align-items-center justify-content-center mb-4"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
              />
              <path
                d="M13.3333 13.3333L26.6666 26.6667"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M26.6666 13.3333L13.3333 26.6667"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="h4 fw-semibold mb-2">Link expirado</h1>
          <p className="text-muted mb-4">
            {isRevoked
              ? "Este link fue revocado por el dueño del estudio"
              : "Este link ha expirado y ya no está disponible"}
          </p>
        </div>
      </Container>
    );
  }

  // Find the study
  const study = mockStudies.find((s) => s.id === shareLink.studyId);

  if (!study) {
    return (
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="h4 fw-semibold mb-2">Estudio no encontrado</h1>
          <p className="text-muted">El estudio no existe</p>
        </div>
      </Container>
    );
  }

  const categoryInfo = CATEGORY_INFO[study.category];
  const daysUntilExpiry = Math.ceil(
    (shareLink.expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div className="bg-white border-bottom py-3">
        <Container>
          <div className="d-flex align-items-center gap-3">
            <div
              className="bg-primary-saluteca d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
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
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 2V9H20"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="14" r="2" fill="white" />
              </svg>
            </div>
            <div>
              <div className="fw-semibold" style={{ fontSize: "1.125rem" }}>
                SALUTECA
              </div>
              <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                Estudio compartido
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-4">
        {/* Expiry Warning */}
        {daysUntilExpiry <= 3 && (
          <div
            className="alert alert-warning d-flex align-items-center gap-2 mb-4"
            role="alert"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
              <path
                d="M10 6V10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="10" cy="13.5" r="1" fill="currentColor" />
            </svg>
            <div>
              Este link expira {daysUntilExpiry === 0 ? "hoy" : `en ${daysUntilExpiry} día${daysUntilExpiry > 1 ? "s" : ""}`}
            </div>
          </div>
        )}

        {/* Study Card */}
        <Card className="mb-4">
          <Card.Body className="p-4">
            <div className="d-flex align-items-start justify-content-between mb-3">
              <span className={`category-pill ${categoryInfo.className}`}>
                {categoryInfo.label}
              </span>
              <span className="text-muted" style={{ fontSize: "0.875rem" }}>
                {formatDate(study.date)}
              </span>
            </div>

            <h1 className="h4 fw-semibold mb-3">
              {study.title || categoryInfo.label}
            </h1>

            {study.description && (
              <p className="text-muted mb-4">{study.description}</p>
            )}

            <div className="bg-light rounded p-3 mb-4">
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                    Archivo
                  </div>
                  <div className="fw-medium">{study.fileName}</div>
                </div>
                <div className="col-sm-3">
                  <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                    Tipo
                  </div>
                  <div className="fw-medium text-uppercase" style={{ fontSize: "0.875rem" }}>
                    {study.mimeType.split("/")[1]}
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                    Tamaño
                  </div>
                  <div className="fw-medium">{formatFileSize(study.size)}</div>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <Button className="btn-primary-saluteca flex-grow-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="me-2"
                  style={{ display: "inline" }}
                >
                  <path
                    d="M2.66663 11.3333V12.6667C2.66663 13.0203 2.80711 13.3594 3.05716 13.6095C3.30721 13.8595 3.64634 14 3.99996 14H12C12.3536 14 12.6927 13.8595 12.9428 13.6095C13.1928 13.3594 13.3333 13.0203 13.3333 12.6667V11.3333"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.66663 6.66667L7.99996 10L11.3333 6.66667"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10V2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Descargar estudio
              </Button>
              <Button variant="outline-primary">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5.33333V3.33333C12 3.15652 11.9298 2.98695 11.8047 2.86193C11.6797 2.7369 11.5101 2.66666 11.3333 2.66666H3.33333C3.15652 2.66666 2.98695 2.7369 2.86193 2.86193C2.7369 2.98695 2.66667 3.15652 2.66667 3.33333V11.3333C2.66667 11.5101 2.7369 11.6797 2.86193 11.8047C2.98695 11.9298 3.15652 12 3.33333 12H5.33333"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="6.66663"
                    y="6.66666"
                    width="6.66667"
                    height="6.66667"
                    rx="0.666667"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Info Footer */}
        <div className="text-center text-muted" style={{ fontSize: "0.875rem" }}>
          <p className="mb-2">
            Este estudio fue compartido mediante un link temporal y seguro
          </p>
          <p className="mb-0">
            Compartido {shareLink.viewsCount} {shareLink.viewsCount === 1 ? "vez" : "veces"} •
            Expira el {formatDate(shareLink.expiresAt)}
          </p>
        </div>

        {/* CTA */}
        <div
          className="text-center mt-5 pt-4"
          style={{ borderTop: "1px solid #E5E5E5" }}
        >
          <p className="text-muted mb-3">
            ¿Querés organizar tus estudios médicos?
          </p>
          <a href="/login" className="btn btn-outline-primary">
            Crear cuenta en SALUTECA
          </a>
        </div>
      </Container>
    </div>
  );
}
