"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { Button } from "react-bootstrap";
import { mockStudies, formatDate, getFamilyMemberById } from "@/lib/mockData";
import { CATEGORY_INFO, Study } from "@/types";
import UploadStudyModal from "@/components/modals/UploadStudyModal";
import ShareModal from "@/components/modals/ShareModal";
import ViewStudyModal from "@/components/modals/ViewStudyModal";
import EditStudyModal from "@/components/modals/EditStudyModal";

export default function HomePage() {
  const router = useRouter();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);

  // Get recent studies (last 6)
  const recentStudies = mockStudies
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 6);

  // Stats
  const totalStudies = mockStudies.length;
  const myStudies = mockStudies.filter(s => !s.familyMemberId).length;
  const familyStudies = mockStudies.filter(s => s.familyMemberId).length;

  return (
    <AppShell
      title="Inicio"
      action={
        <Button
          className="btn-primary-saluteca"
          onClick={() => setShowUploadModal(true)}
        >
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
              d="M8 3.33337V12.6667"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.33337 8H12.6667"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Subir Estudio
        </Button>
      }
    >
      {recentStudies.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26 4H12C10.9391 4 9.92172 4.42143 9.17157 5.17157C8.42143 5.92172 8 6.93913 8 8V32C8 33.0609 8.42143 34.0783 9.17157 34.8284C9.92172 35.5786 10.9391 36 12 36H28C29.0609 36 30.0783 35.5786 30.8284 34.8284C31.5786 34.0783 32 33.0609 32 32V14L26 4Z"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26 4V14H32"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 18V28"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 23H25"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="empty-state-title">Aún no hay estudios</h2>
          <p className="empty-state-description">
            Comienza subiendo tu primer estudio médico para mantener todo
            organizado
          </p>
          <Button
            className="btn-primary-saluteca"
            onClick={() => setShowUploadModal(true)}
          >
            Subir tu primer estudio
          </Button>
        </div>
      ) : (
        <div>
          {/* Welcome Stats */}
          <div className="row g-3 mb-4 home-kpis">
            <div className="col-md-4">
              <div className="bg-white rounded-3 p-4 border h-100">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      backgroundColor: "#E3F2FD",
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
                        stroke="#1565C0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 2V9H20"
                        stroke="#1565C0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                      Total estudios
                    </div>
                    <div className="h4 mb-0 fw-semibold">{totalStudies}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white rounded-3 p-4 border h-100">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      backgroundColor: "#F3E5F5",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="8"
                        r="4"
                        stroke="#6A1B9A"
                        strokeWidth="2"
                      />
                      <path
                        d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21"
                        stroke="#6A1B9A"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                      Mis estudios
                    </div>
                    <div className="h4 mb-0 fw-semibold">{myStudies}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white rounded-3 p-4 border h-100">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      backgroundColor: "#E8F5E9",
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
                        d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                        stroke="#2E7D32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="9"
                        cy="7"
                        r="4"
                        stroke="#2E7D32"
                        strokeWidth="2"
                      />
                      <path
                        d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                        stroke="#2E7D32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                        stroke="#2E7D32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                      De familia
                    </div>
                    <div className="h4 mb-0 fw-semibold">{familyStudies}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Studies */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="h5 mb-0 fw-semibold">Estudios recientes</h2>
            <a
              href="/app/studies"
              className="text-primary-saluteca text-decoration-none fw-medium"
              style={{ fontSize: "0.875rem" }}
            >
              Ver todos →
            </a>
          </div>

          <div className="d-flex flex-column gap-1">
            {recentStudies.map((study) => {
              const categoryInfo = CATEGORY_INFO[study.category];
              const familyMember = study.familyMemberId
                ? getFamilyMemberById(study.familyMemberId)
                : null;

              return (
                <div key={study.id} className="study-row-card">
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    {/* Category pill */}
                    <div className="study-row-category">
                      <span className={`category-pill ${categoryInfo.className}`}>
                        {categoryInfo.label}
                      </span>
                    </div>

                    {/* Title and description */}
                    <div className="study-row-content flex-grow-1">
                      <h3 className="study-row-title">
                        {study.title || categoryInfo.label}
                      </h3>
                      {study.description && (
                        <p className="study-row-description">
                          {study.description}
                        </p>
                      )}
                      {familyMember && (
                        <div className="d-flex align-items-center gap-1 mt-1">
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="7"
                              cy="4.5"
                              r="2.5"
                              stroke="var(--saluteca-gray)"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M2 12C2 9.79086 3.79086 8 6 8H8C10.2091 8 12 9.79086 12 12"
                              stroke="var(--saluteca-gray)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="text-muted-saluteca" style={{ fontSize: "0.7rem" }}>
                            {familyMember.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <div className="study-row-date">
                      <span className="text-muted-saluteca" style={{ fontSize: "0.75rem" }}>
                        {formatDate(study.date)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="study-row-actions">
                      <Button
                        className="btn-outline-saluteca btn-sm"
                        onClick={() => {
                          setSelectedStudy(study);
                          setShowEditModal(true);
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="me-1"
                          style={{ display: "inline" }}
                        >
                          <path
                            d="M6.41667 2.33333H2.33333C2.02391 2.33333 1.72717 2.45625 1.5084 2.67504C1.28962 2.89383 1.16667 3.19058 1.16667 3.5V11.6667C1.16667 11.9761 1.28962 12.2728 1.5084 12.4916C1.72717 12.7104 2.02391 12.8333 2.33333 12.8333H10.5C10.8094 12.8333 11.1062 12.7104 11.325 12.4916C11.5437 12.2728 11.6667 11.9761 11.6667 11.6667V7.58333"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.7917 1.45833C11.0233 1.22672 11.3368 1.09717 11.6633 1.09717C11.9899 1.09717 12.3034 1.22672 12.535 1.45833C12.7666 1.68995 12.8962 2.00346 12.8962 2.33C12.8962 2.65654 12.7666 2.97006 12.535 3.20167L6.99999 8.73667L4.66666 9.33333L5.26332 7L10.7917 1.45833Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Editar
                      </Button>
                      <Button
                        className="btn-outline-saluteca btn-sm"
                        onClick={() => {
                          setSelectedStudy(study);
                          setShowViewModal(true);
                        }}
                      >
                        Ver
                      </Button>
                      <Button
                        className="btn-outline-saluteca btn-sm"
                        onClick={() => {
                          setSelectedStudy(study);
                          setShowShareModal(true);
                        }}
                      >
                        Compartir
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modals */}
      <UploadStudyModal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
      />
      {selectedStudy && (
        <>
          <EditStudyModal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            study={selectedStudy}
            onDelete={() => {
              // TODO: Implement delete
              setShowEditModal(false);
              console.log("Study deleted:", selectedStudy.id);
            }}
            onUpdate={(updatedStudy) => {
              // TODO: Implement update
              setShowEditModal(false);
              console.log("Study updated:", updatedStudy);
            }}
          />
          <ViewStudyModal
            show={showViewModal}
            onHide={() => {
              setShowViewModal(false);
              setSelectedStudy(null);
            }}
            study={selectedStudy}
          />
          <ShareModal
            show={showShareModal}
            onHide={() => {
              setShowShareModal(false);
              setSelectedStudy(null);
            }}
            study={selectedStudy}
          />
        </>
      )}
    </AppShell>
  );
}
