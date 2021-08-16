import React from 'react'

const PersonList = ({ persons }) => {

  if (!persons) return <h3>Persons list is currently empty.</h3>

    return (
        <>
        {persons.map((person) => (
        <p key={person.id}>{person.name} - {person.number}</p>
      ))}
        </>
    )
}

export default PersonList
