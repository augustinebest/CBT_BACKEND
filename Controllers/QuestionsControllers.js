const Questions = require('../Models/Questions');

exports.addQuestions = (req, res, next) => {
    const questions = {
        instruction: req.body.instruction,
        heading: req.body.heading,
        answers: req.body.answers,
        correct: req.body.correct
    }

    try {
        if(req.body.heading == null || req.body.answers == null || req.body.correct == null || req.body.heading == '' || req.body.answers == null || req.body.answers == '' ) {
            return res.status(403).json({message: 'This field(s) is required!'})
        }
        Questions.create(questions, (err, result) => {
            if(err) return res.status(303).json({err: err})
            res.status(200).json({message: 'This question have been added successfully!'});
        })
    } catch (error) {
        res.status(408).json({message: error});
    }
}

exports.getQuestions = (req, res, next) => {
    try {
        Questions.find({}, '-__v -correct', (err, questions) => {
            if(err) return res.status(303).json({err: err})
            if(questions.length < 1) {
                return res.status(206).json({message: 'Sorry! There is no question at the moment!'});
            }
            const output = questions;
            var i = output.length, j, temp;
            while(--i > 0) {
                j = Math.floor(Math.random() * (i+1));
                temp = output[j];
                output[j] = output[i];
                output[i] = temp;
            }
            res.status(200).json({message: output});
        })
    } catch(error) {
        res.status(407).json({message: error});
    }
}

exports.deleteQuestion = (req, res, next) => {
    const question_id = req.params.id
    try {
        Questions.findById(question_id, (err, result) => {
            if(err) return res.status(405).json({message: 'This does not exist!'});
            if(!result) {
                return res.status(404).json({message: 'This question cannot be found!'});
            }
            Questions.remove({_id: question_id}, (err, question) => {
                res.status(200).json({message: 'This have been deleted!'})
            })
        })
    } catch(error) {
        res.status(407).json({message: error});
    }
}

exports.editQuestion = (req, res, next) => {
    const question_id = req.params.id;
    const data = {
        heading: req.body.heading,
        answers: req.body.answers,
        correct: req.body.correct
    }
    try {
        if(req.body.heading == null || req.body.answers == null || req.body.correct == null || req.body.heading == '' || req.body.answers == '' || req.body.answers == '') {
            return res.status(403).json({message: 'This field(s) is required!'})
        } else {
            Questions.findById(question_id, (err, result) => {
                if(err) return res.status(405).json({message: 'This does not exist!'});
                if(!result) {
                    return res.status(404).json({message: 'This question cannot be found!'});
                }
                Questions.findByIdAndUpdate(question_id, data, (err, result) => {
                    if(err) return res.status(406).json({message: 'This cannot be updated!'});
                    if(result) {
                        res.status(200).json({message: 'This question have been updated!'})
                    }
                })
            })
        }
    } catch(error) {
        res.status(407).json({message: error});
    }
}

exports.getQuestionById = (req, res, next) => {
    const question_id = req.params.id
    try {
        Questions.findById(question_id, (err, result) => {
            if(err) return res.status(405).json({message: 'This does not exist!'});
            if(!result) {
                return res.status(404).json({message: 'This question cannot be found!'});
            }
            res.status(200).json({message: result})
        })
    } catch(error) {
        res.status(407).json({message: error});
    }
}

exports.submit = (req, res, next) => {
    var correctAnswers = [];
    var failedAnswers = [];
    const usersAnswers = req.body.usersAnswers;
    try {
        if(usersAnswers == '' || usersAnswers == null) {
            res.json({message: 'You did not attempt the exam', code: 11})
        } else {
            Questions.find({}).exec((err, questions) => {
                if(err) return res.json({message: 'Error occurred in finding this questions'})
                if(!questions) {
                    return res.json({message: 'There is no question at themoment'})
                }
                // res.json(questions)
                // console.log(usersAnswers);
                // console.log(questions); 
                for(var i=0; i<usersAnswers.length; i++) {
                    for(var j=0; j<questions.length; j++) {
                        if(usersAnswers[i].questionId == questions[j]._id.toString()) {
                            // console.log(usersAnswers[i])
                            // console.log(questions[j]);
                            if(usersAnswers[i].answers == questions[j].correct) {
                                correctAnswers.push(usersAnswers[i].questionId);
                                // console.log('You have chosen the correcct answer', usersAnswers[i])
                            } else {
                                failedAnswers.push(usersAnswers[i].questionId);
                                // console.log('Wrong answer', usersAnswers[i])
                            }
                        }
                    }
                }
                console.log(correctAnswers);
                // console.log(failedAnswers);
                    Questions.find({_id: correctAnswers}).exec((err, quest) => {
                        if(err) res.json({message: err});
                        console.log(quest);
                        Questions.find({_id: failedAnswers}).exec((er, wrong) => {
                            if(er) res.json({message: er});
                            res.json({allQuest: questions, yourCorrect: quest, yourWrong: wrong, code: 10})
                        })
                    })
            })
        }
    } catch(error) {
        res.status(407).json({message: error});
    }
}