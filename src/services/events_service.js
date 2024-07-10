import eventsRepository from '../repositories/events_repository.js';
import eventLocationRepository from '../repositories/events_locations-repository.js';
import validacion from '../helpers/validacion_helper.js';
const validar = new validacion();

export default class EventsService
{
    async createEvent(eventData, userId) {
        const repo = new eventsRepository ();
        const { name, description, id_event_location, max_assistance, price, duration_in_minutes } = eventData;

        if (!name || name.length < 3 || !description || description.length < 3) {
            return { success: false, message: "El nombre y la descripción deben tener al menos 3 caracteres." };
        }

        const maxCapacity = await repo.getMaxCapacity(id_event_location);
        if (max_assistance > maxCapacity) {
            return { success: false, message: "El máximo de asistentes supera la capacidad máxima del lugar del evento." };
        }

        if (price < 0 || duration_in_minutes < 0) {
            return { success: false, message: "El precio y la duración deben ser mayores o iguales a cero." };
        }

        try {
            const eventId = await repo.createEvent({
                ...eventData,
                id_creator_user: userId
            });
            return { success: true, message: "Evento creado exitosamente.", eventId };
        } catch (error) {
            console.error('Error en createEvent:', error);
            return { success: false, message: "Error al crear el evento." };
        }
    }

    async updateEvent(eventData, userId) {
        const repo = new eventsRepository ();
        const { id, name, description, id_event_location, max_assistance, price, duration_in_minutes } = eventData;

        if (!name || name.length < 3 || !description || description.length < 3) {
            return { success: false, message: "El nombre y la descripción deben tener al menos 3 caracteres." };
        }

        const currentEvent = await repo.getEventById(id);
        if (!currentEvent) {
            return { success: false, statusCode: 404, message: "El evento no existe." };
        }

        if (currentEvent.id_creator_user !== userId) {
            return { success: false, statusCode: 401, message: "No tienes permiso para modificar este evento." };
        }

        const maxCapacity = await repo.getMaxCapacity(id_event_location);
        if (max_assistance > maxCapacity) {
            return { success: false, message: "El máximo de asistentes supera la capacidad máxima del lugar del evento." };
        }

        if (price < 0 || duration_in_minutes < 0) {
            return { success: false, message: "El precio y la duración deben ser mayores o iguales a cero." };
        }

        try {
            await repo.updateEvent({
                id,
                name,
                description,
                id_event_location,
                max_assistance,
                price,
                duration_in_minutes
            });
            return { success: true, message: "Evento actualizado exitosamente." };
        } catch (error) {
            console.error('Error en updateEvent:', error);
            return { success: false, message: "Error al actualizar el evento." };
        }
    }

    async deleteEvent(eventId, userId) {
        
        const repo = new eventsRepository ();
        const currentEvent = await repo.getEventById(eventId);
        if (!currentEvent) {
            return { success: false, statusCode: 404, message: "El evento no existe." };
        }

        if (!(currentEvent.id_creator_user === userId)) {
            return { success: false, statusCode: 401, message: "El usuario no es creador del evento." };
        }

        const usersRegistered = await repo.getUsersRegisteredCount(eventId);

        if (usersRegistered != undefined) {
            return { success: false, statuscode: 400 , message: "No se puede eliminar el evento porque hay usuarios registrados." };
        }

        try {
            const deleted = await repo.deleteEvent(eventId);
            if (deleted) {
                return { success: true, message: "Evento eliminado exitosamente." };
            } else {
                return { success: false, statusCode: 404, message: "No se encontró el evento para eliminar." };
            }
        } catch (error) {
            console.error('Error en deleteEvent:', error);
            return { success: false, message: "Error al eliminar el evento." };
        }
    }

    getEvents = async () =>
    {
        const repo = new eventsRepository ();
        const Events = await repo.getEvents();
        return Events;
    }

    getEventById = async (eventId) => {
        const repo = new eventsRepository();
        const Events = await repo.getEventById(eventId);
        return Events;
    }

    getEventDetail = async (id) => {
        const repo = new eventsRepository();
        const Events = await repo.getEventDetail(id);
        return Events;
    }
}