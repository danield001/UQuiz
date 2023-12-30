const router = require('express').Router();
const express = require('express')
const path = require('path')

const withAuth = require('../utils/auth');
const { Question, Quiz, QuizQuestion } = require('../models/index');

router.get("/login", (req, res)=>{
  res.render("login")
})

//GET request at this route  /quiz'
router.get('/quiz', async (req, res) => {
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
        res.render("quiz-home", {
            quizzes,
            // logged_in: req.session.logged_in 
        });

    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

router.get("/example", (req, res) => {
  res.render("example")
})

router.get("/", (req, res) => {
  res.render("homepage")
})

router.get("/account", (req, res) => {
  res.render("account")
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

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});


module.exports = router;

