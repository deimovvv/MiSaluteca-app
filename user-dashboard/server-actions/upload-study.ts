"use server";

import { pool } from "@/lib/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import { validateFileType } from "@/lib/file-validator";
import { dateNow } from "@/config/date";
import { STUDY_FIELD_LIMITS } from "@/config/constants";

interface UploadStudyResult {
  success: boolean;
  message: string;
  studyId?: number;
}

export async function uploadStudy(
  formData: FormData,
): Promise<UploadStudyResult> {
  try {
    // Obtener la sesión del usuario
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.userId) {
      return {
        success: false,
        message: "No hay sesión activa. Por favor, iniciá sesión nuevamente.",
      };
    }

    // Verificar límite de subidas por día
    const today = dateNow();
    let countFiles = 0;

    // Obtener los datos del usuario actual
    const [userRows] = await pool.execute<RowDataPacket[]>(
      "SELECT count_files, date_files FROM users WHERE id = ?",
      [session.user.userId],
    );

    if (userRows.length > 0) {
      const userData = userRows[0];
      countFiles = userData.count_files || 0;

      // Si la fecha está vacía, o si cambió de fecha de la última subida (nuevo día)
      if (!userData.date_files || userData.date_files !== today) {
        countFiles = 0;
      }
    }

    if (countFiles >= parseInt(process.env.LIMIT_UPLOAD!)) {
      return {
        success: false,
        message:
          "Alcanzaste el límite de " +
          process.env.LIMIT_UPLOAD +
          " archivos subidos por día.",
      };
    }

    // Extraer datos del FormData
    const file = formData.get("file") as File;
    const title = formData.get("title") as string | null;
    const date = formData.get("date") as string;
    const institution = formData.get("institution") as string | null;
    const medico = formData.get("medico") as string | null;
    const conclusion = formData.get("conclusion") as string | null;
    const description = formData.get("description") as string | null;
    const familyMemberId = formData.get("familyMemberId") as string | null;

    // Validaciones
    if (!file) {
      return {
        success: false,
        message: "No se seleccionó ningún archivo.",
      };
    }

    // Validar tipo de archivo de manera segura (magic bytes + anti-malware)
    const validationResult = await validateFileType(file);
    if (!validationResult.isValid) {
      return {
        success: false,
        message: validationResult.error || "Archivo no válido.",
      };
    }

    // Usar el MIME type detectado por magic bytes (confiable), no el declarado por el cliente
    const trustedMimeType =
      validationResult.detectedMimeType || "application/octet-stream";

    if (!date) {
      return {
        success: false,
        message: "La fecha es obligatoria.",
      };
    }

    // Validaciones de longitud de campos
    if (date && date.length > STUDY_FIELD_LIMITS.date) {
      return {
        success: false,
        message: `La fecha no puede superar los ${STUDY_FIELD_LIMITS.date} caracteres.`,
      };
    }

    if (title && title.length > STUDY_FIELD_LIMITS.title) {
      return {
        success: false,
        message: `El nombre del estudio no puede superar los ${STUDY_FIELD_LIMITS.title} caracteres.`,
      };
    }

    if (institution && institution.length > STUDY_FIELD_LIMITS.institution) {
      return {
        success: false,
        message: `La institución no puede superar los ${STUDY_FIELD_LIMITS.institution} caracteres.`,
      };
    }

    if (medico && medico.length > STUDY_FIELD_LIMITS.doctor) {
      return {
        success: false,
        message: `El nombre del médico no puede superar los ${STUDY_FIELD_LIMITS.doctor} caracteres.`,
      };
    }

    if (conclusion && conclusion.length > STUDY_FIELD_LIMITS.conclusion) {
      return {
        success: false,
        message: `La conclusión no puede superar los ${STUDY_FIELD_LIMITS.conclusion} caracteres.`,
      };
    }

    if (description && description.length > STUDY_FIELD_LIMITS.description) {
      return {
        success: false,
        message: `Las notas adicionales no pueden superar los ${STUDY_FIELD_LIMITS.description} caracteres.`,
      };
    }

    // Verificar si el familiar pertenece al usuario (si se especificó)
    let familyMemberIdToSave: number | null = null;
    if (familyMemberId && familyMemberId !== "self") {
      const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT id FROM familiares WHERE id = ? AND id_usuario = ?",
        [familyMemberId, session.user.userId],
      );

      if (rows.length === 0) {
        return {
          success: false,
          message: "El familiar especificado no existe o no te pertenece.",
        };
      }

      familyMemberIdToSave = parseInt(familyMemberId);
    }

    // Guardar el archivo en el sistema de archivos
    // TODO: En producción, subir a S3 o similar
    const baseUploadDir = (
      process.env.DIRECTORY_UPLOADS || "./uploads"
    ).replace("./", "");
    const uploadDir = join(
      process.cwd(),
      baseUploadDir,
      session.user.userId.toString(),
    );
    await mkdir(uploadDir, { recursive: true });

    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExtension}`;
    const filePath = join(uploadDir, fileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // El fileKey será la ruta relativa desde la carpeta uploads
    const fileKey = `${session.user.userId}/${fileName}`;

    const uuid = uuidv4();
    const timestampString = new Date().getTime().toString();
    const formattedTimestamp =
      timestampString.match(/.{1,4}/g)?.join("-") || timestampString;
    const finalUuid = uuid + "-" + formattedTimestamp;
    // Insertar en la base de datos
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
        finalUuid,
        session.user.userId,
        session.user.email,
        familyMemberIdToSave,
        title || null,
        date,
        institution || null,
        medico || null,
        conclusion || null,
        description || null,
        fileKey,
        file.name,
        trustedMimeType, // Usar MIME type detectado (seguro), no file.type (manipulable)
        file.size,
        dateNow(),
      ],
    );

    // Actualizar el contador y la fecha del usuario
    await pool.execute(
      "UPDATE users SET count_files = ?, date_files = ? WHERE id = ?",
      [countFiles + 1, today, session.user.userId],
    );

    return {
      success: true,
      message: "Estudio subido exitosamente",
      studyId: result.insertId,
    };
  } catch (error) {
    console.error("Error al subir estudio:", error);
    return {
      success: false,
      message:
        "Ocurrió un error al subir el estudio. Por favor, intentá nuevamente.",
    };
  }
}
