"use client";

import { Button } from "react-bootstrap";
import { Study, FamilyMember } from "@/types";
import { formatDate } from "@/lib/formatters";
import styles from "./StudyRow.module.css";

interface StudyRowProps {
  study: Study;
  familyMembers?: FamilyMember[];
  onEdit?: (study: Study) => void;
  onView: (study: Study) => void;
  onShare: (study: Study) => void;
}

export default function StudyRow({ study, familyMembers, onEdit, onView, onShare }: StudyRowProps) {
  const familyMember = study.familyMemberId && familyMembers
    ? familyMembers.find(fm => fm.id === study.familyMemberId)
    : null;

  return (
    <div className={styles.studyRowCard}>
      <div className="d-flex align-items-center gap-3 flex-wrap">
        {/* Title and description */}
        <div className={`${styles.studyRowContent} flex-grow-1`}>
          <h3 className={styles.studyRowTitle}>
            {study.title || "Estudio médico"}
          </h3>
          {study.description && (
            <p className={styles.studyRowDescription}>{study.description}</p>
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
              <span
                className="text-muted-saluteca"
                style={{ fontSize: "0.7rem" }}
              >
                {familyMember.name}
              </span>
            </div>
          )}
        </div>

        {/* Date */}
        <div className={styles.studyRowDate}>
          <span className="text-muted-saluteca" style={{ fontSize: "0.75rem" }}>
            {formatDate(study.date)}
          </span>
        </div>

        {/* Actions */}
        <div className={styles.studyRowActions}>
          {onEdit && (
            <Button
              // className="btn-outline-saluteca btn-sm"
              className="btn-sm"
              onClick={() => onEdit(study)}
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
              <span className={styles.btnText}>Editar</span>
            </Button>
          )}
          <Button
            // className="btn-outline-saluteca btn-sm"
            className="btn-sm"
            onClick={() => onView(study)}
          >
            <span className={styles.btnText}>Ver</span>
          </Button>
          <Button
            // className="btn-outline-saluteca btn-sm"
            className="btn-sm"
            onClick={() => onShare(study)}
          >
            <span className={styles.btnText}>Compartir</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
