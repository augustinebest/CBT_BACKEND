const express = require('express');
const router = express.Router();
const UsersController = require('../Controllers/UsersControllers');

router.post('/signup', UsersController.addUser);
router.post('/login', UsersController.login);
router.get('/profile/:id', UsersController.userProfile);

module.exports = router;