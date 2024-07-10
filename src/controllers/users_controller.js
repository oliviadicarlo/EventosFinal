import {Router} from 'express';
import UserService from '../services/users_service.js';
import mdw from '../middelware/mdw.js';
const router = Router();
const svc = new UserService();
const MIDLEWARE = new mdw();

//Ejercicio 6 Start
router.post('/login', async (req, res) => {
        
        const response = await svc.login(req.body.username,req.body.password);
        console.log(response)
        if (response != null) {
            if(response.success == true){
                return res.status(200).json(response);
            }
            else{
                return res.status(400).json(response);
            }
        } else {
            return res.status(401).json(response);
        }
});

router.post('/register', async (req, res) => {
    
    const response = await svc.register(req.body);
        if (response != null) {
            if(response == true){
                return res.status(200).send(response)
            }
            else{
                return res.status(400).send(response);
            }
            return res.status(200).send(response);
        }
        else
        {
            return res.status(500).send('Error interno.');
        }
});
//Ejercicio 6 End

export default router