const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');


// POST /api/auth/register
router.post('/register', AuthController.register);
// POST /api/auth/login
router.post('/login', AuthController.login);

module.exports = router;
