import { Router } from 'express';
import { estudianteXUnidadCurricularController } from './controller/estudianteXUnidadCurricular.controller.js';
import { validateJwt } from '../../core/middlewares/validate-jwt.middleware.js';
import { validateRole } from '../../core/middlewares/validate-role.middleware.js';
import { Role } from '../../core/enums/role.enum.js';

export const estudianteXUnidadCurricularRouter = Router();

// Rutas de lectura (cualquier autenticado)
estudianteXUnidadCurricularRouter.get(
  '/',
  validateJwt,
  estudianteXUnidadCurricularController.getAll,
);

estudianteXUnidadCurricularRouter.get(
  '/:id',
  validateJwt,
  estudianteXUnidadCurricularController.getById,
);

// Rutas de escritura (requieren ADMIN o un rol especifico para crear/modificar, ej: ADMIN o SECRETARIA)
// Usamos Role.ADMIN basado en el modelo administrativo o el ejemploDeCRUD.
estudianteXUnidadCurricularRouter.post(
  '/',
  validateJwt,
  validateRole(Role.ADMIN), // O Role.SECRETARIA si existe y es necesario
  estudianteXUnidadCurricularController.create,
);

estudianteXUnidadCurricularRouter.patch(
  '/:id',
  validateJwt,
  validateRole(Role.ADMIN),
  estudianteXUnidadCurricularController.update,
);

estudianteXUnidadCurricularRouter.delete(
  '/:id',
  validateJwt,
  validateRole(Role.ADMIN),
  estudianteXUnidadCurricularController.delete,
);
