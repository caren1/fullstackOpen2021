import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

import axios from 'axios';
import personService from './service/persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    personService
    .getAllPersons()
    .then((returnedPersons) => {
      setPersons(returnedPersons);
    })
  }, [])

  const onNewPersonAdd =(event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

    if (!existingPerson) {
      const newPerson = { id: persons.length + 1, name: newName, number: phoneNumber }
      personService
      .savePerson(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
      })
    } else {
      alert(`${newName} is already added to phonebook.. 😏`)
    }
    setNewName('');
    setPhoneNumber('');
  }

  const onFilterChange = (event) => setFilter(event.target.value);
  const onNameChange = (event) => setNewName(event.target.value);
  const onPhoneChange = (event) => setPhoneNumber(event.target.value);
  const personsToShow = filter ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChangeHandler={onFilterChange}/>
      <hr />
      <h3>Add a new person to phonebook: </h3>
      <PersonForm 
        personAddHandler={onNewPersonAdd} 
        newName={newName} 
        phoneNumber={phoneNumber} 
        nameChangeHandler={onNameChange} 
        phoneChangeHandler={onPhoneChange}/>
      <hr />
      <h2>Numbers</h2>
      <PersonList persons={personsToShow}/>
    </div>
  )
}

export default App