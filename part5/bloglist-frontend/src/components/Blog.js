import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, likeUpdateHandler, blogDeleteHandler }) => {

  const [ showDetails, setShowDetails ] = useState(false)
  const [ loggedUserId, setLoggedUserId ] = useState('')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    async function getUserInfo() {
      const response = await blogService.getUserInfo()
      setLoggedUserId(response.id)
    }
    getUserInfo()
  }, [])

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setShowDetails(!showDetails)}>{!showDetails ? 'view' : 'hide'}</button>
      {showDetails && (
        <ul>
          <li>{blog.url}</li>
          <li>{blog.likes} <button onClick={() => likeUpdateHandler(blog)}>like</button></li>
          <li>{blog.author}</li>
          {loggedUserId === blog.user.id && (<button onClick={() => blogDeleteHandler(blog)}>delete</button>)}
        </ul>
      )}
    </div>
  )
}

export default Blog