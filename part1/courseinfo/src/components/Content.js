import React from 'react';

const Content = ({ parts }) => {
    return (
        <>
        {parts.map(({ title, exercises }, i) => (
            <p key={i}>{title} - Number of ex. {exercises}</p>
        ))}
        </>
    )
}

export default Content
