import ProvinceRepository from '../repositories/provinces_repository.js';

const respuesta = {
    success: false,
    message: "Error de login",
    datos: ""
};

export default class ProvinceService{

    getAllProvinces = async () => {
        const repo = new ProvinceRepository();
        try {
            const returnArray = await repo.getAllProvinces();
            respuesta.success = true;
            respuesta.message = "Consulta de todas las provincias exitosa";
            respuesta.datos = returnArray;
        } catch (error) {
            console.error('Error en getAllProvinces:', error);
            respuesta.message = "Error al consultar todas las provincias";
        }
        return respuesta;
    };
    
    getById = async (id) => {
        const repo = new ProvinceRepository();
        try {
            const province = await repo.getById(id);
            respuesta.success = true;
            respuesta.message = "Consulta de provincia por ID exitosa";
            respuesta.datos = province;
        } catch (error) {
            console.error('Error en getById:', error);
            respuesta.message = "Error al consultar la provincia por ID";
        }
        return respuesta;
    };
    
    getLocationsById = async (id) => {
        const repo = new ProvinceRepository();
        try {
            const locations = await repo.getLocationsById(id);
            respuesta.success = true;
            respuesta.message = "Consulta de ubicaciones por ID de provincia exitosa";
            respuesta.datos = locations;
        } catch (error) {
            console.error('Error en getLocationsById:', error);
            respuesta.message = "Error al consultar las ubicaciones por ID de provincia";
        }
        return respuesta;
    };
    
    postProvince = async (entity) => {
        const repo = new ProvinceRepository();
        try {
            const province = await repo.postProvince(entity);
            respuesta.success = true;
            respuesta.message = "Inserción de provincia exitosa";
            respuesta.datos = province;
        } catch (error) {
            console.error('Error en postProvince:', error);
            respuesta.message = "Error al insertar la provincia";
        }
        return respuesta;
    };
    
    putProvince = async (entity) => {
        const repo = new ProvinceRepository();
        try {
            const success = await repo.putProvince(entity);
            if (success) {
                respuesta.success = true;
                respuesta.message = "Actualización de provincia exitosa";
                respuesta.datos = success;
            } else {
                respuesta.success = false;
                respuesta.message = "No se encontró la provincia especificada para actualizar";
                respuesta.datos = null;
            }
        } catch (error) {
            console.error('Error en putProvince:', error);
            respuesta.success = false;
            respuesta.message = "Error al actualizar la provincia";
            respuesta.datos = null;
        }
        return respuesta;
    };
    
    deleteProvince = async (id) => {
        const repo = new ProvinceRepository();
        try {
            const rowCount = await repo.deleteProvince(id);
            if (rowCount > 0) {
                respuesta.success = true;
                respuesta.message = "Eliminación de provincia exitosa";
                respuesta.datos = { rowCount };
            } else {
                respuesta.success = false;
                respuesta.message = "No se encontró la provincia espeficicada para eliminar o no se puede eliminar debido a FK";
                respuesta.datos = null;
            }
        } catch (error) {
            console.error('Error en deleteProvince:', error);
            if (error.code === '23503') { // PostgreSQL error code for foreign key violation
                respuesta.success = false;
                respuesta.message = "No se puede eliminar la provincia porque tiene relaciones en otras tablas";
                respuesta.datos = null;
            } else {
                respuesta.success = false;
                respuesta.message = "Error al eliminar la provincia";
                respuesta.datos = null;
            }
        }
        return respuesta;
    };
}