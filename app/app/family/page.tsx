"use client";

import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { Button, Card } from "react-bootstrap";
import {
  mockFamilyMembers,
  getStudyCountByFamilyMember,
  getLastStudyDateByFamilyMember,
  formatDate,
} from "@/lib/mockData";
import { RELATION_LABELS } from "@/types";
import AddFamilyMemberModal from "@/components/modals/AddFamilyMemberModal";

export default function FamilyPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <AppShell
      title="Grupo Familiar"
      action={
        <Button
          className="btn-primary-saluteca"
          onClick={() => setShowAddModal(true)}
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
          Agregar Familiar
        </Button>
      }
    >
      {mockFamilyMembers.length === 0 ? (
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
                d="M23.3333 10C23.3333 13.6819 20.3486 16.6667 16.6667 16.6667C12.9848 16.6667 10 13.6819 10 10C10 6.31811 12.9848 3.33334 16.6667 3.33334C20.3486 3.33334 23.3333 6.31811 23.3333 10Z"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.33337 33.3333C3.33337 26.7029 8.70301 21.3333 15.3334 21.3333H18C24.6304 21.3333 30 26.7029 30 33.3333"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30 15V25"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25 20H35"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="empty-state-title">No hay familiares</h2>
          <p className="empty-state-description">
            Agregá a tus familiares para gestionar sus estudios médicos
          </p>
          <Button
            className="btn-primary-saluteca"
            onClick={() => setShowAddModal(true)}
          >
            Agregar primer familiar
          </Button>
        </div>
      ) : (
        <div className="row g-4">
          {mockFamilyMembers.map((member) => {
            const studyCount = getStudyCountByFamilyMember(member.id);
            const lastStudyDate = getLastStudyDateByFamilyMember(member.id);

            return (
              <div key={member.id} className="col-md-6 col-lg-4">
                <Card className="card-saluteca h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-start gap-3 mb-3">
                      <div
                        className="bg-secondary-saluteca d-flex align-items-center justify-content-center text-white fw-semibold flex-shrink-0"
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "50%",
                          fontSize: "1.25rem",
                        }}
                      >
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>

                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <h3 className="h6 fw-semibold mb-1">{member.name}</h3>
                        <p className="text-muted-saluteca mb-0" style={{ fontSize: "0.875rem" }}>
                          {RELATION_LABELS[member.relation]}
                          {member.age && ` • ${member.age} años`}
                        </p>
                      </div>
                    </div>

                    {member.notes && (
                      <p
                        className="text-muted mb-3"
                        style={{
                          fontSize: "0.875rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {member.notes}
                      </p>
                    )}

                    <div
                      className="d-flex gap-3 mb-3 pb-3"
                      style={{ borderBottom: "1px solid #E5E5E5" }}
                    >
                      <div>
                        <div className="text-muted-saluteca" style={{ fontSize: "0.75rem" }}>
                          Estudios
                        </div>
                        <div className="fw-semibold" style={{ fontSize: "1.25rem" }}>
                          {studyCount}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-saluteca" style={{ fontSize: "0.75rem" }}>
                          Último
                        </div>
                        <div className="fw-medium" style={{ fontSize: "0.875rem" }}>
                          {lastStudyDate ? formatDate(lastStudyDate) : "—"}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/app/family/${member.id}`}
                      className="btn btn-outline-saluteca w-100 mt-auto"
                      style={{ fontSize: "0.875rem" }}
                    >
                      Ver estudios
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <AddFamilyMemberModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
      />
    </AppShell>
  );
}
