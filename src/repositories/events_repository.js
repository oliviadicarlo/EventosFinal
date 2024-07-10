import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class eventsRepository
{   
    createEvent = async (eventData) => {
        const client = new Client(DBConfig);
        const { name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user } = eventData;
        try {
            await client.connect();
            const sql = 'INSERT INTO events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';
            const params = [name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user];
            const result = await client.query(sql, params);
            return result.rows[0].id;
        } catch (error) {
            console.error('Error en createEvent:', error);
            throw new Error('Error al crear el evento en la base de datos.');
        } finally {
            await client.end();
        }
    }
    
    updateEvent= async (eventData) => {
        const client = new Client(DBConfig);
        const { id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user } = eventData;
        try {
            await client.connect();
            const sql = 'UPDATE events SET name = $2, description = $3, id_event_category = $4, id_event_location = $5, start_date = $6, duration_in_minutes = $7, price = $8, enabled_for_enrollment = $9, max_assistance = $10 WHERE id = $1';
            const params = [id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance];
            await client.query(sql, params);
            return true;
        } catch (error) {
            console.error('Error en updateEvent:', error);
            throw new Error('Error al actualizar el evento en la base de datos.');
        } finally {
            await client.end();
        }
    }
    
    deleteEvent = async (eventId) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'DELETE FROM events WHERE id = $1';
            const result = await client.query(sql, [eventId]);
            return result;
        } catch (error) {
            console.error('Error en deleteEvent:', error);
            throw new Error('Error al eliminar el evento en la base de datos.');
        } finally {
            await client.end();
        }
    }

    getUsersRegisteredCount = async (eventId) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT *
            FROM event_enrollments
            WHERE id_event = $1`;
            const result = await client.query(sql, [eventId]);
            return result.rows[0];
        } 
        catch (error) {
            console.error('Error en getUsersRegisteredCount:', error);
            throw new Error('Error al obtener los usuarios registrados en el evneto de la base de datos.');
        }
        finally {
            await client.end();
        }
    }


    getEventById = async (eventId) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM events WHERE id = $1';
            const result = await client.query(sql, [eventId]);
            return result.rows[0];
        } 
        catch (error) {
            console.error('Error en getEventById:', error);
            throw new Error('Error al obtener el evento desde la base de datos.');
        }
        finally {
            await client.end();
        }
    }

    getMaxCapacity = async (id_event_location) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
    
            const sql = `
                SELECT max_capacity
                FROM event_locations
                WHERE id = $1;
            `;
    
            const result = await client.query(sql, [id_event_location]);
    
            if (result.rows.length > 0) {
                return result.rows[0].max_capacity;
            } else {
                throw new Error(`No se encontró la ubicación del evento con el ID proporcionado (${id_event_location}).`);
            }
        } catch (error) {
            console.error('Error en getMaxCapacity:', error);
            throw error;
        } finally {
            await client.end();
        }
    };

    obtenerCapacidadMaxima = async (id) =>
    {
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql = 'SELECT max_capacity FROM event_locations RIGHT JOIN events ON event_locations.id_creator_user = events.id_creator_user WHERE event_locations.id_creator_user = $1';
            const result = await client.query(sql, [id]);
            await client.end();
            return result;
        } 
        catch (error)
        {
                
                return console.log(error);
        }
    }

    getEvents = async () =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM events';
            const result = await client.query(sql);
            await client.end();
            return result;
        } catch (error) {
            console.log(error);
        }
        
    }
    
    getEvent = async (query) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
    
            let sql = `
                SELECT events.*, event_categories.name AS category_name
                FROM events
                LEFT JOIN event_categories ON events.id_event_category = event_categories.id
            `;
    
            const queryParams = [];
    
            if (query.tag) {
                sql += ' INNER JOIN event_tags ON events.id = event_tags.id_event';
                sql += ' INNER JOIN tags ON event_tags.id_tag = tags.id';
                sql += (queryParams.length > 0 ? ' AND' : ' WHERE') + ' tags.name = $' + (queryParams.length + 1);
                queryParams.push(query.tag);
            }
    
            if (query.startdate) {
                sql += (queryParams.length > 0 ? ' AND' : ' WHERE') + ' start_date = $' + (queryParams.length + 1);
                queryParams.push(query.startdate);
            }
    
            if (query.name) {
                sql += (queryParams.length > 0 ? ' AND' : ' WHERE') + ' lower(events.name) = lower($' + (queryParams.length + 1) + ')';
                queryParams.push(query.name);
            }

            if (query.category) {
                sql += (queryParams.length > 0 ? ' AND' : ' WHERE') + ' lower(event_categories.name) = lower($' + (queryParams.length + 1) + ')';
                queryParams.push(query.category);
            }
    
            const result = await client.query(sql, queryParams);
            await client.end();
            return result.rows;
            
        } catch (error) {
            console.log(error);
        }
    }
    
    getEventDetail = async (id) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
            SELECT events.*,
                   event_categories.name AS category_name,
                   event_locations.id AS event_location_id,
                   event_locations.full_address,
                   event_locations.max_capacity,
                   event_locations.latitude AS event_location_latitude,
                   event_locations.longitude AS event_location_longitude,
                   locations.id AS location_id,
                   locations.name AS location_name,
                   locations.latitude AS location_latitude,
                   locations.longitude AS location_longitude,
                   provinces.id AS province_id,
                   provinces.name AS province_name,
                   users.id AS creator_user_id,
                   users.username AS creator_username,
                   users.first_name AS creator_first_name,
                   users.last_name AS creator_last_name,
                   array_agg(tags.name) AS tags
            FROM events
            LEFT JOIN event_categories ON events.id_event_category = event_categories.id
            LEFT JOIN event_locations ON events.id_event_location = event_locations.id
            LEFT JOIN locations ON event_locations.id_location = locations.id
            LEFT JOIN provinces ON locations.id_province = provinces.id
            LEFT JOIN users ON events.id_creator_user = users.id
            LEFT JOIN event_tags ON events.id = event_tags.id_event
            LEFT JOIN tags ON event_tags.id_tag = tags.id
            WHERE events.id = $1
            GROUP BY events.id, event_categories.id, event_locations.id, locations.id, provinces.id, users.id`;
    
            
            const result = await client.query(sql, [id]);
            if (result.rowCount > 0) {
                const success = true;
                // Procesa los resultados si es necesario
            } else {
                console.log('No se encontró el evento con el ID proporcionado');
            }
    
            await client.end();
            return result.rows; // Retorna los resultados
        } catch (error) {
            console.log(error);
        }
    };
}