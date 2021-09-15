const listhelper = require('../utils/list_helper');
const bloghelper = require('./blog_helper');
const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/blogs');
const mongoose = require('mongoose');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of bloghelper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ];

  test('when there is only one blog, total likes === likes of that blog', () => {
    const result = listhelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe('favorite blog', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ];

  test('the fans favorite', () => {
    const result = listhelper.mostLiked(blogs);
    expect(result).toEqual(blogs[2]);
  });
});

describe('API TESTING', () => {

  test('HTTP GET, returns appropriate number of entries', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(2);
  });
  test('HTTP POST, returned object has the property id instead of _id', async () => {
    const response = await api.get('/api/blogs');
    const ids = response.body.map(blog => blog.id);
    expect(ids).toBeDefined();
  });
  test('HTTP POST, adds a new blog', async () => {
    const newBlog = {
      title: 'Testing is fun',
      author: 'wojteya',
      url: 'www.test.com',
      likes: 11
    };
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IldvamNpZWNoQyIsImlkIjoiNjE0MWU2OWYwZjgxZTg4NTRmOTkxYTgzIiwiaWF0IjoxNjMxNzE2NDk2fQ.6_8R9WQmynwkSmAlaekwOaO_69qi8MvpwZma5n8LuvE')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(bloghelper.initialBlogs.length + 1);
    const titles = response.body.map(b => b.title);
    expect(titles).toContain('Testing is fun');
  });

  test('HTTP POST, has the request likes property', async () => {
    const newBlog = {
      title: 'This blog will not have likes',
      author: 'Lacking Like',
      url: 'www.nolikes.com'
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IldvamNpZWNoQyIsImlkIjoiNjE0MWU2OWYwZjgxZTg4NTRmOTkxYTgzIiwiaWF0IjoxNjMxNzA5NTEzfQ.vgMTQKZvMHApQnlmGCS9OZAL0aDiE9m5_z0c-tNliUI')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBeFalsy();
  });

  test('HTTP POST, blog has title and url missing', async () => {
    const newBlog = {
      author: 'Missing TitleAndUrl',
      likes: 30
    };

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IldvamNpZWNoQyIsImlkIjoiNjE0MWU2OWYwZjgxZTg4NTRmOTkxYTgzIiwiaWF0IjoxNjMxNzA5NTEzfQ.vgMTQKZvMHApQnlmGCS9OZAL0aDiE9m5_z0c-tNliUI')
      .expect(400)
      .send(newBlog)
      .expect('Content-Type', /application\/json/);
  });
});

describe('DELETE OPERATIONS', () => {

  test('blog with proper id, might be retrieved', async () => {
    const blogsAtStart = await bloghelper.blogsInDb();
    // console.log(blogsAtStart);
    const blogToBeRetrieved = blogsAtStart[0];

    const response = await api
      .get(`/api/blogs/${blogToBeRetrieved.id}`)
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IldvamNpZWNoQyIsImlkIjoiNjE0MWU2OWYwZjgxZTg4NTRmOTkxYTgzIiwiaWF0IjoxNjMxNzA5NTEzfQ.vgMTQKZvMHApQnlmGCS9OZAL0aDiE9m5_z0c-tNliUI')
      .expect(200);

    expect(response.body.title).toContain('Hello its your blog here');
    expect(response.body).toEqual(blogToBeRetrieved);
  });

  test('blog with proper id, might be deleted - status 204', async () => {
    const blogsAtStart = await bloghelper.blogsInDb();
    const blogToBeDeleted = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IldvamNpZWNoQyIsImlkIjoiNjE0MWU2OWYwZjgxZTg4NTRmOTkxYTgzIiwiaWF0IjoxNjMxNzA5NTEzfQ.vgMTQKZvMHApQnlmGCS9OZAL0aDiE9m5_z0c-tNliUI')
      .expect(204);

    const blogsAtEnd = await bloghelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(bloghelper.initialBlogs.length - 1);

    const blogTitles = blogsAtEnd.map((blog) => blog.title);
    expect(blogTitles).not.toContain(blogToBeDeleted.title);
  });

  test('blog with invalid id, returns 400', async () => {
    const id = '5a3d5da59070081a82a3445';
    await api
      .get(`/api/blogs/${id}`)
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IldvamNpZWNoQyIsImlkIjoiNjE0MWU2OWYwZjgxZTg4NTRmOTkxYTgzIiwiaWF0IjoxNjMxNzA5NTEzfQ.vgMTQKZvMHApQnlmGCS9OZAL0aDiE9m5_z0c-tNliUI')
      .expect(400);
  });

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await bloghelper.nonExistingId();
    // console.log(validNonexistingId);

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IldvamNpZWNoQyIsImlkIjoiNjE0MWU2OWYwZjgxZTg4NTRmOTkxYTgzIiwiaWF0IjoxNjMxNzA5NTEzfQ.vgMTQKZvMHApQnlmGCS9OZAL0aDiE9m5_z0c-tNliUI')
      .expect(404);
  });
});

describe('HTTP PUT', () => {
  test('http put updates the specific blog', async () => {
    const blogsAtStart = await bloghelper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const newBlog = {
      ...blogToUpdate,
      title: 'It actually works',
      likes: 800
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IldvamNpZWNoQyIsImlkIjoiNjE0MWU2OWYwZjgxZTg4NTRmOTkxYTgzIiwiaWF0IjoxNjMxNzA5NTEzfQ.vgMTQKZvMHApQnlmGCS9OZAL0aDiE9m5_z0c-tNliUI')
      .send(newBlog)
      .expect(200);

    const blogsAtEnd = await bloghelper.blogsInDb();
    const titles = blogsAtEnd.map((blog) => blog.title);
    const likes = blogsAtEnd.map((blog) => blog.likes);

    expect(titles).toContain('It actually works');
    expect(likes[0]).toEqual(800);
  });
});

afterAll(() => {
  mongoose.connection.close();
});