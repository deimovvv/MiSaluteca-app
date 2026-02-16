"use client";

import Link from "next/link";
import { Card } from "react-bootstrap";
import { formatDate } from "@/lib/formatters";
import { RELATION_LABELS, FamilyMember } from "@/types";
import styles from "./FamilyMemberCard.module.css";

interface FamilyMemberCardProps {
  member: FamilyMember;
}

export default function FamilyMemberCard({ member }: FamilyMemberCardProps) {
  const studyCount = member.studyCount ?? 0;
  const lastStudyDate = member.lastStudyDate;

  return (
    <Card className={`${styles.cardSaluteca} h-100`}>
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
          href={`/app/family/${member.uuid}`}
          className="btn btn-outline-saluteca w-100 mt-auto"
          style={{ fontSize: "0.875rem" }}
          prefetch={false}
        >
          Ver estudios
        </Link>
      </Card.Body>
    </Card>
  );
}
