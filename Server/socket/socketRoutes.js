const socketHandler = require('./socketHandler');

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('a user connected');

    // Handle socket events here
    socket.on('event', (data) => {
      socketHandler.handleEvent(socket, data);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
