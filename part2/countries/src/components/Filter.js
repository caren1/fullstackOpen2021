import React from 'react'

const Filter = ({ filter, filterChangeHandler }) => {
    return (
        <>
            <h1>Please find desired country 🌎🌏🌍 : </h1>
            <input placeholder="Poland.." type="text" value={filter} onChange={filterChangeHandler} />
        </>
    )
}

export default Filter
