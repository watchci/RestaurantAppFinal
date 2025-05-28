const restaurantModel = require('../models/restaurantModel');

const getAll = async () => {
    return await restaurantModel.getAllRestaurants();
};

const create = async (name, location, description) => {
    await restaurantModel.createRestaurant(name, location, description);
};

const deleteById = async (id) => {
    await restaurantModel.deleteRestaurant(id);
};
const update = async (id, name, location, description) => {
    await restaurantModel.updateRestaurant(id, name, location, description);
};


module.exports = {
    getAll,
    create,
    deleteById,
    update
};
