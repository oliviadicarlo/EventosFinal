import {Router} from 'express';
import EventsService from '../services/events_service.js';
import events_enrollmentsService from '../services/events_enrollments-service.js';
import mdw from '../middelware/mdw.js';
const router = Router();
const svc = new EventsService();
const svcE = new events_enrollmentsService();
const MIDLEWARE = new mdw();


//Ejercicio 2
router.get('', async (req,res) =>
{
    try
    {
        const events = await svc.getEvents();
        if (events != null) {
            return res.status(200).json(events);
        } else {
            return res.status(500).send('Error interno.');
        }
    }catch{
        return res.status(500).send('Error interno.');
    }
});

//Ejercicio 3
router.get('', async (req, res) => {
    try {
        const query = req.query;

        const events = await svc.getEvent(query);

        if (events != null) {
            return res.status(200).json(events);
        } else {
            return res.status(404).send('No se encontro el evento');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno.');
    }
});

//Ejercicio 4
router.get('/:id', async (req, res) => {

    try {
        const id = req.params.id;

        const event = await svc.getEventById(id);

        if (event != null) {
            return res.status(200).json(event);
        } else {
            return res.status(404).send('Id Inexistente.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno.');
    }
});

//Ejercicio 5
router.get('/:id/enrollment', async (req, res) => {
    
    try {
        const eventId = req.params.id;
        const query = { eventId };

        if (req.query.first_name) query.first_name = req.query.first_name;
        if (req.query.last_name) query.last_name = req.query.last_name;
        if (req.query.username) query.username = req.query.username;
        if (req.query.attended !== undefined) query.attended = req.query.attended === 'true';
        if (req.query.rating) query.rating = parseInt(req.query.rating, 10);

        const users = await svcE.getUserFromEvent(query);

        if (users.length > 0) {
            return res.status(200).json(users);
        } else {
            return res.status(404).send('No se encontraron usuarios con los criterios dados.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno.');
    }
});

//Ejercicio 8 Start
router.post('/', MIDLEWARE.authMiddelware, async (req, res) => {
    try {
        const enrollment = await svc.createEvent(req.body, req.user.id); // Se pasa el ID del usuario autenticado
        if (enrollment.success) {
            return res.status(201).json(enrollment);
        } else {
            return res.status(400).json(enrollment);
        }
    } catch (error) {
        console.error('Error en POST /api/event/', error);
        return res.status(500).send('Error interno.');
    }
});

router.put('/', MIDLEWARE.authMiddelware, async (req, res) => {
    try {
        const updatedEvent = await svc.updateEvent(req.body, req.user.id); // Se pasa el ID del usuario autenticado
        if (updatedEvent.success) {
            return res.status(200).json(updatedEvent);
        } else if (updatedEvent.statusCode === 401) {
            return res.status(401).send(updatedEvent.message);
        } else {
            return res.status(400).send(updatedEvent.message);
        }
    } catch (error) {
        console.error('Error en PUT /api/event/', error);
        return res.status(500).send('Error interno.');
    }
});

router.delete('/:id', MIDLEWARE.authMiddelware, async (req, res) => {
    try {
        const deletedEvent = await svc.deleteEvent(req.params.id, req.user.id); // Se pasa el ID del usuario autenticado
        if (deletedEvent.success) {
            return res.status(200).json(deletedEvent);
        } 
        else if (deletedEvent.statusCode === 400){
            return res.status(400).send(deletedEvent.message);
        }
        else if (deletedEvent.statusCode === 401) {
            return res.status(401).send(deletedEvent.message);
        } 
        else {
            return res.status(404).send(deletedEvent.message);
        }
    } catch (error) {
        console.error('Error en DELETE /api/event/:id', error);
        return res.status(500).send('Error interno.');
    }
});
//Ejercicio 8 End

//Ejercicio 9 Start
router.post('/:id/enrollment', MIDLEWARE.authMiddelware, async (req, res) => {
    try {
        const enrollment = await svcE.enrollInEvent(req.params.id, req.user.id); // Se pasa el ID del usuario autenticado
        if (enrollment.success) {
            return res.status(201).json(enrollment.message);
        } 
        else if(enrollment.statusCode === 400){
            return res.status(400).json(enrollment.message);
        }
        else{
            return res.status(404).send(enrollment.message)
        }
    } catch (error) {
        console.error('Error en POST /api/event/:id/enrollments', error);
        return res.status(500).send('Error interno.');
    }
});

router.delete('/:id/enrollment', MIDLEWARE.authMiddelware, async (req, res) => {
    let usuario = req.user.id;
    try {
        const deletedEvent = await svcE.unenrollFromEvent(req.params.id, usuario); // Se pasa el ID del usuario autenticado
        if (deletedEvent.success) {
            return res.status(200).json(deletedEvent);
        } else if (deletedEvent.statusCode === 401) {
            return res.status(401).send(deletedEvent.message);
        } else {
            return res.status(404).send(deletedEvent.message);
        }
    } catch (error) {
        console.error('Error en DELETE /api/event/:id', error);
        return res.status(500).send('Error interno.');  
    }
});
//EJercicio 9 End

//Ejercicio 10 Start
router.patch('/:id/enrollment/:entero', MIDLEWARE.authMiddelware, async (req,res)=> {
    let usuario = req.user.id;
    
    try{
        let event = await svc.getEventById(req.params.id);
        const event_Enrollment_Update = await svcE.updateEventRank(req.params.id,event.start_date,req.params.entero,usuario, req.body.observations)
        if(event_Enrollment_Update == true)
        {
            console.log("Evento actualizado");
        }

    }
    catch (error){
        console.error('Error en Patch /api/event/:id/enrollment/:entero', error);
        return res.status(500).send('Error interno.');  
    }
})

export default router