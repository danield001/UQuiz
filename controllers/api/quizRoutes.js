const router = require('express').Router();
const { Question, Quiz } = require('../../models');

router.get('/', async (req, res) => {
    try {
        //Get all quizzes and JOIN with question data
        const dbQuizData = await Quiz.findAll({
            include: [
                {
                    model: Question,
                    as: 'questions',
                    attributes: ['question_body'],
                    
                },
            ],
        });

        const quizzes = dbQuizData.map((quiz) =>
        quiz.get({ plain: true })
        );
        res.render("quiz", {
            quizzes
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

module.exports = router;