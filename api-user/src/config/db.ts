import { Pool } from 'pg';


const pool = new Pool({
    user: 'users',
    host: 'users-db',
    database: 'users',
    password: 'users',
    port: 5432,
});

export default pool;