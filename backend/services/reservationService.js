const reservationModel = require('../models/reservationModel');

const create = async (userId, restaurantId, date, time, peopleCount) => {
    await reservationModel.createReservation(userId, restaurantId, date, time, peopleCount);
};

const getAllForUser = async (userId) => {
    return await reservationModel.getUserReservations(userId);
};

const getOneById = async (reservationId, userId) => {
    return await reservationModel.getReservationById(reservationId, userId);
};



const update = async (reservationId, userId, updatedData) => {
    const reservation = await reservationModel.getReservationById(reservationId, userId);

    if (!reservation) {
        throw new Error('Δεν βρέθηκε η κράτηση.');
    }

    const { date, time, people_count } = updatedData;

    const updated = await reservationModel.updateReservation(
        reservationId,
        userId,
        date,
        time,
        people_count
    );

    return updated;
};



const remove = async (reservationId, userId) => {
    const reservation = await reservationModel.getReservationById(reservationId, userId);

    if (!reservation) {
        throw new Error('Δεν βρέθηκε η κράτηση.');
    }

    await reservationModel.deleteReservation(reservationId, userId);
};


const getAll = async () => {
    return await reservationModel.getAllReservations();
};



module.exports = {
    create,
    getAllForUser,
    getOneById,
    update,
    remove,
    getAll
};
