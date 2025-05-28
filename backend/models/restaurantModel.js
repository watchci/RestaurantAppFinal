const db = require('../config/db');

const getAllRestaurants = async () => {
    const [rows] = await db.query('SELECT * FROM restaurants');
    return rows;
};

const createRestaurant = async (name, location, description) => {
    await db.query(
        'INSERT INTO restaurants (name, location, description) VALUES (?, ?, ?)',
        [name, location, description || '']
    );
};

const deleteRestaurant = async (restaurantId) => {
    await db.query('DELETE FROM restaurants WHERE restaurant_id = ?', [restaurantId]);
};

const updateRestaurant = async (restaurantId, name, location, description) => {
    await db.query(
        `UPDATE restaurants SET name = ?, location = ?, description = ?
         WHERE restaurant_id = ?`,
        [name, location, description, restaurantId]
    );
};

module.exports = {
    getAllRestaurants,
    createRestaurant,
    deleteRestaurant,
    updateRestaurant
};


