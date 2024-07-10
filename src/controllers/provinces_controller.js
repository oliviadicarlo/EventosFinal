import {Router} from 'express';
import ProvinceService from '../services/provinces_service.js';
const router = Router();
const svc = new ProvinceService();

//Ejercicio 7 Start
router.get('', async (req, res) => {
    try {
        const response = await svc.getAllProvinces();
        if (response.success) {
            return res.status(200).json(response.datos);
        } else {
            return res.status(500).send(response.message);
        }
    } catch (error) {
        return res.status(500).send('Error interno.');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await svc.getById(req.params.id);
        if (response.success) {
            return res.status(200).json(response.datos);
        } else {
            return res.status(404).send(response.message); // Cambiado a 404 si no se encuentra la provincia
        }
    } catch (error) {
        return res.status(500).send('Error interno.');
    }
});

router.get('/:id/locations', async (req, res) => {
    try {
        const response = await svc.getLocationsById(req.params.id);
        if (response.success) {
            return res.status(200).json(response.datos);
        } else {
            return res.status(404).send(response.message); // Cambiado a 404 si no se encuentran ubicaciones para el ID de provincia
        }
    } catch (error) {
        return res.status(500).send('Error interno.');
    }
});

router.post('', async (req, res) => {
    try {
        if (req.body.name.length < 3) {
            return res.status(400).send('Nombre vacío o menos de 3 letras.');
        } 
        if (!Number.isFinite(req.body.latitude) || !Number.isFinite(req.body.longitude)) {
            return res.status(400).send('Latitud o Longitud no son números.');
        }
        const response = await svc.postProvince(req.body);
        if (response.success) {
            return res.status(200).json(response.datos);
        } else {
            return res.status(500).send(response.message);
        }
    } catch (error) {
        return res.status(500).send('Error interno.');
    }
});

router.put('', async (req, res) => {
    try {
        if (req.body.name.length < 3) {
            return res.status(400).send('Nombre vacío o menos de 3 letras.');
        } 
        if (!Number.isFinite(req.body.latitude) || !Number.isFinite(req.body.longitude)) {
            return res.status(400).send('Latitud o Longitud no son números.');
        }
        const response = await svc.putProvince(req.body);
        if (response.success) {
            return res.status(200).send();
        } else {
            return res.status(404).send(response.message); // Cambiado a 404 si no se encuentra el ID especificado
        }
    } catch (error) {
        return res.status(500).send('Error interno.');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const response = await svc.deleteProvince(req.params.id);
        if (response.success) {
            if (response.datos.rowCount === 0) {
                return res.status(404).send('No se encontró el ID especificado.');
            }
            return res.status(200).send();
        } else {
            return res.status(404).send(response.message); // Cambiado a 404 si no se encuentra el ID especificado
        }
    } catch (error) {
        return res.status(500).send('Error interno.');
    }
});
//Ejercicio 7 End

export default router
