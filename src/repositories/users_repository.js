import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class UserRepository
{
    getUserByUsername = async (username,password) => 
    {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql =  'SELECT * FROM users WHERE username = $1 AND password = $2';
            const result = await client.query(sql,[username,password]);
            await client.end();
            if (result.rows.length > 0){

                returnEntity = result.rows[0];
            }
        }
        catch(error)
        {
            console.log(error);
        }
        return returnEntity;
    };
      
    createUser = async (user) => {
        let success = false;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'INSERT INTO users (first_name, last_name, username, password) VALUES ($1,$2,$3,$4)';
            const result = await client.query(sql, [user.first_name, user.last_name, user.username, user.password]);
            if (result != null){
                success = true;
            }
            await client.end();
            return success;
        }
        catch(error)
        {
            return console.log(error);
        }
        
      };
}