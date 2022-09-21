const router = require("express").Router();
const triviaSchema = require('../models/trivia');
const answerSchema = require('../models/answer');
const triviaController = require('../controllers/triviaController');



router.post("/newQuestion", (req, res) => triviaController.newQuestion(req, res));



module.exports = router