import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ user, setUser ] = useState(null);
  const [ notificationMessage, setNotificationMessage ] = useState(null);

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('bloglistUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token)
      showNotification(`Successfully logged in ${user.username}`, 5000)
      setUsername('');
      setPassword('');
    } catch (exception) {
      showNotification('Invalid credentials', 5000)
    }
  }
  const onLogout = () => {
    window.localStorage.removeItem('bloglistUser');
    setUser(null);
  }

  const showNotification = (text, time) => {
    setNotificationMessage(text)
    setTimeout(() => {
      setNotificationMessage(null)
    }, time);
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('bloglistUser');
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      setUser(parsedUser);
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const loginFormRef = useRef();
  const blogFormRef = useRef();

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
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      )} 
    </div>
  )
}

export default App