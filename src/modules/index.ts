import sequelize from "../config/database/conexion.js";
import Administrativo from "./administrativos/model/Administrativo.js";
import Rol from "./roles/model/Rol.js";
import InstanciaEvaluativa from "./instanciasEvaluativas/model/InstanciaEvaluativa.js";
import LegajoXInstanciaEvaluativa from "./legajosXInstanciasEvaluativas/model/LegajoXInstanciaEvaluativa.js";
import MesaExamen from "./mesasExamenes/model/MesaExamen.js";
import DesignacionesDocente from "./designacionesDocente/model/DesignacionDocente.js";
// import Docente from "./docentes/model/Docente.js";
// import UnidadCurricular from "./unidadCurricular/model/UnidadCurricular.js";

// ---------- Rol ----------
Rol.hasMany(Administrativo, { foreignKey: "idRol" });
Administrativo.belongsTo(Rol, { foreignKey: "idRol" });

// ---------- InstanciaEvaluativa ----------
Administrativo.hasMany(InstanciaEvaluativa, { foreignKey: "idAdministrativo" });
InstanciaEvaluativa.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

// ---------- LegajoXInstanciaEvaluativa ----------
InstanciaEvaluativa.hasMany(LegajoXInstanciaEvaluativa, { foreignKey: "idInstanciaEvaluativa" });
LegajoXInstanciaEvaluativa.belongsTo(InstanciaEvaluativa, { foreignKey: "idInstanciaEvaluativa" });

Administrativo.hasMany(LegajoXInstanciaEvaluativa, { foreignKey: "idAdministrativo" });
LegajoXInstanciaEvaluativa.belongsTo(Administrativo, { foreignKey: "idAdministrativo" });

// ---------- DesignacionesDocente ----------
// Una designación pertenece a un docente y a una unidad curricular
// DesignacionesDocente.belongsTo(Docente, { foreignKey: "idDocente" });
// Docente.hasMany(DesignacionesDocente, { foreignKey: "idDocente" });

// DesignacionesDocente.belongsTo(UnidadCurricular, { foreignKey: "idUnidadCurricular" });
// UnidadCurricular.hasMany(DesignacionesDocente, { foreignKey: "idUnidadCurricular" });

// ---------- MesaExamen ----------
// Una mesa pertenece a una unidad curricular (usando el nombre que TS nos sopló: unidadCurricularId)
// MesaExamen.belongsTo(UnidadCurricular, { foreignKey: "unidadCurricularId" });
// UnidadCurricular.hasMany(MesaExamen, { foreignKey: "unidadCurricularId" });

export { sequelize, Administrativo, Rol, InstanciaEvaluativa, LegajoXInstanciaEvaluativa, MesaExamen, DesignacionesDocente };