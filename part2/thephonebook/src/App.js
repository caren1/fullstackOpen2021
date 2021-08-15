import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')

  const onNewPersonAdd =(event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

    if (!existingPerson) {
      const newPersons = [...persons, { id: persons.length + 1,name: newName, number: phoneNumber }]
      setPersons(newPersons);
    } else {
      alert(`${newName} is already added to phonebook.. 😏`)
    }
    setNewName('');
    setPhoneNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onNewPersonAdd}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <div>
          phone: <input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} minLength={3}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>{person.name} - {person.number}</p>
      ))}
    </div>
  )
}

export default App