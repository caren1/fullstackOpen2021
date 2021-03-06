import React from 'react'

const PersonList = ({ persons, personDeleteHandler }) => {

  if (!persons) return <h3>Persons list is currently empty.</h3>

    return (
        <>
        {persons.map((person) => (
        <p key={person.id}>{person.name} - {person.number}
         <span>
           <button onClick={() => personDeleteHandler(person.id)}>delete</button>
          </span>
        </p>
      ))}
        </>
    )
}

export default PersonList
