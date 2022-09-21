var router = require('express').Router();

//exportasiones
var generalRoutes = require('./generals');
var usersRoutes = require('./users');
var triviaRoutes = require('./trivia');




//Segmentacion de rutas
router.use('/', generalRoutes);
router.use('/user', usersRoutes);
router.use('/trivia', triviaRoutes);
 

module.exports = router;