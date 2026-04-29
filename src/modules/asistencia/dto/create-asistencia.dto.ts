import { z } from 'zod';

export const CreateAsistenciaDto = z.object({
  idDivisionXUnidadCurricular: z.number().int().positive(),
  fecha: z.coerce.date(),
  presente: z.boolean().optional().default(false),
  idLegajo: z.number().int().positive(),
  idAdministrativo: z.number().int().positive(),
});

export type CreateAsistenciaDto = z.infer<typeof CreateAsistenciaDto>;
