const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const { authenticateToken } = require('../middleware/authMiddleware');


router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await userModel.findAll();
        res.json({ users });
    } catch (err) {
        res.status(500).json({ error: 'Σφάλμα ανάκτησης χρηστών.' });
    }
});

// Διαγραφή χρήστη
router.delete('/:id', authenticateToken,  async (req, res) => {
    try {
        await userModel.deleteById(req.params.id);
        res.json({ message: 'Ο χρήστης διαγράφηκε.' });
    } catch (err) {
        res.status(500).json({ error: 'Σφάλμα διαγραφής χρήστη.' });
    }
});

module.exports = router;
 
