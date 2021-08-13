import React from 'react'

const Statistic = ({text, score}) => { return text ==='Positive percentage' ? <tr><td>{text}</td><td>{score + '%'}</td></tr> : <tr><td>{text}</td><td>{score}</td></tr>}

export default Statistic
