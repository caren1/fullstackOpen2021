const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 5 },
  author: { type: String, required: true, minLength: 5 },
  url: { type: String, required: true },
  likes: Number
});

module.exports = mongoose.model('Blog', blogSchema);