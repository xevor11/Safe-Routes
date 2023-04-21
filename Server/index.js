const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const logger = require('./utils/logger');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./routes/middleware/authMiddleware');
const validationMiddleware = require('./routes/middleware/validationMiddleware');
const socketRoutes = require('./socket/socketRoutes');

// Initialize Express app
const app = express();

// Set up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up authentication middleware
app.use(authMiddleware);

// Set up validation middleware
app.use(validationMiddleware);

// Set up API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Set up socket routes
socketRoutes(app);

// Set up error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Connect to MongoDB database
const db = config.get('db');
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info(`Connected to MongoDB at ${db}`);
    // Start the server
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      logger.info(`Server started on port ${port}`);
    });
    // Initialize socket.io
    const io = require('./socket/socketHandler')(server);
    app.set('io', io);
  })
  .catch((err) => {
    logger.error(err.stack);
    process.exit(1);
  });

module.exports = app;
