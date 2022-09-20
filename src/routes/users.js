const router = require("express").Router();
const userSchema = require('../models/user');
const userController = require('../controllers/userController');

router.get("/", (req, res) => {
    userSchema
        .find()
        .then((data) => { res.json(data) })
        .catch((error) => res.json({ message: error }));

});


router.post("/", (req, res) => {
    const user = userSchema(req.body);
    user.save().then(
        (data) => res.json(data)
    ).catch(
        (error) => res.json({ message: error })
    );
});


router.get("/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => { res.json({data:{nickname: data.nickname}}) })
        .catch((error) => res.json({ message: error }));

});


router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nickname, email } = req.body;
    userSchema
        .updateOne({_id:id}, { $set: {nickname, email} })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    
});


router.post("/signup", (req, res) => userController.signup(req, res));


router.post("/signin", (req, res)=> userController.signin(req, res));


router.post("/logout", (req, res)=> userController.logout(req, res));



module.exports = router