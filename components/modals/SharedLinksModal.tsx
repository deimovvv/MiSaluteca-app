"use client";

import { Modal, Button, ListGroup } from "react-bootstrap";
import { mockShareLinks, mockStudies, formatDate } from "@/lib/mockData";
import { CATEGORY_INFO } from "@/types";
import type { StudyShareLink } from "@/types";

interface SharedLinksModalProps {
  show: boolean;
  onHide: () => void;
}

export default function SharedLinksModal({
  show,
  onHide,
}: SharedLinksModalProps) {
  const now = new Date();
  const allLinks = mockShareLinks;

  const getStudyTitle = (studyId: string) => {
    const study = mockStudies.find((s) => s.id === studyId);
    if (!study) return "Estudio médico";
    return study.title || CATEGORY_INFO[study.category].label;
  };

  const handleCopyLink = (token: string) => {
    const url = `${window.location.origin}/s/${token}`;
    navigator.clipboard.writeText(url);
    // TODO: Show toast notification
  };

  const handleRevokeLink = (linkId: string) => {
    // TODO: Implement revoke functionality
    console.log("Revoking link:", linkId);
  };

  const renderLinksList = (links: StudyShareLink[]) => {
    if (links.length === 0) {
      return (
        <div className="text-center py-5">
          <div
            className="d-flex align-items-center justify-content-center mb-3"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#F5F5F5",
              margin: "0 auto",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0685 9.05888 10.3533 9.00768C9.63816 8.95647 8.92037 9.05965 8.24861 9.31023C7.57685 9.5608 6.96684 9.95303 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="h6 fw-semibold mb-2">No hay enlaces compartidos</h3>
          <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
            Aún no compartiste ningún estudio
          </p>
        </div>
      );
    }

    return (
      <ListGroup variant="flush">
        {links.map((link) => {
          const study = mockStudies.find((s) => s.id === link.studyId);
          const studyTitle = study?.title || (study ? CATEGORY_INFO[study.category].label : "Estudio médico");
          const isRevoked = !!link.revokedAt;
          const isExpired = link.expiresAt <= now;

          return (
            <ListGroup.Item
              key={link.id}
              className="px-0 py-3"
              style={{ borderColor: "#E5E5E5" }}
            >
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-start justify-content-between">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <div className="fw-medium">{studyTitle}</div>
                      {(isRevoked || isExpired) && (
                        <span
                          className="badge"
                          style={{
                            backgroundColor: isRevoked ? "#fef3f2" : "#fef9f0",
                            color: isRevoked ? "#dc3545" : "#f59e0b",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            padding: "0.25rem 0.5rem",
                          }}
                        >
                          {isRevoked ? "Revocado" : "Expirado"}
                        </span>
                      )}
                    </div>
                    {study && (
                      <div className="mb-2">
                        <span className={`category-pill ${CATEGORY_INFO[study.category].className}`}>
                          {CATEGORY_INFO[study.category].label}
                        </span>
                      </div>
                    )}
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                        Creado: {formatDate(link.createdAt)}
                      </span>
                      {isRevoked && (
                        <>
                          <span className="text-muted" style={{ fontSize: "0.75rem" }}>•</span>
                          <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                            Revocado: {formatDate(link.revokedAt!)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {!isRevoked && !isExpired && (
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="btn-outline-saluteca"
                      onClick={() => handleCopyLink(link.token)}
                      style={{ fontSize: "0.75rem" }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="me-1"
                      >
                        <path
                          d="M11.6667 5.25H6.41667C5.63327 5.25 5 5.88327 5 6.66667V11.9167C5 12.7001 5.63327 13.3333 6.41667 13.3333H11.6667C12.4501 13.3333 13.0833 12.7001 13.0833 11.9167V6.66667C13.0833 5.88327 12.4501 5.25 11.6667 5.25Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.91667 8.75H2.33333C1.95942 8.75 1.60072 8.60156 1.33566 8.33651C1.07061 8.07145 0.916672 7.71275 0.916672 7.33333V2.08333C0.916672 1.70942 1.07061 1.35072 1.33566 1.08566C1.60072 0.820606 1.95942 0.666672 2.33333 0.666672H7.58333C7.95725 0.666672 8.31594 0.820606 8.581 1.08566C8.84606 1.35072 8.99999 1.70942 8.99999 2.08333V2.66667"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Copiar enlace
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRevokeLink(link.id)}
                      style={{ fontSize: "0.75rem" }}
                    >
                      Revocar
                    </Button>
                  </div>
                )}
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="h5 fw-semibold">Enlaces compartidos</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-0">
        <div className="px-4">
          <p className="text-muted mb-3" style={{ fontSize: "0.875rem" }}>
            Todos los enlaces generados para compartir estudios. Los enlaces expiran 24 horas después del primer acceso.
          </p>
          {renderLinksList(allLinks)}
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button className="btn-secondary-saluteca" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
