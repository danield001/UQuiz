const router = require('express').Router();
const express = require('express')
const path = require('path')

const withAuth = require('../utils/auth');
const { Question, Quiz, QuizQuestion, Category } = require('../models/index');

router.get("/login", (req, res)=>{
  res.render("login")
})

//GET request at this route  /api/quiz'
router.get('/quiz', withAuth, async (req, res) => {
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


router.get("/", (req, res) => {
  res.render("homepage")
})


//GET request at this route: http://localhost:3001/quiz/:id
//get request to render the page
router.get("/quiz/:id", withAuth, async (req, res) => {
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

    res.render("quiz-page", {
      quizPage
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error', details: err.message });
  }
});

router.get('/account', withAuth, async (req, res) => {
  try {
    // Assuming user_id and user_username are stored in the session
    const userPage = {
      user_id: req.session.user_id,
      username: req.session.user_username,
    };

    const categories = await Category.findAll();
    const categoryData = categories.map(category => category.toJSON());

    // Pass the user data and categories to the 'account' template
    res.render('account', { loggedIn: true, userPage, categories: categoryData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
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

