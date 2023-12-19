const withAuth = require('../../utils/auth');
const { Question, Quiz, Category } = require('../../models/index')

const router = require('express').Router();

router.get('/category', withAuth, async (req, res) => {
    try {
        const categoryDisp = await Category.findAll()
        if (!categoryDispDisp) {
            res.status(404);
            res.json({ message: 'Question not found' });
        } else {
            res.status(200).json(categoryDisp);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;