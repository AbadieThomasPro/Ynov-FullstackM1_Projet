import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  user: process.env.PGUSER || process.env.PGUSER_RECIPE,
  host: process.env.PGHOST || process.env.PGHOST_RECIPE || 'db-recipe',
  database: process.env.PGDATABASE || process.env.PGDATABASE_RECIPE,
  password: process.env.PGPASSWORD || process.env.PGPASSWORD_RECIPE,
  port: Number(process.env.PGPORT || process.env.PGPORT_RECIPE) || 5432,
});

export default pool;
