import {Router} from 'express';
import LocationService from '../services/locations_service.js';
import mdw from '../middelware/mdw.js';
const MIDLEWARE = new mdw();
const router = Router();
const svc = new LocationService();


router.get('/:id', async (req,res) =>
{
    const id = parseInt(req.params.id);
    try {
        const Location = await svc.getLocationsById(id);
        if (Location != null) {
            return res.status(200).json(Location);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        
        return res.status(500).send('Error interno.');
    }

});


router.get('', async (req,res) =>
{
    try
    {
        const locations = await svc.getAllLocations();
        if (locations != null) {
            return res.status(200).json(locations);
        } else {
            return res.status(500).send('Error interno.');
        }
    }catch{
        return res.status(500).send('Error interno.');
    }
});

router.get('/:id/event-location',MIDLEWARE.authMiddelware, async (req,res) =>
    {
        const id = parseInt(req.params.id);
        try{
            const location = await svc.getEventLocationByLocationId(id)
            if (location != null) {
                return res.status(200).json(location);
            } else {
                return res.status(500).send('Error interno.');
            }
        }
        catch{
            return res.status(500).send('Error interno.');
        }
    })




export default router