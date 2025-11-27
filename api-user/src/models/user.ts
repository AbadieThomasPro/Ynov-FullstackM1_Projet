import db from '../config/db.js';

const createUser = async (email: string, password: string) => {
    const result = await db.query(
        `INSERT INTO users (email, password)
         VALUES ($1, $2)
         RETURNING id, email`,
        [email, password]
      );
      return result.rows[0];
}

const getUserByEmail = async (email: string) => {
    const result = await db.query(
        `SELECT id, email, password FROM users WHERE email = $1`,
        [email]
    );
    return result.rows[0];
}

export { createUser, getUserByEmail };