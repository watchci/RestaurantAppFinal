const express = require('express');
const router = express.Router();
const restaurantService = require('../services/restaurantService');
const { authenticateToken } = require('../middleware/authMiddleware');

// GET όλα
router.get('/', async (req, res) => {
    try {
        const restaurants = await restaurantService.getAll();
        res.json({ restaurants });
    } catch (err) {
        res.status(500).json({ error: 'Σφάλμα κατά την ανάκτηση.' });
    }
});

// POST νέο
router.post('/', authenticateToken, async (req, res) => {

    const { name, location, description } = req.body;

    if (!name || !location) {
        return res.status(400).json({ error: 'Όνομα και τοποθεσία απαιτούνται.' });
    }

    try {
        await restaurantService.create(name, location, description);
        res.status(201).json({ message: 'Το εστιατόριο δημιουργήθηκε.' });
    } catch (err) {
        res.status(500).json({ error: 'Σφάλμα κατά την καταχώρηση.' });
    }
});

router.delete('/:id', authenticateToken,  async (req, res) => {
    try {
        await restaurantService.deleteById(req.params.id);
        res.json({ message: 'Το εστιατόριο διαγράφηκε.' });
    } catch (err) {
        res.status(500).json({ error: 'Σφάλμα διαγραφής.' });
    }
});
router.put('/:id', authenticateToken, async (req, res) => {
    const { name, location, description } = req.body;

    if (!name || !location) {
        return res.status(400).json({ error: 'Όνομα και τοποθεσία απαιτούνται.' });
    }

    try {
        await restaurantService.update(req.params.id, name, location, description || '');
        res.json({ message: 'Το εστιατόριο ενημερώθηκε.' });
    } catch (err) {
        res.status(500).json({ error: 'Σφάλμα ενημέρωσης.' });
    }
});


module.exports = router;
