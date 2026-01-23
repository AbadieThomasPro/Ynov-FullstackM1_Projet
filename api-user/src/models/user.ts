import db from '../config/db.js';

/**
 * Create a new user
 * @param email - User email address
 * @param password - Hashed password
 * @param pseudo - User pseudo/username
 * @returns Created user object (userid, email, pseudo) or null on error
 */
const createUser = async (email: string, password: string, pseudo: string) => {
    try {
        console.log("Tentative création user:", email);
        const result = await db.query(
            `INSERT INTO users (email, password, pseudo)
             VALUES ($1, $2, $3)
             RETURNING userid, email, pseudo`,
            [email, password, pseudo]
        );
        console.log("Résultat création user:", result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error("Erreur SQL création user:", err);
        return null;
    }
}

/**
 * Get user by email
 * @param email - User email address
 * @returns User object with password or undefined
 */
const getUserByEmail = async (email: string) => {
    const result = await db.query(
    `SELECT userid, email, password, pseudo, avatarurl, bio, role FROM users WHERE email = $1`,
        [email]
    );
    return result.rows[0];
}

/**
 * Get user by ID
 * @param id - User UUID
 * @returns User object (without password) or undefined
 */
const getUserById = async (id: string) => {
    const result = await db.query(
    `SELECT userid, email, pseudo, avatarurl, bio, role FROM users WHERE userid = $1`,
        [id]
    );
    return result.rows[0];
}

/**
 * List all users
 * @returns Array of users with basic info (userid, email, pseudo, avatarurl)
 */
const listUsers = async () => {
    const result = await db.query(
    `SELECT userid, email, pseudo, avatarurl FROM users`,
    );
    return result.rows;
}

/**
 * Delete user by ID
 * @param id - User UUID
 * @returns Deleted user object or undefined
 */
const deleteUser = async (id: string) => {
    const result = await db.query(
        `DELETE FROM users WHERE userid = $1`,
        [id]
    );
    return result.rows[0];
}

export { createUser, getUserByEmail, listUsers, deleteUser, getUserById };