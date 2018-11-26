const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');

//CORS ERRORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
})

const questionRoutes = require('./routes/Questions');
const subjectRoutes = require('./routes/Subjects');
const userRoutes = require('./routes/Users');

//Connecting to the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cbt', { useNewUrlParser: true }); 

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/', (req, res, next) => {
    res.status(200).json({message: 'HelloWorld!'});
})

app.use('/questions', questionRoutes);
app.use('/subjects', subjectRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

module.exports = app;