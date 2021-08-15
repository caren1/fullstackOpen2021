import React from 'react'

const Filter = ({ filter, filterChangeHandler }) => {
    return (
        <div>
            Filter shown with: <input value={filter} onChange={filterChangeHandler}/>
        </div>
    )
}

export default Filter
