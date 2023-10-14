const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User Signup
router.post('/signup', userController.signup);

// User Login
router.post('/login', userController.login);

module.exports = router;
