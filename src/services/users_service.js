import UserRepository from "../repositories/users_repository.js";
import jwt from 'jsonwebtoken'
import validacion from "../helpers/validacion_helper.js";
const validar = new validacion();

export default class UserService
{
    login = async (username, password) => {
        let respuesta = {
            success: false,
            message: "Error de login",
            token: ""
        };
    
        const repo = new UserRepository();
        if (validar.validarEmail(username)) {
            const usuario = await repo.getUserByUsername(username, password);
            if (usuario != null) {
                const payload = {
                    id: usuario.id,
                    username: usuario.username
                };
                console.log('payload', payload)
                const options = {
                    expiresIn: '1h',
                };
                const token = jwt.sign(payload, 'OliTami', options);
                respuesta.success = true;
                respuesta.message = "Login exitoso";
                respuesta.token = token;
                return respuesta;
            }
        } else {
            respuesta.success = false;
            respuesta.message = "El mail es invalido";
            respuesta.token = "";
            return respuesta;
        }
    };
    
    register = async (entity) => {
        let respuesta = {
            success: false,
            message: ""
        };
    
        const repo = new UserRepository();
    
        if (!validar.validarEmail(entity.username)) {
            respuesta.message = "El email es sintácticamente inválido.";
        } else if (entity.password.length < 3) {
            respuesta.message = "La contraseña cuenta con menos de 3 caracteres.";
        } else {
            const success = await repo.createUser(entity);
            if (success) {
                respuesta.success = true;
                respuesta.message = "Usuario creado exitosamente";
            } else {
                respuesta.message = "Error al crear el usuario";
            }
        }
        return respuesta;
    };
}