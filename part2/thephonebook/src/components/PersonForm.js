import React from 'react'

const PersonForm = ({ personAddHandler, newName, phoneNumber, nameChangeHandler, phoneChangeHandler}) => {
    return (
        <form onSubmit={personAddHandler}>
        <div>
          name: <input value={newName} onChange={nameChangeHandler}/>
        </div>
        <div>
          phone: <input value={phoneNumber} onChange={phoneChangeHandler} minLength={3}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm
