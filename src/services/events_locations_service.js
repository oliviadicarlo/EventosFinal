import EventsLocationsRepository from "../repositories/events_locations-repository.js";import validacion from '../helpers/validacion_helper.js';
const validar = new validacion();


export default class EventLocationService {
    getAllLocations = async () => {
        const repo = new EventsLocationsRepository();
        const eventLocations = await repo.getEventLocations();
        return eventLocations;
    }

    getByIdAsync = async (id,idUser) => {
        const repo = new EventsLocationsRepository();
        const eventLocation = await repo.getById(parseInt(id),idUser);
        return eventLocation;
    }

    createEventLocation = async (entity,idUsuario) => 
    {
        const repo = new EventsLocationsRepository();
    const result = validar.validarPostEventLocation(entity.name,entity.full_adress,entity.max_capacity);
        if ( result == "Ok"){
            const eventLocations = await repo.createLocation(entity,idUsuario);
            return eventLocations;
        }
        else
        {
            return result;
        }
    }

    updateEventLocation = async (entity,idUsuario) =>
    {
        const repo = new EventsLocationsRepository();
        const result = validar.validarPostEventLocation(entity.name,entity.full_address,entity.max_capacity);
            if ( result == "Ok"){
                const eventLocations = await repo.updateEventLocation(entity,idUsuario);
                return eventLocations;
            }
            else
            {
                return result;
            }
    }

    deleteEventLocation = async (id)=>
    {
        const repo = new EventsLocationsRepository();
        const msg = await repo.deleteEventLocation(id);
        return msg;
    }
    
}