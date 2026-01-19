import { Pool } from 'pg';
import 'dotenv/config';


const pool = new Pool({
    user: process.env.PGUSER_USER,
    host: process.env.PGHOST_USER,
    database: process.env.PGDATABASE_USER,
    password: process.env.PGPASSWORD_USER,
    port: Number(process.env.PGPORT_USER) || 5442,
});
console.log("Connexion pool PG créée");

export default pool;