import React from 'react'

const Total = ({ course }) => {

    let exercisesSum = 0;
    course.parts.forEach(part => {
        exercisesSum += part.exercises
    });

    return (
        <>
            <p>Number of exercises in whole course : {exercisesSum}</p>
        </>
    )
}

export default Total
