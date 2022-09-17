const router = require("express").Router();
const userSchema = require('../models/user');


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
        .then((data) => { res.json(data) })
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


router.post("/signup",  async (req, res) => {
    const { nickname, email, password, confirmPassword } = req.body;
    const errors = [];
    if (password != confirmPassword) {
        errors.push({passwordMatch: "Las contrasenas no coinciden"})
    }
    
    if (password.length < 4 ) {
        errors.push({passwordLength: "Las contrasenas no tiene la longitud minima"})
    }

    await userSchema
        .find({$or:[{nickname: nickname},{email:email}]})
        .then((data) => {
             if (data.length) errors.push({email:"Correo actualmente en uso"})
         })
        .catch((error) => res.json({ message: error }));

    if (errors.length > 0) {
        res.json({DATA : errors})
    } else {
        const user = userSchema({nickname, email, password});
        user.password = await user.encriptPassword(password);
    
        user.save().then(
            (data) => res.json(data)
        ).catch(
            (error) => res.json({ message: error })
        );
    }
});


router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const user = await userSchema
    .find({$or:[{email:email}]})
    .then((data) => { return data; })
    .catch((error) => res.json({ message: error }));

    if (user) {
        console.log("-------------------------------");
        console.log(user);
        const match = await user[0].matchPassword(password);
        console.log(match);
        if (match) {
            res.json({message : "Bienbenido!"})
        } else {
            res.json({ message: "Error de autenticacion" });
        }

    } else {
        res.json({ message: "Error de autenticacion" });
    }
    
});


module.exports = router