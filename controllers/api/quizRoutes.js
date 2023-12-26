const router = require('express').Router();
const { Question, Quiz, QuizQuestion } = require('../../models');

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
                        'answer',
                        'created_by_user_id'
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



//get route for quizData to send to js file to dynamically render
router.get(`/data/:id`, async (req, res) => {
    try {

        const quizData = await Quiz.findByPk(req.params.id, {
            include: [
                {
                    model: Question, 
                    through: QuizQuestion,
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

        res.status(200).json(quizData) 
        
    } catch (err) {
        res.status(500).json(err);
    }});

module.exports = router;