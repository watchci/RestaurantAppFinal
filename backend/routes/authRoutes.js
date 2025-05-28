const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const userModel = require('../models/userModel');
const { authenticateToken } = require('../middleware/authMiddleware');

// Εγγραφή
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await authService.registerUser(name, email, password);
        res.status(201).json({ message: 'Εγγραφή επιτυχής.' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Σύνδεση
// Σύνδεση
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token } = await authService.loginUser(email, password);
        res.json({ message: 'Επιτυχής σύνδεση', token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});


// Προφίλ
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.user_id);
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Σφάλμα κατά την ανάκτηση προφίλ.' });
    }
});

module.exports = router;
