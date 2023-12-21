const router = require('express').Router();

const withAuth = require('../utils/auth');
const { Question, QuestionTag } = require('../models/index');

router.get("/example", (req, res)=>{
  res.render("example")
})


module.exports = router;

