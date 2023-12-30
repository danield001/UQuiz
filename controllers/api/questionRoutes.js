const withAuth = require('../../utils/auth');
const { Question, Category } = require('../../models/index')

const router = require('express').Router();


//GET request that will dynamically render options for the category and user select menu 
router.get('/',  withAuth, async (req, res) => {
    try {
        const dbQuestionData = await Question.findAll({
            include: [
                {
                    model: Category,
                    attributes: [
                        'id',
                        'category_name',
                    ],
                },
            ],
        });
        const questionDetail = dbQuestionData.map((questionDetail) =>
            Question.get({ plain: true })
        );
        res.render("quiz", {
            questionDetail
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET request at this route http://localhost:3001/api/questions for getting a quiz with the same category
router.get('/:category_id', async (req, res) => {
    try {
        const questionDisp = await Question.findAll({
            where: { category_id: req.params.category_id }
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