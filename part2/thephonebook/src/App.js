import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

import personService from './service/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ message, setMessage ] = useState(null);

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
        setOperationMessage(`Successfully added ${returnedPerson.name}`, 'success', 3000);
        setPersons(persons.concat(returnedPerson))
      })
      .catch((error) => {
        setOperationMessage(`Couldn't add  ${newName.name}`, 'error', 3000);
      })
    } else {
      if (window.confirm(`${newName} is already added to phonebook.. 😏 Do you want to replace the old number with a new one?`)){
        const updatedPerson = {...existingPerson, number: phoneNumber }
        personService
        .updatePerson(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setOperationMessage(`Successfully updated ${returnedPerson.name}'s number`, 'success', 3000);
          setPersons(persons.map((person) => person.id !== returnedPerson.id ? person : returnedPerson))
        })
        .catch((error) => {
          setOperationMessage(`Couldnt update ${existingPerson.name}'s number`, 'error', 3000);
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
        setOperationMessage(`Successfully deleted ${personToDelete.name}`, 'success', 3000);
        setPersons(filteredPersons);
      })
      .catch((error) => {
        console.log(`Couldnt delete the specific person with id ${id}`, error);
        setOperationMessage(`Couldnt delete the specific person with id ${id}`, 'error', 3000);
      })
    }
  }

  const onFilterChange = (event) => setFilter(event.target.value);
  const onNameChange = (event) => setNewName(event.target.value);
  const onPhoneChange = (event) => setPhoneNumber(event.target.value);
  const personsToShow = filter ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())) : persons;
  const setOperationMessage = (message, type, timer) => {
    const operationMessage = { message: message, type: type }
    setMessage(operationMessage)
    setTimeout(() => {
      setMessage(null);
    }, timer);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message}/>}
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