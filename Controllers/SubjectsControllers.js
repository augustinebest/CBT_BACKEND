const Subject = require('../Models/Subjects');

exports.addSubjects = (req, res, next) => {
    const subject = {
        name: req.body.name
    }
    try {
        if(req.body.name == null || req.body.name == '') {
            return res.status(403).json({message: 'This field(s) is required!'})
        } else {
            Subject.create(subject, (err, result) => {
                if(err) {
                    res.status(509).json({err: err})
                } else {
                    res.status(200).json({message: 'This subject have been created successfully!'});
                }
            })
        }
    } catch(error) {
        res.status(408).json({message: error});
    }
}

exports.geSubjects = (req, res, next) => {
    try {
        Subject.find({}, '-__v', (err, subject) => {
            if(err) return res.status(303).json({err: err})
            if(subject.length < 1) {
                return res.status(206).json({message: 'Sorry! There is no subject at the moment!'});
            }
            res.status(200).json({message: subject});
        })
    } catch(error) {
        res.status(407).json({message: error});
    }
}