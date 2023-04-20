const { body, validationResult } = require('express-validator');

function validate(req, res, next) {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // No validation errors, proceed to next middleware or route handler
  next();
}

function userValidationRules() {
  return [
    body('name').isLength({ min: 1, max: 255 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 6, max: 255 })
      .withMessage('Password must be at least 6 characters long'),
  ];
}

module.exports = { validate, userValidationRules };
