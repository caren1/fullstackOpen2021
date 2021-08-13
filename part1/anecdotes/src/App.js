import React, { useState, useEffect } from 'react'
import './App.css'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ]

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  // const [mostVoted, setMostVoted] = useState();

  const selectNote = (anecdotes) => {
     setSelected(Math.floor(Math.random() * (anecdotes.length - 0 )) + 0);
  }

  const voteForAnecdote = (selected) => {
    const newPoints = [...points];
    newPoints[selected]++
    setPoints(newPoints);
  }

  let highestValue = Math.max.apply(0, points); 
  let highestValueIndex = points.indexOf(highestValue);
  
  return (
    <div style={{ textAlign: 'center', padding: '2em'}}>
      <div>
        <h1>Anecdote of the day 😆</h1>
        <h2 style={{fontSize: '22px'}}>"{anecdotes[selected]}"</h2><span>currently with - {points[selected]} votes</span>
        <br />
        <button style={{padding: '1.1em 1em', fontSize:'18px', margin: '1em'}} onClick={() => selectNote(anecdotes)}>next anecdote</button>
        <button style={{padding: '1.1em 1em', fontSize:'18px', margin: '1em'}} onClick={() => voteForAnecdote(selected)}>like 👍</button>
      </div>
      <hr />
      {highestValue !== 0 ?(
        <>
      <h3>Anecdote with the most votes 👍👍👍</h3>
      <h2 style={{fontSize: '22px'}}>"{anecdotes[highestValueIndex]}"</h2><span>currently with - {points[highestValueIndex]} votes</span>
      </>
      ) : (
        <>
        <h2 style={{fontSize: '22px', padding: '1em'}}>Seems like no one has voted yet.. 🤔</h2>
        </>
      )}
      </div>
  )
}

export default App