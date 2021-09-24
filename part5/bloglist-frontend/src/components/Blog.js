import React, { useState } from 'react'

const Blog = ({blog, likeUpdateHandler }) => {

  const [ showDetails, setShowDetails ] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setShowDetails(!showDetails)}>{!showDetails ? 'view' : 'hide'}</button>
      {showDetails && (
        <ul>
          <li>{blog.url}</li>
          <li>{blog.likes} <button onClick={() => likeUpdateHandler(blog)}>like</button></li>
          <li>{blog.author}</li>
        </ul>
      )}
    </div>  
  )
}

export default Blog