var router = require('express').Router();

//exportasiones
var generalRoutes = require('./generals');
var usersRoutes = require('./users');




//Segmentacion de rutas
router.use('/', generalRoutes);
router.use('/user', usersRoutes);
 

module.exports = router;