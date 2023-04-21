const request = require('supertest');
const app = require('../src/server');

describe('Server', () => {
  it('should respond with 200 status code and "Hello World!" message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Hello World!');
  });
});
