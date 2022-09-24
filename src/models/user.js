const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    nickname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    }
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    // lastLogin: {
    //     type: Date,
    //     default: Date.now
    // }
});

userSchema.methods.encriptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('user', userSchema);