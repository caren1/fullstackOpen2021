import React from 'react';
import Part from './Part'

const Content = ({ parts }) => {
    return (
        <>
        {parts.map(({ title, exercises }, i) => (
            <Part key={i} title={title} exercises={exercises} />
        ))}
        </>
    )
}

export default Content
