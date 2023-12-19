const router = require('express').Router();

const { Model } = require('sequelize');
const apiRoutes = require('../controllers/api');
const homeRoutes = require('../controllers/homeRoutes');
const withAuth = require('../utils/auth');

router.use('/', homeRoutes);
router.use('/api', withAuth, apiRoutes);

module.exports = router;

