const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const express = require('express');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);

// Health Check
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

module.exports = router;
