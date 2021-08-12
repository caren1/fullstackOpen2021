import React from 'react'

const Total = ({ parts }) => {

    let exercisesSum = 0;
    parts.forEach(part => {
        exercisesSum += part.exercises
    });

    return (
        <>
            <p>Number of exercises in whole course : {exercisesSum}</p>
        </>
    )
}

export default Total
