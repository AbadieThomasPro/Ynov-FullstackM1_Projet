import { Pool } from 'pg';
import 'dotenv/config';


const pool = new Pool({
    user: process.env.PGUSER || process.env.PGUSER_USER,
    host: process.env.PGHOST || process.env.PGHOST_USER || 'db-user',
    database: process.env.PGDATABASE || process.env.PGDATABASE_USER,
    password: process.env.PGPASSWORD || process.env.PGPASSWORD_USER,
    port: Number(process.env.PGPORT || process.env.PGPORT_USER) || 5432,
});
console.log("Connexion pool PG créée");

export default pool;