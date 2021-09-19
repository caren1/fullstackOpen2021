import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();
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
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Invalid credentials.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
          <p>{user.username} is logged in</p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      )} 
    </div>
  )
}

export default App