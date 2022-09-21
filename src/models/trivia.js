const mongoose = require("mongoose");

const triviaSchema = mongoose.Schema({
    question: {
        type: String,
        require: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    episode: {
         type: Number,
        require: true
    },
    points: {
        type: Number,
        require: true
    },
    dateCreated: Date
});



module.exports = mongoose.model('trivia', triviaSchema);