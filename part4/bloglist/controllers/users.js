const usersRouter = require('express').Router();
const User = require('../models/users');
const bcryptjs = require('bcryptjs');
const middleware = require('../utils/middleware');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

usersRouter.get('/loggedUserInfo', middleware.userExtractor, async (request, response) => {
  const user = request.user;
  response.json(user);
});

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs');
  if (user) {
    response.json(user.toJSON());
  }else{
    response.status(400).end();
  }
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.username || !body.password){
    response.status(400).json({ error: 'Couldnt create a user with given credentials - check if username or password is not missing' });
  } else if (body.password.length < 3){
    response.status(400).json({ error: 'Password has to be at least 3 characters length.' });
  }

  const saltingRounds = 10;
  const passwordHash = await bcryptjs.hash(body.password, saltingRounds);

  const user  = new User ({
    name: body.name,
    username: body.username,
    passwordHash
  });

  const savedUser = await user.save();
  response.json(savedUser);
});



module.exports = usersRouter;