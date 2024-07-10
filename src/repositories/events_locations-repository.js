import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class events_locationsRepository
{

    getEventLocations= async () =>    
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_locations ';
            const result = await client.query(sql);
            await client.end();
            return result.rows;
        } catch (error) {
             return console.log(error);
        }
        
    }

    getById = async (id,idUser) => 
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql =  'SELECT * FROM event_locations where id = $1 AND id_creator_user = $2 ';
            const result = await client.query(sql,[id,idUser]);
            await client.end();
            return result.rows;
        }
        catch(error)
        {
           return console.log(error);
        }
        
    }

    createLocation = async (entity,idUsuario)=>
    {
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql =  'INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7);';
            const result = await client.query(sql,[entity.id_location,entity.name,entity.full_adress,entity.max_capacity,entity.latitude,entity.longitude,idUsuario]);
            await client.end();
            return "Creacion exitosa";
        }
        catch(error)
        {
           return "Error de conexion";
        }
    }

    updateEventLocation = async (entity, idUsuario) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
                UPDATE event_locations 
                SET name = $2,
                    full_address = $3,
                    max_capacity = $4,
                    latitude = $5,
                    longitude = $6,
                    id_creator_user = $7
                WHERE id_location = $1`;
            
    const result = await client.query(sql, [
                entity.id_location,
                entity.name,
                entity.full_address, 
                entity.max_capacity,
                entity.latitude,
                entity.longitude,
                idUsuario
            ]);
    
            await client.end();
            return "Actualización exitosa";
        } catch(error) {
            console.error("Error de conexión:", error);
            return "Error de conexión";
        }
    }

    deleteEventLocation = async (id) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
            DELETE FROM event_locations 
            WHERE id_location = $1`;
            
    const result = await client.query(sql, [id]);
    
            await client.end();
            return "Eliminacion exitosa";
        } catch(error) {
            console.error("Error de conexión:", error);
            return "Error de conexión";
        }
    }

    

}