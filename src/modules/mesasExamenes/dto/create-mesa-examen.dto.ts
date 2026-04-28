import { z } from 'zod';

export const CreateMesaExamenDto = z.object({
  idUnidadCurricular: z.number().int().positive(),
  fecha: z.coerce.date(),
  curso: z.string().trim().min(1),
  tipo: z.enum(['FINAL', 'PARCIAL', 'RECUPERATORIO']),
});

export type CreateMesaExamenDto = z.infer<typeof CreateMesaExamenDto>;