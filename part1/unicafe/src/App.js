import React, { useState } from 'react'
import Button from './components/Button'
import Result from './components/Result'

const App = () => {
  // save clicks of each button to its own state
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
      <h2>feedback statistics :</h2>
      <Result text="good" score={good}/>
      <Result text="neutral" score={neutral}/>
      <Result text="bad" score={bad}/>
    </div>
  )
}

export default App