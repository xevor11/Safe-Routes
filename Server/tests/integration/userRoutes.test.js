const request = require('supertest');
const app = require('../../app');

describe('User routes', () => {
  it('should respond with status 200 and an array of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should respond with status 200 and a user object', async () => {
    const response = await request(app).get('/api/users/1');
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
  });

  it('should respond with status 400 and an error message', async () => {
    const response = await request(app).get('/api/users/abc');
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
