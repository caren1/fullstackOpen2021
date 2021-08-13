import React from 'react'

const Button = ({ text, clickHandler }) => <button onClick={clickHandler} style={{ padding: '0.5em 1em', margin: '5px'}}>{text}</button>

export default Button
