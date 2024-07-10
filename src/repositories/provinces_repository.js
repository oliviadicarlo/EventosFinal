import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class ProvinceRepository{
    getAllProvinces = async () =>
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql =  'SELECT * FROM provinces';
            const result = await client.query(sql);
            returnArray = result.rows;
            await client.end();
        }
        catch(error)
        {
            console.log(error);
        }
        return returnArray;
    }

    getById = async (id) => 
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql =  'SELECT * FROM provinces where id = $1';
            const result = await client.query(sql,[id]);
            await client.end();
            returnArray = result.rows;
        }
        catch(error)
        {
            console.log(error);
        }
        return returnArray;
    }

    getLocationsById = async (id) =>
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql = 'SELECT * FROM locations where id_province = $1'
            const result = await client.query(sql,[id])
            await client.end();
            returnArray = result.rows
        }
        catch(error)
        {
            console.log(error)
        }
        return returnArray;
    }
        
    postProvince = async (entity) => 
    {
        const client = new Client(DBConfig);
        let result;
        try {
            await client.connect();
            const sql = 'INSERT INTO provinces (name,full_name,latitude,longitude,display_order) VALUES ($1,$2,$3,$4,$5)';
            result = await client.query(sql, [entity.name,entity.full_name,entity.latitude,entity.longitude,entity.display_order]);
            await client.end();
        }
        catch(error)
        {
            console.log(error);
        }
        return result;
    }

    putProvince = async (entity) => 
    {
        let success = false;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'UPDATE provinces SET name = $2, full_name = $3, latitude= $4, longitude = $5, display_order = $6 WHERE id = $1';
            await client.query(sql, [entity.id, entity.name,entity.full_name,entity.latitude,entity.longitude,entity.display_order]);
            await client.end();
            success = true; 
        }
        catch(error)
        {
            console.log(error);
        }
        return success;
    }

    deleteProvince = async (id) => 
    {
        let result;
        let rowCount= 0;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'DELETE FROM provinces WHERE id = $1';
            result = await client.query(sql, [id]);
            await client.end();
            rowCount = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return rowCount;
    }
}

