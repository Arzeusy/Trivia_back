const mongoose = require("mongoose");

const answerTriviaSchema = mongoose.Schema({
    answer: {
        type: String,
        require: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trivia'
    },
    dateCreated: Date,
    isCorrect: {
        type: Boolean,
        require: true
    }
});



module.exports = mongoose.model('answer', answerTriviaSchema);