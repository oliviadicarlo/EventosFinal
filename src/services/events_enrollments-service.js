import events_enrollmentRepository from '../repositories/events_enrollments-repository.js';
import validacion from "../helpers/validacion_helper.js";
const validar = new validacion();

export default class events_enrollmentsService
{
    getUserFromEvent = async (query) => {
        const repo = new events_enrollmentRepository();
        const eventsEnroll = await repo.getUserFromEvent(query);
        return eventsEnroll;
    };

    async enrollInEvent(eventId, userId) {
        const repo = new eventsRepository();
        const repoE = new events_enrollmentRepository();
        const event = await repo.getEventById(eventId);

        if (!event) {
            return { success: false, statusCode: 404, message: "El evento no existe." };
        }

        if (event.start_date <= moment().toISOString()) {
            return { success: false, statusCode: 400, message: "No se puede registrar a un evento que ya sucedió o que es hoy." };
        }
    
        if (!event.enabled_for_enrollment) {
            return { success: false, statusCode: 400, message: "El evento no está habilitado para la inscripción." };
        }
    
        const maxCapacity = event.max_assistance;
        const currentRegistrations = await repo.getUsersRegisteredCount(eventId);
        if (currentRegistrations >= maxCapacity) {
            return { success: false, statusCode: 400, message: "Capacidad máxima del evento alcanzada." };
        }
    
        const alreadyRegistered = await repoE.checkUserRegistration(eventId, userId);
        if (alreadyRegistered) {
            return { success: false, statusCode: 400, message: "El usuario ya se encuentra registrado en el evento." };
        }
    
        try {
            await repoE.enrollUserInEvent(eventId, userId, moment().toISOString());
            return { success: true, statusCode: 201, message: "Usuario registrado exitosamente en el evento." };
        } catch (error) {
            console.error('Error en enrollInEvent:', error);
            return { success: false, message: "Error al registrar al usuario en el evento." };
        }
    }

    async unenrollFromEvent(eventId, userId) {
        const repo = new eventsRepository();
        const repoE = new events_enrollmentRepository();
    
        const event = await repo.getEventById(eventId);
        if (!event) {
            return { success: false, statusCode: 404, message: "El evento no existe." };
        }
    
        if (event.start_date <= moment().toISOString()) {
            return { success: false, statusCode: 400, message: "No se puede eliminar la inscripción de un evento que ya sucedió o que es hoy." };
        }
    
        const isRegistered = await repoE.checkUserRegistration(eventId, userId);
        if (!isRegistered) {
            return { success: false, statusCode: 400, message: "El usuario no se encuentra registrado en el evento." };
        }
    
        try {
            await repoE.unenrollUserFromEvent(eventId, userId);
            return { success: true, statusCode: 200, message: "Usuario removido exitosamente del evento." };
        } catch (error) {
            console.error('Error en unenrollFromEvent:', error);
            return { success: false, message: "Error al eliminar la inscripción del usuario en el evento." };
        }
    }

    updateEventRank = async (idEvento,hora, entero, idUsuario,observacion) =>{
        
        const repo = new events_enrollmentRepository();
        const UserAppliedForEvent  =  await repo.getUserFromEvent(idUsuario)
        const IdEvento = parseInt(idEvento)
        if(UserAppliedForEvent == null)
        {
            return "El usuario no se encuentra alistado en el evento";
        }
        if(validar.validarUpdateEvento(entero,hora) != "Ok"){
            return validar.validarUpdateEvento(entero,evento.start_date)
        }
        else
        {
        const succes = await repo.updateEventRatingById(IdEvento,entero,idUsuario,observacion);
        return succes;
        }
        
    }
}