const withAuth = require('../../utils/auth');
const { Question, Quiz, Category } = require('../../models')
const path = require('path');
const express = require('express'); // Import express

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const categoryDisp = await Category.findAll()
        if (!categoryDisp) {
            res.status(404);
            res.json({ message: 'Question not found' });
        } else {
            res.status(200).json(categoryDisp);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;