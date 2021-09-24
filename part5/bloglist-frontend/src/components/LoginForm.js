import React from 'react'

const LoginForm = ({ username, password, usernameHandler, passwordHandler, loginHandler }) => {
  return (
    <div>
      <form onSubmit={loginHandler}>
        <input type="text" value={username} onChange={usernameHandler} name="Username" placeholder="Username" style={{ display: 'block', margin: '5px' }}/>
        <input type="password" value={password} onChange={passwordHandler} name="Password"placeholder="Password" style={{ display: 'block', margin: '5px' }}/>
        <button type="submit" style={{ display: 'block', margin: '5px' }}>login</button>
      </form>
    </div>
  )
}

export default LoginForm
