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
        
        const quizzes = await dbQuizData.map((quiz) =>
        {
        console.log(quizzes);
        quiz.get({ plain: true })
        });
        console.log(quizzes);
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

        console.log("Rendering quiz page:", quizPage);
        
        res.render("quiz-page", { 
            ...quizPage 
        });       
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Internal Server Error', details: err.message });
    }
});

module.exports = router;