import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../../../config/database/conexion.js";


interface DesignacionesDocenteAttributes extends InferAttributes<DesignacionesDocente> {
    id: number;
    idDocente: number;
    idDivisionXUnidadCurricular: number;
    idCicloLectivo: number;
    turno: string;
    aula: string | null;
    horario: string;
    nroMAB: string;
    fechaAltaMAB: string;
    idAdministrativo: number;
    fechaVtoMAB: string;
    activo: boolean;
}

interface DesignacionesDocenteCreationAttributes extends InferCreationAttributes<DesignacionesDocente> {
    id: CreationOptional<number>;
    idDocente: number;
    idDivisionXUnidadCurricular: number;
    idCicloLectivo: number;
    turno: string;
    aula: string | null;
    horario: string;
    nroMAB: string;
    fechaAltaMAB: string;
    idAdministrativo: number;
    fechaVtoMAB: string;
    activo: CreationOptional<boolean>;
}

class DesignacionesDocente extends Model<DesignacionesDocenteAttributes, DesignacionesDocenteCreationAttributes> {
    declare id: CreationOptional<number>;
    declare idDocente: number;
    declare idDivisionXUnidadCurricular: number;
    declare idCicloLectivo: number;
    declare turno: string;
    declare aula: string | null;
    declare horario: string;
    declare nroMAB: string;
    declare fechaAltaMAB: string;
    declare idAdministrativo: number;
    declare fechaVtoMAB: string;
    declare activo: CreationOptional<boolean>;
}

DesignacionesDocente.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idDocente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "id_docente",
        },
        idDivisionXUnidadCurricular: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "id_division_x_unidad_curricular",
        },
        idCicloLectivo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "id_ciclo_lectivo",
        },
        turno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        aula: {
            type: DataTypes.STRING,
            allowNull: true
        },
        horario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nroMAB: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaAltaMAB: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        idAdministrativo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "id_administrativo",
        },
        fechaVtoMAB: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "designaciones_docentes",
        timestamps: true,
        // Opcional: índices para optimizar consultas
        indexes: [
            { fields: ["id_docente"] },
        ]
    }
)

export default DesignacionesDocente;