const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define authentication routes
router.post('/login', authController.login);
router.post('/register', authController.register);
// router.post('/logout', authController.logout);

module.exports = router;