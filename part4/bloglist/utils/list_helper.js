
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0);
};

const mostLiked = (blogs) => {
  const maxLiked = Math.max(...blogs.map(blog => blog.likes));
  if (maxLiked > 0) {
    let likes = blogs.map((blog) => blog.likes);
    return blogs[likes.indexOf(maxLiked)];
  } else {
    return {};
  }
};

const mostBlogs = (blogs) => {
  const maxNumber = Math.max(...blogs.map(blog => blog.blogs));
  if(maxNumber > 0) {
    let blogsQuantity = blogs.map(blog => blog.blogs);
    return blogs[blogsQuantity.indexOf(maxNumber)];
  }else{
    return {};
  }
};



module.exports = {
  dummy,
  totalLikes,
  mostLiked
};
