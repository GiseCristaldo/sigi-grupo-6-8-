import { Request, Response, NextFunction } from 'express';
import { asistenciaService } from '../service/asistencia.service.js';
import { CreateAsistenciaDto } from '../dto/create-asistencia.dto.js';
import { UpdateAsistenciaDto } from '../dto/update-asistencia.dto.js';
import type { ZodError } from 'zod';

// ─── Helpers ─────────────────────────────────────────
function parseId(value: string): number | null {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function respondZodError(res: Response, error: ZodError): void {
  res.status(400).json({
    status: 'error',
    message: 'Datos de entrada inválidos.',
    errors: error.flatten().fieldErrors,
  });
}

function parsePagination(query: any) {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  return {
    page: Math.max(1, page),
    limit: Math.max(1, Math.min(100, limit)), // límite máximo 100
  };
}

// ─── Controlador ─────────────────────────────────────
export const asistenciaController = {

  // GET /asistencias?page=1&limit=10
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = parsePagination(req.query);
      const result = await asistenciaService.getAll(page, limit);
      res.status(200).json({ status: 'success', ...result });
    } catch (err) {
      next(err);
    }
  },

  // GET /asistencias/:id
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseId(req.params.id as string);
      if (id === null) {
        return res.status(400).json({
          status: 'error',
          message: 'El parámetro "id" debe ser un entero positivo.',
        });
      }
      const record = await asistenciaService.getById(id);
      if (!record) {
        return res.status(404).json({
          status: 'error',
          message: `No se encontró ningún registro con id ${id}.`,
        });
      }
      res.status(200).json({ status: 'success', data: record });
    } catch (err) {
      next(err);
    }
  },

  // POST /asistencias
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = CreateAsistenciaDto.safeParse(req.body);
      if (!parsed.success) {
        return respondZodError(res, parsed.error);
      }
      const nuevo = await asistenciaService.create(parsed.data);
      res
        .status(201)
        .location(`/api/v1/asistencias/${nuevo.id}`)
        .json({ status: 'success', data: nuevo });
    } catch (err) {
      // Posible error de índice único (misma fecha, alumno, division)
      // Lo delega al error handler centralizado, que podría manejar SequelizeUniqueConstraintError
      next(err);
    }
  },

  // PATCH /asistencias/:id
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseId(req.params.id as string);
      if (id === null) {
        return res.status(400).json({
          status: 'error',
          message: 'El parámetro "id" debe ser un entero positivo.',
        });
      }
      const parsed = UpdateAsistenciaDto.safeParse(req.body);
      if (!parsed.success) {
        return respondZodError(res, parsed.error);
      }
      const actualizado = await asistenciaService.update(id, parsed.data);
      if (!actualizado) {
        return res.status(404).json({
          status: 'error',
          message: `No se encontró ningún registro con id ${id}.`,
        });
      }
      res.status(200).json({ status: 'success', data: actualizado });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /asistencias/:id
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseId(req.params.id as string);
      if (id === null) {
        return res.status(400).json({
          status: 'error',
          message: 'El parámetro "id" debe ser un entero positivo.',
        });
      }
      const eliminado = await asistenciaService.delete(id);
      if (!eliminado) {
        return res.status(404).json({
          status: 'error',
          message: `No se encontró ningún registro con id ${id}.`,
        });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
