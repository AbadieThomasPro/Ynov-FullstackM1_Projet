import db from '../config/db.js';

const createUser = async (email: string, password: string, pseudo: string) => {
    //const pseudo = email.split('@')[0]; // exemple : prend la partie avant @ comme pseudo
    try {
        console.log("Tentative création user:", email);
        const result = await db.query(
            `INSERT INTO users (email, password, pseudo)
             VALUES ($1, $2, $3)
             RETURNING userId, email, password, pseudo`,
            [email, password, pseudo]
        );
        console.log("Résultat création user:", result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error("Erreur SQL création user:", err);
        return null;
    }
}

const getUserByEmail = async (email: string) => {
    const result = await db.query(
        `SELECT userId, email, password FROM users WHERE email = $1`,
        [email]
    );
    return result.rows[0];
}

const getUserById = async (id: string) => {
    const result = await db.query(
        `SELECT userId, email, password FROM users WHERE userId = $1`,
        [id]
    );
    return result.rows[0];
}

const listUsers = async () => {
    const result = await db.query(
        `SELECT userId, email FROM users`,
    );
    return result.rows;
}

const deleteUser = async (id: string) => {
    const result = await db.query(
        `DELETE FROM users WHERE userId = $1`,
        [id]
    );
    return result.rows[0];
}

export { createUser, getUserByEmail, listUsers, deleteUser, getUserById };