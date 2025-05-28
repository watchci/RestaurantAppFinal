const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const registerUser = async (name, email, password) => {
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
        throw new Error('Ο χρήστης υπάρχει ήδη.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(name, email, hashedPassword);
};

const loginUser = async (email, password) => {
    const user = await userModel.findByEmail(email);
    if (!user) {
        throw new Error('Μη έγκυρα στοιχεία σύνδεσης.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Μη έγκυρα στοιχεία σύνδεσης.');
    }

    const token = jwt.sign(
        { user_id: user.user_id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return {
        token
    };
};

module.exports = {
    registerUser,
    loginUser
};
