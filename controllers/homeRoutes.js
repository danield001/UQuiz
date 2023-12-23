const router = require('express').Router();

const withAuth = require('../utils/auth');
const { Question, QuestionTag } = require('../models/index');

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



module.exports = router;

