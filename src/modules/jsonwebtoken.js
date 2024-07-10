import jwt from 'jsonwebtoken';

const secretKey = 'OliTami'
const option = 
{
    expiresIn : '1h',
}

class JsonWebToken
{
    async generarJWT(payload)
    {
        const token = jwt.sign(payload,secretKey,option);
        return token;
    }

    async desencriptarJWT(token)
    {
        try
        {
            const payload = await jwt.verify(token,secretKey);
            return payload;
        }
        catch(error)
        {
            console.log(error);
        }
        
    }
}

export default JsonWebToken;
