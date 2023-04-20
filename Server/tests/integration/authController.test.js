const request = require('supertest');
const app = require('../../app');
const dbHandler = require('../../db-handler');
const User = require('../../models/user');

// Establish a test database connection before running any tests
beforeAll(async () => {
  await dbHandler.connect();
});

// Clear all test data after every test
afterEach(async () => {
  await dbHandler.clearDatabase();
});

// Close the test database connection after all tests
afterAll(async () => {
  await dbHandler.closeDatabase();
});

describe('POST /api/auth/register', () => {
  test('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'test1234'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  test('should return 400 error for invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testexample.com',
        password: 'test1234'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toContainEqual({ msg: 'Invalid email', param: 'email' });
  });

  test('should return 400 error for password less than 6 characters', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toContainEqual({ msg: 'Password must be at least 6 characters', param: 'password' });
  });
});

describe('POST /api/auth/login', () => {
  // First, create a test user in the database
  const testUser = new User({
    name: 'Test User',
    email: 'test@example.com',
    password: 'test1234'
  });
  beforeEach(async () => {
    await testUser.save();
  });

  test('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'test1234'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  test('should return 400 error for invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'invalidpassword'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('msg', 'Invalid credentials');
  });
});
