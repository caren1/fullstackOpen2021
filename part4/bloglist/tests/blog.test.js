const bloghelper = require('../utils/list_helper');
const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/blogs');
const mongoose = require('mongoose');

const initialBlogs = [
  {
    title: 'Hello its your blog here',
    author: 'Wojciech Czarnocki',
    url: 'www.swietone.pl',
    likes: 20
  },
  {
    title: 'Blog2',
    author: 'Agnieszka',
    url: 'www.url.com',
    likes: 50,
  }
];

const api = supertest(app);

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
    const result = bloghelper.totalLikes(listWithOneBlog);
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
    const result = bloghelper.mostLiked(blogs);
    expect(result).toEqual(blogs[2]);
  });
});

describe('API TESTING', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = initialBlogs.map((blog) => new Blog(blog));
    const promisesBlogsArray = blogObjects.map(b => b.save());
    await Promise.all(promisesBlogsArray);
  });
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
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length + 1);
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
      .send(newBlog)
      .expect(201)
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
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
})