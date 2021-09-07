const Blog = require('../models/blogs');

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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'will remove this soon', author:'Wojtey', url: 'www.id.com' });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb
};
