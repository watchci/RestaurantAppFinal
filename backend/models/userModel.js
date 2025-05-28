const db = require('../config/db');

const findByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const createUser = async (name, email, hashedPassword) => {
    await db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
    );
};

const findById = async (user_id) => {
    const [rows] = await db.query(
        'SELECT user_id, name, email FROM users WHERE user_id = ?',
        [user_id]
    );
    return rows[0];
};

const findAll = async () => {
    const [rows] = await db.query('SELECT user_id, name, email FROM users');
    return rows;
};

const deleteById = async (userId) => {
    await db.query('DELETE FROM users WHERE user_id = ?', [userId]);
};

module.exports = {
    findByEmail,
    createUser,
    findById,
    findAll,
    deleteById
};

