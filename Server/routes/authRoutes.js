const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validationMiddleware = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/register', [
  body('name').not().isEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], validationMiddleware, authController.register);

router.post('/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], validationMiddleware, authController.login);

module.exports = router;
