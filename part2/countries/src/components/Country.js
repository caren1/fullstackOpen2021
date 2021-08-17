import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
    const {name, capital, population, flag, languages } = country;
    const API_KEY = process.env.REACT_APP_API_KEY

    const [ countryWeather, setCountryWeather ] = useState();

    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${name}`)
        .then((res) => {
            console.log('response here', res);
            setCountryWeather(res.data);
        })
    }, [])

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
            <hr />
            {countryWeather ? (
                <div>
                    <h5>Weather in {name}</h5>
                    <p>Temperature: {countryWeather.current.temperature} Celsius</p>
                    <p>Wind: {countryWeather.current.wind_dir} </p>
                    <img src={countryWeather.current.weather_icons} alt="weather_icon" />
                </div>
            ) : (
                <p>did not fetch the weather yet.</p>
            )}
        </div>
    )
}

export default Country;
