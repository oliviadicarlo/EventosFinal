import jwt from 'jsonwebtoken';
import userRepository from '../repositories/users_repository.js'


export default class MWD
{

    authMiddelware = async (req,res,next) =>
        {
            let token = req.headers.authorization;
            try
            {
                let noBearer = token.slice(7)
                let payload = await jwt.verify(noBearer,'OliTami');
                req.user = payload;
                if(payload != null){
                    next();
                }
                else{
                    return res.status(401).send("Token invalido");
                }
            }catch(e)
            {
                console.log(e);
                return res.status(401).send("Token invalido");
            }
        }
}