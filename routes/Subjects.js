const express = require('express');
const router = express.Router();
const SubjectsController = require('../Controllers/SubjectsControllers');

router.post('/', SubjectsController.addSubjects);
router.get('/', SubjectsController.geSubjects);

module.exports = router;