import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ blogs, setBlogs, setNotification }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ likes, setLikes ] = useState('')

  const onBlogAddition = async (e) => {
    e.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url, likes })
      setBlogs([...blogs, newBlog])
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes('')
      setNotification(`Successfully added a blog ${title}, created by ${author}`)
    } catch (exception) {
      setNotification('Couldnt add a blog', 5000)
    }
  }

  return (
    <>
      <form onSubmit={onBlogAddition}>
        <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} name="Title" placeholder="Title" style={{ display: 'block', margin: '5px' }}/>
        <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} name="Author" placeholder="Author" style={{ display: 'block', margin: '5px' }}/>
        <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} name="Url" placeholder="Url" style={{ display: 'block', margin: '5px' }}/>
        <input type="text" value={likes} onChange={({ target }) => setLikes(target.value)} name="Likes" placeholder="Likes" style={{ display: 'block', margin: '5px' }}/>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm

BlogForm.PropTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}