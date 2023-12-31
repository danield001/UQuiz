const router = require('express').Router();
const express = require('express')
const path = require('path')

const withAuth = require('../utils/auth');
const { Question, Quiz, QuizQuestion, Category } = require('../models/index');

router.get("/login", (req, res)=>{
  res.render("login")
})

//Get data for rendering quiz building page
router.get('/quiz', async (req, res) => {
  try {
      const dbCategoryData = await Category.findAll({
          include: [
              {
                  model: Question,
                  attributes: [
                      'id',
                      'question_body',
                      'created_by_user_id',
                  ],
              },
          ],
      });
      const categories = dbCategoryData.map((category) =>
      category.get({ plain: true }));
      
      res.render('quiz-home', {
          categories
      });
  } catch (err) {
      console.error(err); // Log the error to the console for debugging
      res.status(500).json(err);
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
            "category_id",
            "created_by_user_id",
          ],
        },
      ],
    });
 
    const quiz = dbQuizData.get({ plain: true });

    console.log("Rendering quizzes", quiz);

    return res.render("quiz-page",
      quiz);
    

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

