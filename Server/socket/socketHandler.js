const socketio = require('socket.io');

// Initialize Socket.io
const initSocket = (server) => {
  const io = socketio(server);

  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);

    // Handle socket events
    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
};

module.exports = {
  initSocket,
};
