const router = require('express').Router();
const { Question, Quiz, QuizQuestion, Category } = require('../../models');

//GET request at this route  /api/quiz'
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
                        'category_id',
                        'created_by_user_id'
                    ],
                }
            ],
        });
        // Serialize data so the template can read it
        const quizzes = dbQuizData.map((quiz) => quiz.get({ plain:true }));

        // // Pass serialized data and session flag into template
        res.render("quiz", {
            quizzes,
            // logged_in: req.session.logged_in 
        });

    } catch (err) {
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