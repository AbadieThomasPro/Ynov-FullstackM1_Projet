import { Pool } from 'pg';
import 'dotenv/config';


const pool = new Pool({
    user: process.env.PGUSER_USER,
    host: process.env.PGHOST_USER,
    database: process.env.PGDATABASE_USER,
    password: process.env.PGPASSWORD_USER,
    port: 5432,
});
console.log("Connexion pool PG créée");

export default pool;