const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Get user details
router.get('/me', authMiddleware, userController.getUserDetails);

module.exports = router;
