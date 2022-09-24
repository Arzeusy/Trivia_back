const router = require("express").Router();
const triviaSchema = require('../models/trivia');
const answerSchema = require('../models/answer');
const triviaController = require('../controllers/triviaController');



router.post("/newQuestion", (req, res) => triviaController.newQuestion(req, res));

router.post("/onGame", (req, res) => triviaController.onGame(req, res));

router.get("/answers/:id", (req, res) => triviaController.getAnswers(req, res));

router.post("/savePoints/:id", (req, res) => triviaController.savePointsUser(req, res));


module.exports = router