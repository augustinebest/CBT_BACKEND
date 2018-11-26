const express = require('express');
const router = express.Router();
const QuestionController = require('../Controllers/QuestionsControllers');

router.post('/', QuestionController.addQuestions);
router.get('/quest', QuestionController.getQuestions);
router.post('/submit', QuestionController.submit);
router.delete('/delete/:id', QuestionController.deleteQuestion);
router.patch('/edit/:id', QuestionController.editQuestion);
router.get('/single/:id', QuestionController.getQuestionById);

module.exports = router;