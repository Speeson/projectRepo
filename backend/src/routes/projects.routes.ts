import { Router } from "express";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/db";
import { requireAuth, requireRole } from "../middleware/auth";

type PublicProjectRow = RowDataPacket & {
  id: number;
  titulo: string;
  descripcion: string;
  ciclo: "DAM" | "ASIR";
  curso_academico: string;
  tecnologias: string;
  repositorio_url: string;
  demo_url: string | null;
  estado: "PUBLICADO";
  autor: string;
  fecha_creacion: string;
};

type MyProjectRow = RowDataPacket & {
  id: number;
  titulo: string;
  descripcion: string;
  ciclo: "DAM" | "ASIR";
  curso_academico: string;
  tecnologias: string;
  repositorio_url: string;
  demo_url: string | null;
  estado: "BORRADOR" | "PENDIENTE" | "PUBLICADO" | "RECHAZADO";
  fecha_creacion: string;
  fecha_actualizacion: string;
};

type PendingProjectRow = RowDataPacket & {
  id: number;
  titulo: string;
  descripcion: string;
  ciclo: "DAM" | "ASIR";
  curso_academico: string;
  tecnologias: string;
  repositorio_url: string;
  demo_url: string | null;
  estado: "PENDIENTE";
  autor: string;
  autor_email: string;
  fecha_creacion: string;
};

type CreateProjectBody = {
  titulo?: string;
  descripcion?: string;
  ciclo?: string;
  curso_academico?: string;
  tecnologias?: string;
  repositorio_url?: string;
  demo_url?: string | null;
};

const projectsRouter = Router();

projectsRouter.post(
  "/projects",
  requireAuth,
  requireRole(["ALUMNO"]),
  async (req, res) => {
    const body = req.body as CreateProjectBody;

    const titulo = body.titulo?.trim() ?? "";
    const descripcion = body.descripcion?.trim() ?? "";
    const ciclo = body.ciclo?.trim() ?? "";
    const cursoAcademico = body.curso_academico?.trim() ?? "";
    const tecnologias = body.tecnologias?.trim() ?? "";
    const repositorioUrl = body.repositorio_url?.trim() ?? "";
    const demoUrl = typeof body.demo_url === "string" ? body.demo_url.trim() : null;

    if (!titulo || !descripcion || !ciclo || !cursoAcademico || !tecnologias || !repositorioUrl) {
      res.status(400).json({
        message:
          "titulo, descripcion, ciclo, curso_academico, tecnologias and repositorio_url are required"
      });
      return;
    }

    if (ciclo !== "DAM" && ciclo !== "ASIR") {
      res.status(400).json({ message: "ciclo must be DAM or ASIR" });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      `
        INSERT INTO projects (
          titulo,
          descripcion,
          ciclo,
          curso_academico,
          tecnologias,
          repositorio_url,
          demo_url,
          estado,
          autor_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'BORRADOR', ?)
      `,
      [
        titulo,
        descripcion,
        ciclo,
        cursoAcademico,
        tecnologias,
        repositorioUrl,
        demoUrl || null,
        req.user!.id
      ]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Project created in BORRADOR"
    });
  }
);

projectsRouter.get(
  "/projects/mine",
  requireAuth,
  requireRole(["ALUMNO"]),
  async (req, res) => {
    const [rows] = await pool.query<MyProjectRow[]>(
      `
        SELECT
          id,
          titulo,
          descripcion,
          ciclo,
          curso_academico,
          tecnologias,
          repositorio_url,
          demo_url,
          estado,
          fecha_creacion,
          fecha_actualizacion
        FROM projects
        WHERE autor_id = ?
        ORDER BY fecha_creacion DESC
      `,
      [req.user!.id]
    );

    res.json({
      total: rows.length,
      items: rows
    });
  }
);

projectsRouter.patch(
  "/projects/:id/submit",
  requireAuth,
  requireRole(["ALUMNO"]),
  async (req, res) => {
    const projectId = Number(req.params.id);
    if (!Number.isInteger(projectId) || projectId <= 0) {
      res.status(400).json({ message: "Invalid project id" });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      `
        UPDATE projects
        SET estado = 'PENDIENTE'
        WHERE id = ?
          AND autor_id = ?
          AND estado = 'BORRADOR'
      `,
      [projectId, req.user!.id]
    );

    if (result.affectedRows === 0) {
      res.status(400).json({
        message: "Project not found, not owned by user, or not in BORRADOR"
      });
      return;
    }

    res.json({ message: "Project sent to revision (PENDIENTE)" });
  }
);

projectsRouter.get(
  "/projects/pending",
  requireAuth,
  requireRole(["DOCENTE", "ADMIN"]),
  async (_req, res) => {
    const [rows] = await pool.query<PendingProjectRow[]>(
      `
        SELECT
          p.id,
          p.titulo,
          p.descripcion,
          p.ciclo,
          p.curso_academico,
          p.tecnologias,
          p.repositorio_url,
          p.demo_url,
          p.estado,
          u.full_name AS autor,
          u.email AS autor_email,
          p.fecha_creacion
        FROM projects p
        INNER JOIN users u ON u.id = p.autor_id
        WHERE p.estado = 'PENDIENTE'
        ORDER BY p.fecha_creacion ASC
      `
    );

    res.json({
      total: rows.length,
      items: rows
    });
  }
);

projectsRouter.patch(
  "/projects/:id/publish",
  requireAuth,
  requireRole(["DOCENTE", "ADMIN"]),
  async (req, res) => {
    const projectId = Number(req.params.id);
    if (!Number.isInteger(projectId) || projectId <= 0) {
      res.status(400).json({ message: "Invalid project id" });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      `
        UPDATE projects
        SET estado = 'PUBLICADO'
        WHERE id = ?
          AND estado = 'PENDIENTE'
      `,
      [projectId]
    );

    if (result.affectedRows === 0) {
      res.status(400).json({
        message: "Project not found or not in PENDIENTE"
      });
      return;
    }

    res.json({ message: "Project published (PUBLICADO)" });
  }
);

projectsRouter.get("/projects/public", async (req, res) => {
  const ciclo = typeof req.query.ciclo === "string" ? req.query.ciclo : "";
  const cursoAcademico =
    typeof req.query.curso_academico === "string" ? req.query.curso_academico : "";
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";

  if (ciclo && ciclo !== "DAM" && ciclo !== "ASIR") {
    res.status(400).json({ message: "ciclo must be DAM or ASIR" });
    return;
  }

  const conditions: string[] = ["p.estado = 'PUBLICADO'"];
  const params: string[] = [];

  if (ciclo) {
    conditions.push("p.ciclo = ?");
    params.push(ciclo);
  }

  if (cursoAcademico) {
    conditions.push("p.curso_academico = ?");
    params.push(cursoAcademico);
  }

  if (q) {
    conditions.push(
      "(p.titulo LIKE ? OR p.descripcion LIKE ? OR p.tecnologias LIKE ?)"
    );
    const qLike = `%${q}%`;
    params.push(qLike, qLike, qLike);
  }

  const whereClause = conditions.join(" AND ");

  const [rows] = await pool.query<PublicProjectRow[]>(
    `
      SELECT
        p.id,
        p.titulo,
        p.descripcion,
        p.ciclo,
        p.curso_academico,
        p.tecnologias,
        p.repositorio_url,
        p.demo_url,
        p.estado,
        u.full_name AS autor,
        p.fecha_creacion
      FROM projects p
      INNER JOIN users u ON u.id = p.autor_id
      WHERE ${whereClause}
      ORDER BY p.fecha_creacion DESC
    `,
    params
  );

  res.json({
    total: rows.length,
    filters: {
      ciclo: ciclo || null,
      curso_academico: cursoAcademico || null,
      q: q || null
    },
    items: rows
  });
});

export { projectsRouter };
