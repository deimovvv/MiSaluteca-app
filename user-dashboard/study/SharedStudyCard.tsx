"use client";

import { useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { Study } from "@/types";
import { formatDate, formatFileSize } from "@/lib/formatters";

interface SharedStudyCardProps {
  study: Study;
  linkUuid: string;
}

export default function SharedStudyCard({ study, linkUuid }: SharedStudyCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setError(null); // Limpiar errores previos

      // Construir la URL de descarga usando el UUID del link compartido
      const downloadUrl = `/api/download-shared-study/${linkUuid}`;

      // Hacer fetch del archivo
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        const errorData = await response.json();

        // Manejar error de expiración con redirección
        if (errorData.errorType === "expired") {
          window.location.reload(); // Recargar para mostrar la pantalla de expirado
          return;
        }

        throw new Error(errorData.error || "Error al descargar el archivo");
      }

      // Crear un blob y descargarlo
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = study.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "Error al descargar el estudio");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body className="p-4">
        {error && (
          <div
            className="mb-3 position-relative"
            style={{
              background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
              border: "1px solid #fca5a5",
              borderRadius: "12px",
              padding: "16px 48px 16px 16px",
              animation: "slideDown 0.3s ease-out",
            }}
          >
            <div className="d-flex align-items-start gap-3">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#dc2626",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "#991b1b",
                    marginBottom: "4px",
                  }}
                >
                  Error al descargar
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "#7f1d1d",
                    lineHeight: "1.5",
                  }}
                >
                  {error}
                </div>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "6px",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(127, 29, 29, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
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
                  stroke="#7f1d1d"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="d-flex align-items-start justify-content-between mb-3">
          <span className="text-muted" style={{ fontSize: "0.875rem" }}>
            {formatDate(study.date)}
          </span>
        </div>

        <h1 className="h4 fw-semibold mb-3">
          {study.title || "Estudio médico"}
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
              {/* <div className="fw-medium">{study.fileName}</div> */}
              <div className="fw-medium">Estudio</div>
            </div>
            <div className="col-sm-3">
              <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                Tipo
              </div>
              <div
                className="fw-medium text-uppercase"
                style={{ fontSize: "0.875rem" }}
              >
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
          <Button
            className="btn-primary-saluteca flex-grow-1"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Descargando
              </>
            ) : (
              <>
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
              </>
            )}
          </Button>

        </div>
      </Card.Body>
    </Card>
  );
}
