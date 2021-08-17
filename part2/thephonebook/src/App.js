import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

import personService from './service/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');
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
      if (window.confirm(`${newName} is already added to phonebook.. 😏 Do you want to replace the old number with a new one?`)){
        const updatedPerson = {...existingPerson, number: phoneNumber }
        personService
        .updatePerson(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map((person) => person.id !== returnedPerson.id ? person : returnedPerson))
        })
      }
    }
    setNewName('');
    setPhoneNumber('');
  }

  const onPersonDelete = (id) => {
    let personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Do you really want to delete ${personToDelete.name}?`)){
      personService
      .removePerson(id)
      .then(() => {
        const filteredPersons = persons.filter((person) => person.id !== id);
        // console.log(filteredPersons);
        setPersons(filteredPersons);
      })
      .catch((error) => {
        console.log(`Couldnt delete the specific person with id ${id}`, error);
      })
    }
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
      <PersonList persons={personsToShow} personDeleteHandler={onPersonDelete}/>
    </div>
  )
}

export default App