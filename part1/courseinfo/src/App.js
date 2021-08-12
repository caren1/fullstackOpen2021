import React from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const App = () => {
  const course = 'Half Stack application development'

  const courseParts = [
    {
      title: 'Fundamentals of React',
      exercises: 10
    },
    {
      title: 'Using props to pass data',
      exercises: 7
    },
    {
      title: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header title={course}/>
      <Content parts={courseParts}/>
      <Total parts={courseParts}/>
    </div>
  )
}

export default App