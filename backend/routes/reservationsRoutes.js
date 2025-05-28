const express = require('express');
const router = express.Router();
const reservationService = require('../services/reservationService');
const { authenticateToken } = require('../middleware/authMiddleware');

// Δημιουργία κράτησης
router.post('/', authenticateToken, async (req, res) => {
    const { restaurant_id, date, time, people_count } = req.body;

    try {
        await reservationService.create(
            req.user.user_id, restaurant_id, date, time, people_count
        );
        res.status(201).json({ message: 'Η κράτηση έγινε επιτυχώς.' });
    } catch (err) {
        res.status(500).json({ error: 'Σφάλμα κράτησης.' });
    }
});

// Όλες του χρήστη
router.get('/my', authenticateToken, async (req, res) => {
    try {
        const reservations = await reservationService.getAllForUser(req.user.user_id);
        res.json({ reservations });
    } catch (err) {
        res.status(500).json({ error: 'Σφάλμα ανάκτησης.' });
    }
});

// Συγκεκριμένη κράτηση
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const reservation = await reservationService.getOneById(req.params.id, req.user.user_id);
        if (!reservation) {
            return res.status(404).json({ error: 'Δεν βρέθηκε.' });
        }
        res.json({ reservation });
    } catch (err) {
        res.status(500).json({ error: 'Σφάλμα ανάκτησης.' });
    }
});

// Ενημέρωση κράτησης
router.put('/:id', authenticateToken, async (req, res) => {
    const { date, time, people_count } = req.body;

    try {
        const updated = await reservationService.update(
            req.params.id, req.user.user_id, { date, time, people_count }
        );

        if (updated === 0) {
            return res.status(404).json({ error: 'Δεν βρέθηκε ή δεν σου ανήκει.' });
        }

        res.json({ message: 'Η κράτηση ενημερώθηκε.' });
    } catch (err) {
        res.status(500).json({ error: 'Σφάλμα ενημέρωσης.' });
    }
});

// Διαγραφή κράτησης
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const deleted = await reservationService.remove(req.params.id, req.user.user_id);
        if (deleted === 0) {
            return res.status(404).json({ error: 'Δεν βρέθηκε ή δεν σου ανήκει.' });
        }

        res.json({ message: 'Η κράτηση διαγράφηκε.' });
    } catch (err) {
        res.status(500).json({ error: 'Σφάλμα διαγραφής.' });
    }
});

// ⚠️ Αν ΔΕΝ θέλεις καθόλου route για όλες τις κρατήσεις, σβήσε εντελώς το παρακάτω:
// router.get('/', ...)

module.exports = router;
