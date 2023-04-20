const io = require('socket.io-client');

const { expect } = require('chai');
const app = require('../app');

const port = process.env.PORT || 3000;

const socketUrl = `http://localhost:${port}`;

describe('Socket Routes', () => {
  let server;

  before((done) => {
    server = app.listen(port, done);
  });

  after(() => {
    server.close();
  });

  describe('GET /', () => {
    it('should respond with "Hello World!"', (done) => {
      const client = io.connect(socketUrl);
      client.on('connect', () => {
        client.emit('hello');
        client.on('message', (message) => {
          expect(message).to.equal('Hello World!');
          client.disconnect();
          done();
        });
      });
    });
  });
});
