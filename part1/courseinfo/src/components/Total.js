import React from 'react'

const Total = ({ course }) => {

    const exercises = course.parts.map((part) => part.exercises)
    const total = exercises.reduce((a, b) =>  a + b);

    return (
        <>
            <p>Number of exercises in whole course : {total}</p>
        </>
    )
}

export default Total
