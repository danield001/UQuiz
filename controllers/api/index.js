const router = require('express').Router();

const userRoutes = require('../api/userRoutes');
const questionRoutes = require('../api/questionRoutes');
const categoryRoutes = require('../api/categoryRoutes');

router.use('/users', userRoutes);
router.use('/question', questionRoutes);
router.use('/category', categoryRoutes);

module.exports = router;

