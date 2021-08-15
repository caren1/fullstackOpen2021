import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ filter, setFilter ] = useState();

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

  const filteredPersons = filter ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          Filter shown with: <input value={filter} onChange={(event) => setFilter(event.target.value)}/>
        </div>
      <hr />
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
      {filteredPersons.map((person) => (
        <p key={person.id}>{person.name} - {person.number}</p>
      ))}
    </div>
  )
}

export default App