"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import UploadStudyModal from "@/components/modals/UploadStudyModal";
import FamilyMemberDetail from "./FamilyMemberDetail";
import type { FamilyMember, Study } from "@/types";

interface FamilyMemberDetailWrapperProps {
  member: FamilyMember;
  familyMembers: FamilyMember[];
  studies: Study[];
  studyCount: number;
  lastStudyDate: string | null;
}

export default function FamilyMemberDetailWrapper({
  member,
  familyMembers,
  studies,
  studyCount,
  lastStudyDate = null
}: FamilyMemberDetailWrapperProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <>
      {/* Header Actions */}
      <div className="d-flex gap-2 align-items-center mb-4">
        <Link href="/app/family" className="btn btn-secondary-saluteca d-flex align-items-center"
          style={{
            backgroundColor: "var(--saluteca-primary-dark)",
            color: "var(--saluteca-white)",
          }}
        >
          Volver
        </Link>
        <Button
          className="btn-primary-saluteca d-flex align-items-center"
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
      </div>

      <FamilyMemberDetail
        member={member}
        studies={studies}
        studyCount={studyCount}
        lastStudyDate={lastStudyDate}
        familyMembers={familyMembers}
        onUploadClick={() => setShowUploadModal(true)}
      />

      {/* Modal de carga global */}
      <UploadStudyModal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
        familyMembers={familyMembers}
        familyMemberId={member.id}
      />
    </>
  );
}
