const withAuth = require('../../utils/auth');
const { Question, Category } = require('../../models/index')

const router = require('express').Router();


router.get('/', withAuth, async (req, res) => {
    try {
        const questionDisp = await Question.findAll({
            include: [{ Model: Question }],
            });
        if (!questionDisp) {
            res.status(404);
            res.json({ message: 'Question not found' });
        } else {
            res.status(200).json(questionDisp);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:category_id', async (req, res) => {
    try {
        const questionDisp = await Question.findAll({
            where: { category_id:  req.params.category_id }
        });
        if (!questionDisp) {
            res.status(400);
            res.json({ message: 'Question not found' });
        } else {
            res.status(200).json(questionDisp);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// need to ensure question data is being send in correctly from the views
router.post('/', withAuth, async (req, res) => {
    try {
        const questionData = Question.create(req.body);
        res.status(200).json(questionData);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;