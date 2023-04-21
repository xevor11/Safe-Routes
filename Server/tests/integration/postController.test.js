const request = require('supertest');
const app = require('../app');
const dbHandler = require('../db-handler');
const Post = require('../models/post');

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

describe('POST /posts', () => {
  test('should create a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Test Post',
        content: 'This is a test post'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Post');
    expect(res.body.content).toBe('This is a test post');
  });

  test('should return 400 error for missing required fields', async () => {
    const res = await request(app)
      .post('/posts')
      .send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toContainEqual({ msg: 'Title is required', param: 'title' });
    expect(res.body.errors).toContainEqual({ msg: 'Content is required', param: 'content' });
  });
});

describe('GET /posts', () => {
  test('should get all posts', async () => {
    // Create two posts to test with
    const post1 = new Post({ title: 'Post 1', content: 'This is post 1' });
    const post2 = new Post({ title: 'Post 2', content: 'This is post 2' });
    await post1.save();
    await post2.save();

    const res = await request(app).get('/posts');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
    expect(res.body[0].title).toEqual('Post 1');
    expect(res.body[1].title).toEqual('Post 2');
  });
});

describe('GET /posts/:id', () => {
  test('should get a post by id', async () => {
    // Create a post to test with
    const post = new Post({ title: 'Test Post', content: 'This is a test post' });
    await post.save();

    const res = await request(app).get(`/posts/${post._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Test Post');
    expect(res.body.content).toEqual('This is a test post');
  });

  test('should return 404 error for non-existent post id', async () => {
    const res = await request(app).get('/posts/12345');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('msg', 'Post not found');
  });
});

describe('PUT /posts/:id', () => {
    test('should update a post by id', async () => {
        // Create a post to test with
        const post = new Post({
            title: 'Test Post',
            content: 'This is a test post'
        });
        await post.save();

        const res = await request(app)
            .put(`/posts/${post._id}`)
            .send({
                title: 'Updated Test Post',
                content: 'This is the updated test post'
            });
        expect(res.statusCode).toEqual
        const updatedPost = await Post.findById(post._id);
        expect(updatedPost.title).toEqual('Updated Test Post'); // Expect updated title
        expect(updatedPost.content).toEqual('This is the updated test post'); // Expect updated content
    });

    test('should return a 400 if invalid id is provided', async () => {
        const res = await request(app)
            .put('/posts/invalidId')
            .send({
                title: 'Updated Test Post',
                content: 'This is the updated test post'
            });
        expect(res.statusCode).toEqual(400); // Expect bad request status code
    });
});

describe('DELETE /posts/:id', () => {
    test('should delete a post by id', async () => {
      // Create a post to test with
      const post = new Post({ title: 'Test Post', content: 'This is a test post' });
      await post.save();
  
      const res = await request(app).delete(`/posts/${post._id}`);
      expect(res.statusCode).toEqual(200);
  
      const deletedPost = await Post.findById(post._id);
      expect(deletedPost).toBeNull();
    });
  
    test('should return a 404 if post is not found', async () => {
      const res = await request(app).delete(`/posts/${mongoose.Types.ObjectId()}`);
      expect(res.statusCode).toEqual(404);
    });
  
    test('should return a 400 if invalid id is provided', async () => {
      const res = await request(app).delete('/posts/invalidId');
      expect(res.statusCode).toEqual(400);
    });
  });
  
  describe('GET /posts/search', () => {
    test('should return posts matching search query', async () => {
      // Create two posts to test with
      const post1 = new Post({ title: 'Post 1', content: 'This is post 1' });
      const post2 = new Post({ title: 'Post 2', content: 'This is post 2' });
      await post1.save();
      await post2.save();
  
      const res = await request(app).get('/posts/search?q=post');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
      expect(res.body[0].title).toContain('Post');
      expect(res.body[1].title).toContain('Post');
    });
  });
  


