// Import necessary modules and dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator');

// Define and export functions that handle authentication-related logic
module.exports = {
  // Function that handles user registration
  register: async function(req, res) {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Extract user data from request body
    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      // Create new user instance
      user = new User({
        name,
        email,
        password
      });

      // Hash password and save user to database
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Generate and return authentication token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server error');
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  // Function that handles user login
  login: async function(req, res) {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Extract user credentials from request body
    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Compare password with stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Generate and return authentication token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server error');
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  // Function that handles user logout
  logout: function(req, res) {
    // Clear authentication token from response headers
    res.setHeader('Authorization', '');
    res.sendStatus(200);
  },

    // Function that checks if a user is authenticated
    isAuthenticated: async function(req, res, next) {
        // Get token from request headers
        const token = req.header('Authorization');
    
        // Check if token exists
        if (!token) {
          return res.status(401).json({ msg: 'No token, authorization denied' });
        }
    
        try {
          // Verify token and extract user ID
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const userId = decoded.user.id;
    
          // Check if user exists
          const user = await User.findById(userId);
          if (!user) {
            return res.status(401).json({ msg: 'Invalid token' });
          }
    
          // Add user to request object and call next middleware
          req.user = user;
          next();
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
        }
      }
    };
