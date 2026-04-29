import { z } from 'zod';

export const CreateDesignacionDocenteDto = z.object({
  idDocente: z.number().int().positive(),
  idUnidadCurricular: z.number().int().positive(),
  cargo: z.enum(['TITULAR', 'ADJUNTO', 'JTP']),
  horasSemanales: z.number().int().positive(),
  fechaInicio: z.coerce.date(),
});

export type CreateDesignacionDocenteDto = z.infer<typeof CreateDesignacionDocenteDto>;
