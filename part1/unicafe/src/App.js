import React, { useState } from 'react'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>Please give feedback</h1>
      <Button text="good" clickHandler={() => setGood(good + 1)}/>
      <Button text="neutral" clickHandler={() => setNeutral(neutral + 1)}/>
      <Button text="bad" clickHandler={() => setBad(bad + 1)}/>
      <hr />
      <h2>Feedback statistics:</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App