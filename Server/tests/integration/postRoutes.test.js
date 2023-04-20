const request = require('supertest');
const app = require('../../app');

describe('Post Routes', () => {
  describe('GET /posts', () => {
    it('should respond with a 200 status code', async () => {
      const response = await request(app).get('/posts');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('POST /posts', () => {
    it('should respond with a 201 status code and return the created post', async () => {
      const post = {
        title: 'Test Post',
        content: 'This is a test post',
        latitude: 37.7749,
        longitude: -122.4194,
      };
      const response = await request(app).post('/posts').send(post);
      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(post.title);
      expect(response.body.content).toBe(post.content);
      expect(response.body.latitude).toBe(post.latitude);
      expect(response.body.longitude).toBe(post.longitude);
    });

    it('should respond with a 400 status code if the post is missing a required field', async () => {
      const post = {
        title: 'Test Post',
        content: 'This is a test post',
        // Missing latitude and longitude
      };
      const response = await request(app).post('/posts').send(post);
      expect(response.statusCode).toBe(400);
    });
  });
});
