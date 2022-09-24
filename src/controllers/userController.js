const userSchema = require('../models/user');


const signup = async (req, res) => {
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
            (data) => res.json({data:data})
        ).catch(
            (error) => res.json({ message: error })
        );
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await userSchema
        .find({ $or: [{ email: email }] })
        .then((data) => { return data; })
        .catch((error) => res.json({ message: error }));

    if (user) {
        const match = await user[0].matchPassword(password);
        if (match) {
            res.cookie("jwt", user[0]._id.valueOf(), { maxAge: 900000, httpOnly: true })
            res.json({ message: "Bienbenido!", data: user[0]._id.valueOf() })
        } else {
            res.json({ message: "Error de autenticacion" });
        }

    } else {
        res.json({ message: "Error de autenticacion" });
    }
    
};

const logout =  async (req, res) => {
    res.clearCookie("jwt");
    res.json({ message: "Su sesion ha sido cerrada" });
    
}

const rankUsers =  async (req, res) => {
  userSchema
        .find().sort({points: -1 })
        .then((data) => { res.json({data}) })
        .catch((error) => res.json({ message: error }));

}



module.exports = {
    signup,
    signin,
    logout,
    rankUsers
}