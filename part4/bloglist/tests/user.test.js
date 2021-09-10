const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const supertest = require('supertest');
const app = require('../app');
const userHelper = require('./user_helper');

const api = supertest(app);

describe('When there is initially one user in the database',  () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('password', 10);
    const user = new User({ username: 'wojtek', passwordHash });
    user.save();
  });

  test('user can be created with fresh username', async () => {
    const usersAtStart = await userHelper.usersInDb();

    const newUser = {
      username: 'Wojti',
      name: 'Wojciech C',
      password: 'hellothere'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await userHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('user cannot be created when username already exists', async () => {
    const usersAtStart = userHelper.usersInDb();
    const newUser = {
      username: 'wojtek',
      name: 'Wojciech C',
      password: 'hellothere'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await userHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});