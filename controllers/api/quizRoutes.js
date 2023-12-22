const router = require('express').Router();
const { Question, Quiz } = require('../../models');

//GET request at this route: http://localhost:3001/api/quizzes
router.get('/', async (req, res) => {
    try {
        //Get all quizzes and JOIN with question data
        const dbQuizData = await Quiz.findAll({
            include: [
                {
                    model: Question,
                    as: 'questions',
                    attributes: [
                        'id',
                        'question_body',
                        'choice_a',
                        'choice_b',
                        'choice_c',
                        'choice_d',
                    ],
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

//GET request at this route: http://localhost:3001/api/quizzes/:id

router.get("/:id", async (req, res) => {
    try {
        const dbQuizData = await Quiz.findByPk(req.params.id, {
            include: [
                {
                    model: Question,
                    as: "questions",
                    attributes: [
                        "id",
                        "question_body",
                        "choice_a",
                        "choice_b",
                        "choice_c",
                        "choice_d",
                        "answer",
                        "created_by_user_id",
                    ],
                },
            ],
        });

        const quizPage = dbQuizData.get({ plain: true });
        console.log(dbQuizData, "dbQuizData");
        console.log(quizPage, "quizPage");
        res.render("quiz-page", { quizPage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

module.exports = router;