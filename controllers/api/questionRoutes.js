const router = require('express').Router();
const express = require('express');
const { Question, Category } = require('../../models/index')
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));


//GET request that will dynamically render options for the category and user select menu 
router.get('/', async (req, res) => {
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
router.post('/questionSubmission', async (req, res) => {
    try {
        const questionData = Question.create({
            question_body: req.params.question_body,
            choice_a: req.params.choice_a,
            choice_b: req.params.choice_b,
            choice_c: req.params.choice_c,
            choice_d: req.params.choice_d,
            answer: req.params.answer,
            category_id: req.params.category_id,
            created_by_user_id: req.session.user_id,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


module.exports = router;