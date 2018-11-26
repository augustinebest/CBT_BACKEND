const User = require('../Models/Users');
const bcrypt = require('bcryptjs');

exports.addUser = (req, res, next) => {

    try {
        if (req.body.name == null || req.body.name == '' || req.body.email == null || req.body.email == '' || req.body.number == null || req.body.number == '' || req.body.password == null || req.body.password == '' || req.body.cpassword == null || req.body.cpassword == '') {
            return res.json({ message: 'This field(s) is required.', code: 10 })
        } else {
            User.findOne({ email: req.body.email }).exec((err, result) => {
                if (err) {
                    return res.json({ message: 'Error occured in finding this user.', code: 11 });
                } else {
                    if (result) {
                        return res.json({ message: 'This user already exist.', code: 12 });
                    } else {
                        if (req.body.password.length < 6) {
                            return res.json({ message: 'The password must consist of at least 6 characters.', code: 13 });
                        } else {
                            if (req.body.number.length < 4) {
                                return res.json({ message: 'Phone Number should contain at least 4 characters.', code: 14 });
                            } else {
                                if (req.body.password != req.body.cpassword) {
                                    return res.json({ message: 'Password do not match.', code: 15 });
                                } else {
                                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                                        if (err) res.json(err);
                                        else {
                                            const user = {
                                                name: req.body.name,
                                                email: req.body.email,
                                                number: req.body.number,
                                                password: hash
                                            };
                                            User.create(user, (err, result) => {
                                                if (err) return res.status(303).json({ err: err })
                                                res.json({ message: 'This user have been added successfully!', code: 16 });
                                            })
                                            // console.log(user)
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            })
        }
    } catch (error) {
        res.json({ message: error });
    }
}

exports.login = (req, res, next) => {
    try {
        if(req.body.email == '' || req.body.password == '') {
            res.json({message: 'Fill the required fields', code: 10});
        } else {
            User.findOne({email: req.body.email}).exec((err, user) => {
                console.log(user)
                if(err) return res.json({message: 'Error ocurrred in finding this user', code: 11})
                if(!user) {
                    return res.json({message: 'This user account does not exist', code: 12})
                } else {
                    const checkPassword = bcrypt.compareSync(req.body.password, user.password);
                    if(!checkPassword) {
                        res.json({message: 'email or password invalid!', code: 13});
                    } else {
                        res.json({message: 'You have logged in succesfully', code: 14, token: {id: user._id, name: user.name, email: user.email, number: user.number}})
                    }
                }
            })
        }
    } catch(error) {
        res.json({ message: error });
    }
}

exports.userProfile = (req, res, next) => {
    const id = {_id: req.params.id};

    try {
        User.findOne(id).exec((err, user) => {
            if(err) return res.json({message: 'error in finding this user', code: 10});
            if(!user) {
                return res.json({message: 'This user does not exist', code: 11})
            } else{
                res.json({message: user, code: 12});
            }
        })
    } catch(error) {
        res.json({ message: error });
    }
}