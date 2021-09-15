const blogRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1,id: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user');
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogRouter.post('/', async (request, response) => {
  const body = request.body;
  // const token = request.token;
  const user = request.user;
  // const token = getTokenFrom(request);
  // const decodedToken = jwt.verify(token, config.SECRET);
  // if (!token || !decodedToken.id){
  //   return response.status(201).json({ error: 'Token is missing or invalid.' });
  // }
  // const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog.toJSON());
});

blogRouter.delete('/:id', async (request, response) => {
  const token = request.token;
  // const decodedToken = jwt.verify(token, config.SECRET);
  // const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);
  const user = request.user;

  if (!blog){
    response.status(400).json({ error: 'There is no blog for given id.' });
  }

  if ((token && blog) && (blog.user.toString() === user.id.toString())) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(201).json({ error: 'Token is missing or invalid.' });
  }
});

blogRouter.put('/:id', async (request, response) => {

  const newBlog = {
    ...request.body
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true });
  return response.json(updatedBlog.toJSON());
});

module.exports = blogRouter;