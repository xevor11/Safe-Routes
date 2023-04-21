const request = require('supertest');
const app = require('../app');

describe('User Controller', () => {
  describe('GET /users/:id', () => {
    it('responds with user details', async () => {
      const response = await request(app).get('/users/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
      });
    });

    it('responds with 404 for non-existing user', async () => {
      const response = await request(app).get('/users/999');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('POST /users', () => {
    it('creates a new user', async () => {
      const newUser = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
      };
      const response = await request(app)
        .post('/users')
        .send(newUser);
      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      });
    });

    it('responds with 400 for invalid user data', async () => {
      const invalidUser = {
        name: '',
        email: 'not-an-email',
        password: 'short',
      };
      const response = await request(app)
        .post('/users')
        .send(invalidUser);
      expect(response.statusCode).toBe(400);
    });
  });

  describe('PUT /users/:id', () => {
    it('updates an existing user', async () => {
      const updatedUser = {
        name: 'New Name',
        email: 'new.email@example.com',
        password: 'newpassword',
      };
      const response = await request(app)
        .put('/users/1')
        .send(updatedUser);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(updatedUser);
    });

    it('responds with 404 for non-existing user', async () => {
      const updatedUser = {
        name: 'New Name',
        email: 'new.email@example.com',
        password: 'newpassword',
      };
      const response = await request(app)
        .put('/users/999')
        .send(updatedUser);
      expect(response.statusCode).toBe(404);
    });

    it('responds with 400 for invalid user data', async () => {
      const invalidUser = {
        name: '',
        email: 'not-an-email',
        password: 'short',
      };
      const response = await request(app)
        .put('/users/1')
        .send(invalidUser);
      expect(response.statusCode).toBe(400);
    });
  });

  describe('DELETE /users/:id', () => {
    it('deletes an existing user', async () => {
      const response = await request(app).delete('/users/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        message: 'User deleted successfully',
      });
    });

    it('responds with 404 for non-existing user', async () => {
      const response = await request(app).delete('/users/999');
      expect(response.statusCode).toBe(404);
    });
  });
});
