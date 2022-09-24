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
    const { Episode } = req.body;

     triviaSchema
         .find({ $or: [{ episode: Episode }] })
        .then((data) => { res.json({data:data}) })
        .catch((error) => res.json({ message: error }));
    
    // let a = await triviaSchema.aggregate([
    //     {
    //         $match:{
    //             episode: Episode
    //         },
    //         $lookup: {
    //             from: 'answer',
    //             localField: '_id',
    //             foreignField: 'postedBy',
    //             as: 'answers'

    //         }
    //     }
    // ])
    // console.l
        // .then((data) => { res.json({ data: data }) })
        // .catch((error) => res.json({ message: error }));
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const savePointsUser = async (req, res) => {
    const { id } = req.params;
    const { points } = req.body;

    let user  = await userSchema
        .findById(id)
        .then((data) => { return data})
        .catch((error) => res.json({ message: error }));
    
    const totalpoints = user.points + points;
    console.log(totalpoints)

    await userSchema
        .updateOne({_id:id}, { $set: {points:totalpoints} })
        .then((data) =>  data)
        .catch((error) => res.json({ message: error }));
    res.json({message: "Puntos guardados", data:true})
};



module.exports = {
    newQuestion,
    onGame,
    getAnswers,
    savePointsUser
}