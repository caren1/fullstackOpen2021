import React from 'react'

const Result = ({ text, score }) => {

    return (
        <div>
            {text} : {isNaN(score) ? 'There has to be a vote.' : score} {text === 'positive' && !isNaN(score) ? '%' : ''}
        </div>
    )
}

export default Result
