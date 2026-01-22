// Study Categories (MVP Simplified)
export type StudyCategory =
  | "images"         // Imágenes (RX, Tomografía, Resonancia, Ecografía, etc.)
  | "laboratory"     // Laboratorio (Análisis de sangre, orina, etc.)
  | "uncategorized"; // Sin clasificar

// Family Relations
export type FamilyRelation =
  | "self"
  | "parent"
  | "child"
  | "spouse"
  | "sibling"
  | "other";

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

// Family Member interface
export interface FamilyMember {
  id: string;
  userId: string;
  name: string;
  relation: FamilyRelation;
  dateOfBirth?: Date;
  age?: number;
  notes?: string;
  allergies?: string;
  createdAt: Date;
}

// Study interface
export interface Study {
  id: string;
  userId: string;
  familyMemberId?: string; // null = estudio del usuario principal
  category: StudyCategory;
  title?: string;
  date: Date;
  description?: string;
  fileKey: string;
  fileName: string;
  mimeType: string;
  size: number;
  createdAt: Date;
}

// Share Link interface
export interface StudyShareLink {
  id: string;
  studyId: string;
  token: string;
  expiresAt: Date;
  revokedAt?: Date;
  viewsCount: number;
  createdAt: Date;
}

// Helper type for study with owner info
export interface StudyWithOwner extends Study {
  ownerName: string;
  ownerRelation?: FamilyRelation;
}

// Category metadata
export interface CategoryInfo {
  id: StudyCategory;
  label: string;
  icon: string;
  className: string;
}

export const CATEGORY_INFO: Record<StudyCategory, CategoryInfo> = {
  images: {
    id: "images",
    label: "Imágenes",
    icon: "scan",
    className: "category-images",
  },
  laboratory: {
    id: "laboratory",
    label: "Laboratorio",
    icon: "droplet",
    className: "category-laboratory",
  },
  uncategorized: {
    id: "uncategorized",
    label: "Sin clasificar",
    icon: "file-text",
    className: "category-uncategorized",
  },
};

export const RELATION_LABELS: Record<FamilyRelation, string> = {
  self: "Yo",
  parent: "Padre/Madre",
  child: "Hijo/a",
  spouse: "Pareja",
  sibling: "Hermano/a",
  other: "Otro",
};
