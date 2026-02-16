import { pool } from "@/src/lib/database/connection";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import type { Study } from "../types/study.types";

interface StudyRow extends RowDataPacket {
  id: number;
  uuid: string;
  id_usuario: number;
  email_usuario: string;
  id_familiar: number | null;
  titulo: string | null;
  fecha: string;
  institucion: string | null;
  medico: string | null;
  conclusion: string | null;
  descripcion: string | null;
  file_key: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
}

interface CreateStudyData {
  uuid: string;
  userId: string;
  userEmail: string;
  familyMemberId: string | null;
  title: string | null;
  date: string;
  institution: string | null;
  medico: string | null;
  conclusion: string | null;
  description: string | null;
  fileKey: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  createdAt: string;
}

interface UpdateStudyData {
  title?: string | null;
  date?: string;
  institution?: string | null;
  medico?: string | null;
  conclusion?: string | null;
  description?: string | null;
}

/**
 * Repository para el acceso a datos de estudios
 * Responsabilidad: queries SQL y mapeo de datos
 */
export class StudyRepository {
  /**
   * Convierte una fila de DB a entidad Study
   */
  private mapToStudy(row: StudyRow): Study {
    return {
      id: row.id.toString(),
      uuid: row.uuid,
      userId: row.id_usuario.toString(),
      familyMemberId: row.id_familiar ? row.id_familiar.toString() : undefined,
      title: row.titulo || undefined,
      date: row.fecha, // Mantener como string DD-MM-YYYY
      institution: row.institucion || undefined,
      medico: row.medico || "",
      conclusion: row.conclusion || undefined,
      description: row.descripcion || undefined,
      fileKey: row.file_key,
      fileName: row.file_name,
      mimeType: row.mime_type,
      size: row.file_size,
      createdAt: row.created_at, // Mantener como string DD-MM-YYYY
    };
  }

  /**
   * Obtiene todos los estudios de un usuario
   */
  async findByUserId(userId: string): Promise<Study[]> {
    try {
      const [rows] = await pool.execute<StudyRow[]>(
        `SELECT id, uuid, id_usuario, email_usuario, id_familiar, titulo, fecha, 
                institucion, medico, conclusion, descripcion, file_key, file_name, mime_type, file_size, created_at, updated_at 
         FROM estudios 
         WHERE id_usuario = ? 
         ORDER BY fecha DESC, created_at DESC`,
        [userId]
      );

      return rows.map((row) => this.mapToStudy(row));
    } catch (error) {
      console.error("Error al obtener estudios por usuario:", error);
      throw error;
    }
  }

  /**
   * Obtiene un estudio específico por ID
   */
  async findById(studyId: string, userId: string): Promise<Study | null> {
    try {
      const [rows] = await pool.execute<StudyRow[]>(
        `SELECT id, uuid, id_usuario, email_usuario, id_familiar, titulo, fecha, 
                institucion, medico, conclusion, descripcion, file_key, file_name, mime_type, file_size, created_at, updated_at 
         FROM estudios 
         WHERE id = ? AND id_usuario = ?`,
        [parseInt(studyId), userId]
      );

      if (rows.length === 0) {
        return null;
      }

      return this.mapToStudy(rows[0]);
    } catch (error) {
      console.error("Error al obtener estudio por ID:", error);
      throw error;
    }
  }

  /**
   * Obtiene un estudio por UUID (para compartir)
   */
  async findByUuid(uuid: string): Promise<Study | null> {
    try {
      const [rows] = await pool.execute<StudyRow[]>(
        `SELECT id, uuid, id_usuario, email_usuario, id_familiar, titulo, fecha, 
                institucion, medico, conclusion, descripcion, file_key, file_name, mime_type, file_size, created_at, updated_at 
         FROM estudios 
         WHERE uuid = ?`,
        [uuid]
      );

      if (rows.length === 0) {
        return null;
      }

      return this.mapToStudy(rows[0]);
    } catch (error) {
      console.error("Error al obtener estudio por UUID:", error);
      throw error;
    }
  }

  /**
   * Obtiene estudios de un familiar específico
   */
  async findByFamilyMember(userId: string, familyMemberId: string): Promise<Study[]> {
    try {
      const [rows] = await pool.execute<StudyRow[]>(
        `SELECT id, uuid, id_usuario, email_usuario, id_familiar, titulo, fecha, 
                institucion, medico, conclusion, descripcion, file_key, file_name, mime_type, file_size, created_at, updated_at 
         FROM estudios 
         WHERE id_usuario = ? AND id_familiar = ? 
         ORDER BY fecha DESC, created_at DESC`,
        [userId, parseInt(familyMemberId)]
      );

      return rows.map((row) => this.mapToStudy(row));
    } catch (error) {
      console.error("Error al obtener estudios del familiar:", error);
      throw error;
    }
  }

  /**
   * Cuenta estudios de un familiar
   */
  async countByFamilyMember(userId: string, familyMemberId: string): Promise<number> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        `SELECT COUNT(*) as count 
         FROM estudios 
         WHERE id_usuario = ? AND id_familiar = ?`,
        [userId, parseInt(familyMemberId)]
      );

      return rows[0]?.count || 0;
    } catch (error) {
      console.error("Error al contar estudios del familiar:", error);
      throw error;
    }
  }

  /**
   * Obtiene la fecha del último estudio de un familiar
   */
  async getLastStudyDate(userId: string, familyMemberId: string): Promise<string | null> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        `SELECT fecha 
         FROM estudios 
         WHERE id_usuario = ? AND id_familiar = ? 
         ORDER BY fecha DESC, created_at DESC 
         LIMIT 1`,
        [userId, parseInt(familyMemberId)]
      );

      if (rows.length > 0 && rows[0].fecha) {
        return rows[0].fecha; // Retornar como string DD-MM-YYYY
      }

      return null;
    } catch (error) {
      console.error("Error al obtener última fecha de estudio:", error);
      throw error;
    }
  }

  /**
   * Crea un nuevo estudio
   */
  async create(data: CreateStudyData): Promise<number> {
    try {
      const [result] = await pool.execute<ResultSetHeader>(
        `INSERT INTO estudios (
          uuid,
          id_usuario,
          email_usuario,
          id_familiar,
          titulo,
          fecha,
          institucion,
          medico,
          conclusion,
          descripcion,
          file_key,
          file_name,
          mime_type,
          file_size,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.uuid,
          data.userId,
          data.userEmail,
          data.familyMemberId ? parseInt(data.familyMemberId) : null,
          data.title,
          data.date,
          data.institution,
          data.medico,
          data.conclusion,
          data.description,
          data.fileKey,
          data.fileName,
          data.mimeType,
          data.fileSize,
          data.createdAt,
        ]
      );

      return result.insertId;
    } catch (error) {
      console.error("Error al crear estudio:", error);
      throw error;
    }
  }

  /**
   * Actualiza un estudio
   */
  async update(studyId: string, userId: string, data: UpdateStudyData): Promise<boolean> {
    try {
      const updates: string[] = [];
      const values: (string | number | null)[] = [];

      if (data.title !== undefined) {
        updates.push("titulo = ?");
        values.push(data.title);
      }
      if (data.date !== undefined) {
        updates.push("fecha = ?");
        values.push(data.date);
      }
      if (data.institution !== undefined) {
        updates.push("institucion = ?");
        values.push(data.institution);
      }
      if (data.medico !== undefined) {
        updates.push("medico = ?");
        values.push(data.medico);
      }
      if (data.conclusion !== undefined) {
        updates.push("conclusion = ?");
        values.push(data.conclusion);
      }
      if (data.description !== undefined) {
        updates.push("descripcion = ?");
        values.push(data.description);
      }

      if (updates.length === 0) {
        return false;
      }

      values.push(parseInt(studyId), userId);

      const [result] = await pool.execute<ResultSetHeader>(
        `UPDATE estudios SET ${updates.join(", ")} WHERE id = ? AND id_usuario = ?`,
        values
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error al actualizar estudio:", error);
      throw error;
    }
  }

  /**
   * Elimina un estudio
   */
  async delete(studyId: string, userId: string): Promise<boolean> {
    try {
      const [result] = await pool.execute<ResultSetHeader>(
        `DELETE FROM estudios WHERE id = ? AND id_usuario = ?`,
        [parseInt(studyId), userId]
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error al eliminar estudio:", error);
      throw error;
    }
  }

  /**
   * Verifica si un familiar pertenece a un usuario
   */
  async verifyFamilyMemberOwnership(userId: string, familyMemberId: string): Promise<boolean> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT id FROM familiares WHERE id = ? AND id_usuario = ?",
        [parseInt(familyMemberId), userId]
      );

      return rows.length > 0;
    } catch (error) {
      console.error("Error al verificar familiar:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const studyRepository = new StudyRepository();
