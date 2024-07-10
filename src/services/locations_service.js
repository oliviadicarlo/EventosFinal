import LocationRepository from '../repositories/locations_repository.js';

export default class LocationService
{
    getLocationsById = async (id) => 
    {
        const repo = new LocationRepository();
        const Location = await repo.getLocationsById(id);
        return Location;
    }

    getAllLocations = async() =>
    {
        const repo = new LocationRepository();
        const Location = await repo.getAllLocations();
        return Location;
    }

    getEventLocationByLocationId = async (id) =>
        {
            const repo = new LocationRepository();
        const Location = await repo.getEventLocationsByIdLocation(id);
        return Location;
        }

    

}