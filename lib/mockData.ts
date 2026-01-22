import type { User, FamilyMember, Study, StudyShareLink } from "@/types";

// Mock User
export const mockUser: User = {
  id: "user-1",
  name: "María González",
  email: "maria.gonzalez@gmail.com",
  avatar: "https://ui-avatars.com/api/?name=Maria+Gonzalez&background=016390&color=fff",
  createdAt: new Date("2024-01-15"),
};

// Mock Family Members
export const mockFamilyMembers: FamilyMember[] = [
  {
    id: "fam-1",
    userId: "user-1",
    name: "Juan González",
    relation: "child",
    dateOfBirth: new Date("2015-05-20"),
    age: 8,
    notes: "Alergia a la penicilina",
    allergies: "Penicilina",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "fam-2",
    userId: "user-1",
    name: "Ana González",
    relation: "child",
    dateOfBirth: new Date("2018-08-12"),
    age: 5,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "fam-3",
    userId: "user-1",
    name: "Roberto González",
    relation: "spouse",
    dateOfBirth: new Date("1985-03-10"),
    age: 39,
    notes: "Diabético tipo 2",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "fam-4",
    userId: "user-1",
    name: "Elena Martínez",
    relation: "parent",
    dateOfBirth: new Date("1958-11-25"),
    age: 65,
    notes: "Hipertensión controlada",
    createdAt: new Date("2024-02-01"),
  },
];

// Mock Studies (MVP Simplified Categories)
export const mockStudies: Study[] = [
  {
    id: "study-1",
    userId: "user-1",
    category: "laboratory",
    title: "Análisis de Rutina",
    date: new Date("2024-12-15"),
    description: "Hemograma completo y perfil lipídico",
    fileKey: "studies/study-1.pdf",
    fileName: "analisis-sangre-dic-2024.pdf",
    mimeType: "application/pdf",
    size: 245678,
    createdAt: new Date("2024-12-15"),
  },
  {
    id: "study-2",
    userId: "user-1",
    category: "images",
    title: "Radiografía de Tórax",
    date: new Date("2024-11-20"),
    description: "Control post-neumonía",
    fileKey: "studies/study-2.pdf",
    fileName: "rx-torax-nov-2024.pdf",
    mimeType: "application/pdf",
    size: 1234567,
    createdAt: new Date("2024-11-21"),
  },
  {
    id: "study-3",
    userId: "user-1",
    familyMemberId: "fam-1",
    category: "laboratory",
    date: new Date("2024-10-05"),
    description: "Control pediátrico anual",
    fileKey: "studies/study-3.pdf",
    fileName: "juan-analisis-oct-2024.pdf",
    mimeType: "application/pdf",
    size: 189432,
    createdAt: new Date("2024-10-05"),
  },
  {
    id: "study-4",
    userId: "user-1",
    familyMemberId: "fam-3",
    category: "laboratory",
    title: "Control Glucemia",
    date: new Date("2024-12-10"),
    description: "Hemoglobina glicosilada y glucemia en ayunas",
    fileKey: "studies/study-4.pdf",
    fileName: "roberto-glucemia-dic-2024.pdf",
    mimeType: "application/pdf",
    size: 156789,
    createdAt: new Date("2024-12-10"),
  },
  {
    id: "study-5",
    userId: "user-1",
    category: "images",
    title: "Electrocardiograma de Esfuerzo",
    date: new Date("2024-09-12"),
    description: "Chequeo cardíaco preventivo",
    fileKey: "studies/study-5.pdf",
    fileName: "ecg-sept-2024.pdf",
    mimeType: "application/pdf",
    size: 345678,
    createdAt: new Date("2024-09-13"),
  },
  {
    id: "study-6",
    userId: "user-1",
    familyMemberId: "fam-4",
    category: "images",
    title: "Ecografía Abdominal",
    date: new Date("2024-11-15"),
    description: "Control de hígado graso",
    fileKey: "studies/study-6.pdf",
    fileName: "elena-eco-abdominal-nov-2024.pdf",
    mimeType: "application/pdf",
    size: 2345678,
    createdAt: new Date("2024-11-15"),
  },
  {
    id: "study-7",
    userId: "user-1",
    category: "images",
    title: "Resonancia de Rodilla",
    date: new Date("2024-08-20"),
    description: "Evaluación de lesión de menisco",
    fileKey: "studies/study-7.pdf",
    fileName: "rm-rodilla-ago-2024.pdf",
    mimeType: "application/pdf",
    size: 5678901,
    createdAt: new Date("2024-08-21"),
  },
  {
    id: "study-8",
    userId: "user-1",
    familyMemberId: "fam-2",
    category: "uncategorized",
    date: new Date("2024-07-10"),
    description: "Control odontológico",
    fileKey: "studies/study-8.pdf",
    fileName: "ana-rx-dental-jul-2024.pdf",
    mimeType: "application/pdf",
    size: 567890,
    createdAt: new Date("2024-07-10"),
  },
];

// Mock Share Links
export const mockShareLinks: StudyShareLink[] = [
  {
    id: "share-1",
    studyId: "study-1",
    token: "abc123xyz789",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    viewsCount: 3,
    createdAt: new Date("2024-12-16"),
  },
  {
    id: "share-2",
    studyId: "study-2",
    token: "def456uvw012",
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    viewsCount: 1,
    createdAt: new Date("2024-12-18"),
  },
];

// Helper function to get studies by family member
export function getStudiesByFamilyMember(familyMemberId?: string): Study[] {
  return mockStudies.filter((study) => study.familyMemberId === familyMemberId);
}

// Helper function to get study count by family member
export function getStudyCountByFamilyMember(familyMemberId: string): number {
  return mockStudies.filter((study) => study.familyMemberId === familyMemberId).length;
}

// Helper function to get last study date by family member
export function getLastStudyDateByFamilyMember(familyMemberId: string): Date | null {
  const studies = getStudiesByFamilyMember(familyMemberId);
  if (studies.length === 0) return null;

  return studies.reduce((latest, study) => {
    return study.date > latest ? study.date : latest;
  }, studies[0].date);
}

// Helper function to get family member by id
export function getFamilyMemberById(id: string): FamilyMember | undefined {
  return mockFamilyMembers.find((member) => member.id === id);
}

// Helper function to format file size
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// Helper function to format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

// Helper function to format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Hoy";
  if (diffInDays === 1) return "Ayer";
  if (diffInDays < 7) return `Hace ${diffInDays} días`;
  if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
  if (diffInDays < 365) return `Hace ${Math.floor(diffInDays / 30)} meses`;
  return `Hace ${Math.floor(diffInDays / 365)} años`;
}
