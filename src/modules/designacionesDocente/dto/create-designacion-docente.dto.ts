import { z } from 'zod';

export const CreateDesignacionDocenteDto = z.object({
  idDocente: z.number().int().positive(),
  idDivisionXUnidadCurricular: z.number().int().positive(),
  idCicloLectivo: z.number().int().positive(),
  idAdministrativo: z.number().int().positive(),
  turno: z.string().min(1, "El turno es obligatorio"),
  aula: z.string().nullable().optional(),
  horario: z.string().min(1, "El horario es obligatorio"),
  nroMAB: z.string().min(1, "El número de MAB es requerido"),
  fechaAltaMAB: z.coerce.date(),
  fechaVtoMAB: z.coerce.date(),
});

export type CreateDesignacionDocenteDto = z.infer<typeof CreateDesignacionDocenteDto>;