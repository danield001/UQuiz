const router = require('express').Router();

const withAuth = require('../utils/auth');
const { Question, Quiz, QuizQuestion } = require('../models/index');

router.get("/example", (req, res)=>{
  res.render("example")
})

router.get("/login", (req, res)=>{
  res.render("login")
})

// router.get("/quiz", (req, res)=>{
//   res.render("quiz")
// })

router.get("/homepage", (req, res)=>{
  res.render("homepage")
})

//GET request at this route: http://localhost:3001/quiz/:id
//get request to render the page
router.get("/quiz/:id", async (req, res) => {
  try {
      const dbQuizData = await Quiz.findByPk(req.params.id, {
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

      const quizPage = dbQuizData.get({ plain: true });

      console.log("Rendering quiz page:", quizPage);
      
      res.render("quiz-page", { 
          quizPage 
      });       
      
  } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Internal Server Error', details: err.message });
  }
});

module.exports = router;

