const userSchema = require('../models/user');
const triviaSchema = require('../models/trivia');
const answerSchema = require('../models/answer');

const newQuestion = async (req, res) => {
    const { episode, question, points, answers, id } = req.body.data;
    
    const user = await userSchema
        .findById(id)
        .then((data) => {
             return data
         })
        .catch((error) => res.json({ message: error }));
    createdBy = user._id;

    const questionP = triviaSchema({
        question,
        createdBy,
        episode,
        points
    })

    const Q = questionP.save().then((data) => data).catch((error) => res.json({ message: error }));

    answers.forEach(element => {
       const ans = answerSchema({
            answer: element.answer,
            postedBy: Q._id,
            isCorrect: element.isCorrect
        }) 
        
        ans.save().then((data) => data).catch((error) => res.json({ message: error }));
    });
    
    
};





module.exports = {
    newQuestion,
}