import React from 'react'

const Country = ({ country }) => {
    // console.log("halo?",country);
    const {name, capital, population, flag, languages } = country;
    // console.log(languages);
    return (
        <div>
            <h3>{name}</h3>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <ul>
                {languages ? (
                    languages.map((language) => (
                        <li key={language}>{language.name}</li>
                    ))
                ) : (
                    <li>{languages[0].name}</li>
                )}
            </ul>
            <div style={{ width: '100px', height: '100px', margin: '1em'}}>
                <img src={flag} alt="flag" style={{ width: '100%'}}></img>
            </div>
        </div>
    )
}

export default Country;
