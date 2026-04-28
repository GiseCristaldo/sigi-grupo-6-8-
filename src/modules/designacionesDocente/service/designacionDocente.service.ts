import DesignacionDocente from '../model/DesignacionDocente.js';
import type { CreateDesignacionDocenteDto } from '../dto/create-designacion-docente.dto.js';
import type { UpdateDesignacionDocenteDto } from '../dto/update-designacion-docente.dto.js';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export const designacionDocenteService = {

  /**
   * Obtiene listado paginado de designaciones docentes.
   */
  async getAll(page: number = DEFAULT_PAGE, limit: number = DEFAULT_LIMIT) {
    const offset = (page - 1) * limit;
    const { count, rows } = await DesignacionDocente.findAndCountAll({
      limit,
      offset,
      order: [['id', 'ASC']],
    });

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  },

  async getById(id: number) {
    return DesignacionDocente.findByPk(id);
  },

  /**
   * Crea una nueva designación mapeando los campos del DTO a la base de datos.
   */
  async create(data: CreateDesignacionDocenteDto) {
    const payload: any = {
      idDocente: data.idDocente,
      idUnidadCurricular: data.idUnidadCurricular,
      cargo: data.cargo,
      fechaInicio: data.fechaInicio,
      horasSemanales: data.horasSemanales,
      idCicloLectivo: 1,
      idDivisionXUnidadCurricular: 1,
      turno: 'MAÑANA',
      regimen: 'HORAS',
      estado: 'ACTIVO',
      adscripto: false,
      horasRelojSemanales: data.horasSemanales,
      observaciones: '',
      aula: 'A definir'
    };
    return DesignacionDocente.create(payload as any);
  },

  async update(id: number, data: UpdateDesignacionDocenteDto) {
    const designacion = await DesignacionDocente.findByPk(id);
    if (!designacion) return null;

    // Mapeamos los campos que podrían venir en el update parcial
    const updatedData: any = { ...data };

    if (data.idDocente) updatedData.idDocente = data.idDocente;
    if (data.idUnidadCurricular) updatedData.idUnidadCurricular = data.idUnidadCurricular;

    await designacion.update(updatedData);
    return designacion;
  },

  async delete(id: number) {
    const designacion = await DesignacionDocente.findByPk(id);
    if (!designacion) return null;

    await designacion.destroy();
    return true;
  },
};