const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Map POST /api/auth/register to the controller
router.post('/register', authController.registerUser);

module.exports = router;