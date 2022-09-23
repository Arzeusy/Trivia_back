const userSchema = require('../models/user');
const triviaSchema = require('../models/trivia');
const answerSchema = require('../models/answer');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
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

    const Q = await questionP.save().then((data) => data).catch((error) => res.json({ message: error }));
    answers.forEach( async (element) => {
       const ans = answerSchema({
            answer: element.answer,
            postedBy: Q._id,
            isCorrect: element.isCorrect
        }) 
        
       await ans.save().then((data) => data).catch((error) => res.json({ message: error }));
    });
    
    res.json({ message: 'ok' });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const onGame = async (req, res) => {
    const { episode } = req.params;

     triviaSchema
        .find({ $or: [{ episode: episode }] })
        .then((data) => { res.json({data:data}) })
        .catch((error) => res.json({ message: error }));

};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAnswers = async (req, res) => {
    const { id } = req.params;

    const quest = await triviaSchema
        .findById(id)
        .then((data) => {
             return data
         })
        .catch((error) => res.json({ message: error }));
    
    let postedBy = quest._id;

     answerSchema
        .find({ $or: [{ postedBy: postedBy }] })
        .then((data) => { res.json({data:data}) })
        .catch((error) => res.json({ message: error }));

};



module.exports = {
    newQuestion,
    onGame,
    getAnswers
}