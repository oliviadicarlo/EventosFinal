import {Router} from 'express';
import events_CategoriesService from '../services/event-categories_service.js'
import mdw from '../middelware/mdw.js';
const router = Router();
const svc =  new events_CategoriesService();
const MIDLEWARE = new mdw();


router.get('' ,async (req,res) =>
{
    try
    {
        const cateogries = await svc.getAllCategories()
        if (cateogries != null) {
            return res.status(200).json(cateogries);
        } else {
            return res.status(500).send('Error interno.');
        }
    }catch{
        return res.status(500).send('Error interno.');
    }
});

router.get('/:id', async (req,res) => 
    {
        const id = parseInt(req.params.id);
        try
    {
        const cateogries = await svc.GetCategoryByid(id)
        if (cateogries != null) {
            return res.status(200).json(cateogries);
        } else {
            return res.status(500).send('Error interno.');
        }
    }catch{
        return res.status(500).send('Error interno.');
    }
    });

    router.post('', async (req,res) =>
        {
            try
            {
                const cateogries = await svc.createCategory(req.body);
                if (cateogries != null) {
                    return res.status(200).json(cateogries);
                } else {
                    return res.status(500).send('Error interno.');
                }
            }catch{
                return res.status(500).send('Error interno.');
            }
        });

    router.put('', async (req,res) =>
    {
        try
        {
            const categories = await svc.updateCategory(req.body);
            if (categories != null) {
                return res.status(200).json(categories);
            } else {
                return res.status(500).send('Error interno.');
            }
        }    
        catch
        {
            return res.status(500).send('Error interno.');
        }

    });

    router.delete('/:id', async (req,res) =>
        {
            const id = parseInt(req.params.id)
            try
            {
                const cateogries = await svc.deleteCategory(id)
                if (cateogries != null) {
                    return res.status(200).json(cateogries);
                } else {
                    return res.status(500).send('Error interno.');
                }
            }catch{
                return res.status(500).send('Error interno.');
            }

        });

export default router;