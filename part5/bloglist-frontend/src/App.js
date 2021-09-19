import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ user, setUser ] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState(null);

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
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Invalid credentials.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }
  const onLogout = () => {
    window.localStorage.removeItem('bloglistUser');
    setUser(null);
    
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

  return (
    <div>
      { errorMessage !== null && errorMessage }
      {user === null ? (
        <>
        <h1>Please log in to the application.</h1>
          <LoginForm 
          username={username}
          password={password}
          usernameHandler={onUsernameChange}
          passwordHandler={onPasswordChange}
          loginHandler={onLogin}
          />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <p>{user.username} is logged in <button onClick={onLogout}>logout</button></p>
          <BlogForm blogs={blogs} setBlogs={setBlogs} setError={setErrorMessage} />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      )} 
    </div>
  )
}

export default App