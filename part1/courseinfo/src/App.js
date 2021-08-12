import React from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    title: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    title: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    title: 'State of a component',
    exercises: 14
  }

  const courseParts = [part1, part2, part3]

  return (
    <div>
      <Header title={course}/>
      <Content parts={courseParts}/>
      <Total parts={courseParts}/>
    </div>
  )
}

export default App