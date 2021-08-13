import React from 'react'

const Statistic = ({ text, score }) => <div> {text === 'Positive percentage' ? `${text} - ${score}%` : `${text} : ${score}`} </div>

export default Statistic
