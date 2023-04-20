const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// import User model and any other necessary models

const authHandler = {};

authHandler.login = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create and sign a JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send token in response
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

authHandler.me = async (req, res) => {
  try {
    // Find user by ID from JWT payload
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user details in response
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Export the authHandler object
module.exports = authHandler;
