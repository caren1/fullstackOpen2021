import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ notificationMessage, setNotificationMessage ] = useState(null)

  const onUsernameChange = (e) => setUsername(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)
  const onLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('bloglistUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      showNotification(`Successfully logged in ${user.username}`, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('Invalid credentials', 5000)
    }
  }
  const onLogout = () => {
    window.localStorage.removeItem('bloglistUser')
    setUser(null)
  }

  const showNotification = (text, time) => {
    setNotificationMessage(text)
    setTimeout(() => {
      setNotificationMessage(null)
    }, time)
  }

  useEffect(() => {
    async function fetchBlogs () {
      const response = await blogService.getAll()
      const sortedBlogs = response.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('bloglistUser')
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const loginFormRef = useRef()
  const blogFormRef = useRef()

  const onLikeUpdate = async (blogObject) => {
    const newBlog = { ...blogObject, likes: blogObject.likes + 1 }

    try {
      const blogToUpdate = await blogService.update(newBlog)
      setBlogs(blogs.map(blog => blog.id === blogToUpdate.id ? blogToUpdate : blog))
      showNotification(`liked a ${blogObject.title}`, 5000)
    } catch (exception) {
      showNotification('Couldnt update the blog', 5000)
    }
  }

  const onBlogDelete = async (blogObject) => {
    if (window.confirm(`Do you really want to delete blog ${blogObject.title}?`)){
      try {
        const blogToDelete = await blogService.remove(blogObject)
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
        showNotification(`Successfully deleted a blog ${blogObject.title}`, 5000)

      } catch (exception) {
        showNotification('Couldnt delete the blog', 5000)
      }
    }
  }

  return (
    <div>
      { notificationMessage !== null && notificationMessage }
      {user === null ? (
        <>
          <h1>Please log in to the application.</h1>
          <Togglable buttonLabel="Want to log in?" ref={loginFormRef}>
            <LoginForm
              username={username}
              password={password}
              usernameHandler={onUsernameChange}
              passwordHandler={onPasswordChange}
              loginHandler={onLogin}
            />
          </Togglable>
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <p>{ user.name ? user.name : user.username } is logged in <button onClick={onLogout}>logout</button></p>
          <Togglable buttonLabel="Want to add a new blog?" ref={blogFormRef}>
            <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotificationMessage} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeUpdateHandler={onLikeUpdate} blogDeleteHandler={onBlogDelete} />
          )}
        </>
      )}
    </div>
  )
}

export default App