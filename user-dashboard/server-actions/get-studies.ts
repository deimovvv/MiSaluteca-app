"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Study } from "@/types";
import { pool } from "@/lib/database";
import { RowDataPacket } from "mysql2/promise";

interface StudyRow extends RowDataPacket {
  id: number;
  uuid: string;
  id_usuario: number;
  email_usuario: string;
  id_familiar: number | null;
  titulo: string | null;
  fecha: string;
  institucion: string | null;
  medico: string;
  conclusion: string | null;
  descripcion: string | null;
  file_key: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
}

/**
 * Obtiene todos los estudios del usuario actual
 */
export async function getStudies(): Promise<Study[]> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.userId) {
      return [];
    }

    const [rows] = await pool.execute<StudyRow[]>(
      `SELECT id, uuid, id_usuario, email_usuario, id_familiar, titulo, fecha, 
              institucion, medico, conclusion, descripcion, file_key, file_name, 
              mime_type, file_size, created_at, updated_at 
       FROM estudios 
       WHERE id_usuario = ? 
       ORDER BY fecha DESC, created_at DESC`,
      [session.user.userId]
    );

    const studies: Study[] = rows.map((row) => ({
      id: row.id.toString(),
      uuid: row.uuid,
      userId: row.id_usuario.toString(),
      familyMemberId: row.id_familiar ? row.id_familiar.toString() : undefined,
      title: row.titulo || undefined,
      date: row.fecha, // Mantener como string DD-MM-YYYY
      institution: row.institucion || undefined,
      medico: row.medico,
      conclusion: row.conclusion || undefined,
      description: row.descripcion || undefined,
      fileKey: row.file_key,
      fileName: row.file_name,
      mimeType: row.mime_type,
      size: row.file_size,
      createdAt: row.created_at, // Mantener como string DD-MM-YYYY
    }));

    return studies;
  } catch (error) {
    console.error("Error al obtener estudios:", error);
    return [];
  }
}

/**
 * Obtiene estudios recientes (últimos 6)
 */
export async function getRecentStudies(): Promise<Study[]> {
  const allStudies = await getStudies();
  return allStudies.slice(0, 6);
}

/**
 * Obtiene las estadísticas del dashboard
 */
export async function getStudiesStats() {
  const allStudies = await getStudies();

  return {
    total: allStudies.length,
    myStudies: allStudies.filter(s => !s.familyMemberId).length,
    familyStudies: allStudies.filter(s => s.familyMemberId).length,
  };
}

/**
 * Obtiene los estudios de un familiar específico por su ID
 */
export async function getStudiesByFamilyMember(familyMemberId: string): Promise<Study[]> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.userId) {
      return [];
    }

    const [rows] = await pool.execute<StudyRow[]>(
      `SELECT id, uuid, id_usuario, email_usuario, id_familiar, titulo, fecha, 
              institucion, medico, conclusion, descripcion, file_key, file_name, 
              mime_type, file_size, created_at, updated_at 
       FROM estudios 
       WHERE id_usuario = ? AND id_familiar = ? 
       ORDER BY fecha DESC, created_at DESC`,
      [session.user.userId, parseInt(familyMemberId)]
    );

    const studies: Study[] = rows.map((row) => ({
      id: row.id.toString(),
      uuid: row.uuid,
      userId: row.id_usuario.toString(),
      familyMemberId: row.id_familiar ? row.id_familiar.toString() : undefined,
      title: row.titulo || undefined,
      date: row.fecha, // Mantener como string DD-MM-YYYY
      institution: row.institucion || undefined,
      medico: row.medico,
      conclusion: row.conclusion || undefined,
      description: row.descripcion || undefined,
      fileKey: row.file_key,
      fileName: row.file_name,
      mimeType: row.mime_type,
      size: row.file_size,
      createdAt: row.created_at, // Mantener como string DD-MM-YYYY
    }));

    return studies;
  } catch (error) {
    console.error("Error al obtener estudios del familiar:", error);
    return [];
  }
}

/**
 * Obtiene el conteo de estudios de un familiar
 */
export async function getStudyCountByFamilyMember(familyMemberId: string): Promise<number> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.userId) {
      return 0;
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT COUNT(*) as count 
       FROM estudios 
       WHERE id_usuario = ? AND id_familiar = ?`,
      [session.user.userId, parseInt(familyMemberId)]
    );

    return rows[0]?.count || 0;
  } catch (error) {
    console.error("Error al obtener conteo de estudios del familiar:", error);
    return 0;
  }
}

/**
 * Obtiene la fecha del último estudio de un familiar
 */
export async function getLastStudyDateByFamilyMember(familyMemberId: string): Promise<string | undefined> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.userId) {
      return undefined;
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT fecha 
       FROM estudios 
       WHERE id_usuario = ? AND id_familiar = ? 
       ORDER BY fecha DESC, created_at DESC 
       LIMIT 1`,
      [session.user.userId, parseInt(familyMemberId)]
    );

    if (rows.length > 0 && rows[0].fecha) {
      return rows[0].fecha; // Retornar como string DD-MM-YYYY
    }

    return undefined;
  } catch (error) {
    console.error("Error al obtener última fecha de estudio del familiar:", error);
    return undefined;
  }
}

/**
 * Obtiene un estudio específico por su ID
 */
export async function getStudyById(studyId: string): Promise<Study | null> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.userId) {
      return null;
    }

    const [rows] = await pool.execute<StudyRow[]>(
      `SELECT id, uuid, id_usuario, email_usuario, id_familiar, titulo, fecha, 
              institucion, medico, conclusion, descripcion, file_key, file_name, 
              mime_type, file_size, created_at, updated_at 
       FROM estudios 
       WHERE id = ? AND id_usuario = ?`,
      [parseInt(studyId), session.user.userId]
    );

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    return {
      id: row.id.toString(),
      uuid: row.uuid,
      userId: row.id_usuario.toString(),
      familyMemberId: row.id_familiar ? row.id_familiar.toString() : undefined,
      title: row.titulo || undefined,
      date: row.fecha, // Mantener como string DD-MM-YYYY
      institution: row.institucion || undefined,
      medico: row.medico,
      conclusion: row.conclusion || undefined,
      description: row.descripcion || undefined,
      fileKey: row.file_key,
      fileName: row.file_name,
      mimeType: row.mime_type,
      size: row.file_size,
      createdAt: row.created_at, // Mantener como string DD-MM-YYYY
    };
  } catch (error) {
    console.error("Error al obtener estudio por ID:", error);
    return null;
  }
}
