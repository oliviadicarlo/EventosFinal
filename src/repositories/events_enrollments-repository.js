import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class events_enrollments
{

    getUsersFromEvent = async () =>    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM users INNER JOIN event_enrollments ON users.id = event_enrollments.id_user INNER JOIN events ON event_enrollments.id_event = events.id';
            const result = await client.query(sql);
            if (result.rowCount > 0) {
                success = true;
            }
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }
    
    async getUserFromEvent(query) {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            let sql = `
                SELECT users.*, events.*, event_enrollments.*
                FROM users
                INNER JOIN event_enrollments ON users.id = event_enrollments.id_user
                INNER JOIN events ON event_enrollments.id_event = events.id
                WHERE event_enrollments.id_event = $1
            `;

            const queryParams = [query.eventId];

            if (query.first_name) {
                sql += ' AND lower(users.first_name) = lower($' + (queryParams.length + 1) + ')';
                queryParams.push(query.first_name);
            }

            if (query.last_name) {
                sql += ' AND lower(users.last_name) = lower($' + (queryParams.length + 1) + ')';
                queryParams.push(query.last_name);
            }

            if (query.username) {
                sql += ' AND lower(users.username) = lower($' + (queryParams.length + 1) + ')';
                queryParams.push(query.username);
            }

            if (query.attended !== undefined) {
                sql += ' AND event_enrollments.attended = $' + (queryParams.length + 1);
                queryParams.push(query.attended);
            }

            if (query.rating) {
                sql += ' AND event_enrollments.rating >= $' + (queryParams.length + 1);
                queryParams.push(query.rating);
            }

            const result = await client.query(sql, queryParams);
            await client.end();
            return result.rows;

        } catch (error) {
            console.log(error);
            await client.end();
            throw error; 
        }
    }

    // Obtener cantidad de usuarios registrados en el evento
    async getUsersRegisteredCount(eventId) {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT COUNT(*) FROM event_enrollments WHERE id_event = $1';
            const result = await client.query(sql, [eventId]);
            await client.end();
            return parseInt(result.rows[0].count, 10);
        } catch (error) {
            console.error('Error en getUsersRegisteredCount:', error);
            throw new Error('Error al obtener los usuarios registrados en el evento de la base de datos.');
        }
    }

    // Verificar si un usuario ya está registrado en el evento
    async checkUserRegistration(eventId, userId) {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_enrollments WHERE id_event = $1 AND id_user = $2';
            const result = await client.query(sql, [eventId, userId]);
            await client.end();
            return result.rows.length > 0;
        } catch (error) {
            console.error('Error en checkUserRegistration:', error);
            throw new Error('Error al verificar la inscripción del usuario en el evento.');
        }
    }

    // Registrar usuario en el evento
    async enrollUserInEvent(eventId, userId, registrationDateTime) {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'INSERT INTO event_enrollments (id_event, id_user, registration_date_time) VALUES ($1, $2, $3)';
            await client.query(sql, [eventId, userId, registrationDateTime]);
            await client.end();
        } catch (error) {
            console.error('Error en enrollUserInEvent:', error);
            throw new Error('Error al registrar al usuario en el evento.');
        }
    }

    // Eliminar inscripción del usuario en el evento
    async unenrollUserFromEvent(eventId, userId) {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'DELETE FROM event_enrollments WHERE id_event = $1 AND id_user = $2';
            await client.query(sql, [eventId, userId]);
            await client.end();
        } catch (error) {
            console.error('Error en unenrollUserFromEvent:', error);
            throw new Error('Error al eliminar la inscripción del usuario en el evento.');
        }
    }

    updateEventRatingById = async (idEvento, entero, idUsuario,observacion) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'UPDATE event_enrollments SET observations = $2, rating = $1  WHERE id_event = $3 AND id_user = $4';
            const result = await client.query(sql, [entero,observacion,idEvento,idUsuario]);
            
                await client.end();
                return true;
    
            
        } catch (error) {
           return console.log(error);
        }
        
    }
    
    createEnrollment = async (entity) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'INSERT INTO event_enrollments(id_event, id_user, description, registration_date_time) VALUES($1,$2,$3,$4) WHERE (SELECT max_assistance FROM events WHERE id = $1) < (SELECT COUNT(id) FROM event_enrollments WHERE id_event = $1) AND (SELECT enabled_for_enrollment FROM events WHERE id = $1) = 1 AND';
            const result = await client.query(sql, [entity.id_event,entity.id_user,entity.description,entity.registration_date_time]);
            if (result.rowCount > 0) {
                success = true;
            }
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }
}