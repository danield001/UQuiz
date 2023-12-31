const router = require('express').Router();
const { Question, Quiz, QuizQuestion, Score } = require('../../models');

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

router.get('/score/:id', async (req, res) => {
    try {
        const scoreData = await Score.findAll({
            where: {
                quiz_id: req.params.id
            },
        });
    
    console.log("scoreData", scoreData);

    res.status(200).json(scoreData) 
        
    } catch (err) {
        res.status(500).json(err);
    }});

module.exports = router;