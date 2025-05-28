const db = require('../config/db');

const createReservation = async (userId, restaurantId, date, time, peopleCount) => {
    await db.query(
        'INSERT INTO reservations (user_id, restaurant_id, date, time, people_count) VALUES (?, ?, ?, ?, ?)',
        [userId, restaurantId, date, time, peopleCount]
    );
};

const getUserReservations = async (userId) => {
    const [rows] = await db.query(
        `SELECT r.reservation_id, r.date, r.time, r.people_count,
                res.name AS restaurant_name, res.location
         FROM reservations r
         JOIN restaurants res ON r.restaurant_id = res.restaurant_id
         WHERE r.user_id = ?`,
        [userId]
    );
    return rows;
};

const getReservationById = async (reservationId, userId) => {
    const [rows] = await db.query(
        `SELECT r.reservation_id, r.date, r.time, r.people_count,
                res.name AS restaurant_name, res.location
         FROM reservations r
         JOIN restaurants res ON r.restaurant_id = res.restaurant_id
         WHERE r.reservation_id = ? AND r.user_id = ?`,
        [reservationId, userId]
    );
    return rows[0];
};

const updateReservation = async (reservationId, userId, date, time, peopleCount) => {
    const [result] = await db.query(
        `UPDATE reservations SET date = ?, time = ?, people_count = ?
         WHERE reservation_id = ? AND user_id = ?`,
        [date, time, peopleCount, reservationId, userId]
    );
    return result.affectedRows;
};

const deleteReservation = async (reservationId, userId) => {
    const [result] = await db.query(
        `DELETE FROM reservations WHERE reservation_id = ? AND user_id = ?`,
        [reservationId, userId]
    );
    return result.affectedRows;
};


const getAllReservations = async () => {
    const [rows] = await db.query(
        `SELECT r.reservation_id, r.date, r.time, r.people_count,
                res.name AS restaurant_name, res.location,
                u.name AS user_name, u.email AS user_email
         FROM reservations r
         JOIN restaurants res ON r.restaurant_id = res.restaurant_id
         JOIN users u ON r.user_id = u.user_id`
    );
    return rows;
};


module.exports = {
    createReservation,
    getUserReservations,
    getReservationById,
    updateReservation,
    deleteReservation,
    getAllReservations
};
