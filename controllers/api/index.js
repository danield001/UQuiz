const router = require('express').Router();

const userRoutes = require('./userRoutes');
const questionRoutes = require('./questionRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/users', userRoutes);
router.use('/question', questionRoutes);
router.use('/category', categoryRoutes);

module.exports = router;

