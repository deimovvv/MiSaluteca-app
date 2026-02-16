"use client";

import { Card } from "react-bootstrap";
import { RELATION_LABELS } from "@/types";
import { formatDate } from "@/lib/formatters";
import type { FamilyMember } from "@/types";

interface FamilyMemberHeaderProps {
  member: FamilyMember;
  studyCount: number;
  lastStudyDate: string | null;
}

export default function FamilyMemberHeader({ member, studyCount, lastStudyDate }: FamilyMemberHeaderProps) {
  return (
    <div className="bg-white rounded-3 p-4 mb-4 border">
      <div className="row">
        <div className="col-md-3">
          <div className="d-flex flex-column align-items-center text-center">
            <div
              className="bg-secondary-saluteca d-flex align-items-center justify-content-center text-white fw-semibold mb-3"
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                fontSize: "2rem",
              }}
            >
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <h2 className="h5 fw-semibold mb-1">{member.name}</h2>
            <p className="text-muted-saluteca mb-0">
              {RELATION_LABELS[member.relation]}
              {member.age && ` • ${member.age} años`}
            </p>
          </div>
        </div>

        <div className="col-md-9">
          <div className="row g-3 mb-3">
            <div className="col-sm-6">
              <Card className="border">
                <Card.Body className="p-3">
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
                      <div className="text-muted-saluteca" style={{ fontSize: "0.875rem" }}>
                        Total de estudios
                      </div>
                      <div className="h4 mb-0 fw-semibold">{studyCount}</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-sm-6">
              <Card className="border">
                <Card.Body className="p-3">
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
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#2E7D32"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 6V12L16 14"
                          stroke="#2E7D32"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-muted-saluteca" style={{ fontSize: "0.875rem" }}>
                        Último estudio
                      </div>
                      <div className="fw-semibold" style={{ fontSize: "1.125rem" }}>
                        {lastStudyDate ? formatDate(lastStudyDate) : "—"}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          {member.notes && (
            <div className="p-3 rounded" style={{ backgroundColor: "#F8F9FA" }}>
              <div className="fw-medium mb-1" style={{ fontSize: "0.875rem" }}>
                Notas
              </div>
              <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                {member.notes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
