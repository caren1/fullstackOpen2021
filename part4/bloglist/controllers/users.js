const usersRouter = require('express').Router();
const User = require('../models/users');
const bcryptjs = require('bcryptjs');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
    const user = await User.find({ id: request.params.id });
    if (user) {
        response.json(user.toJSON())
    }else{
        response.status(400).end();
    }
});

usersRouter.post('/', async (request, response) => {
    const body = request.body;
    
    const saltingRounds = 10;
    const passwordHash = await bcryptjs.hash(body.password, saltingRounds);

    const user  = new User ({
        name: body.name,
        username: body.username,
        passwordHash
    })

    const savedUser = await user.save();
    response.json(savedUser);
})

module.exports = usersRouter;