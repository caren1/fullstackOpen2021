import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Country from './components/Country'

function App() {
  const baseUrl = 'https://restcountries.eu/rest/v2/all';

  const [ countries, setCountries ] = useState([]);
  const [ filter, setFilter ] = useState('');
  const [ filteredCountries, setFilteredCountries ] = useState([]);
  const [ countryDetails, setCountryDetails ] = useState();

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const onShowDetails = (country) => {
    setCountryDetails(country);
  }

  useEffect(() => {
    axios
    .get(baseUrl)
    .then((res) => {
      setCountries(res.data);
    })
  }, [])

  useEffect(() => {
    const countriesAfterFilter = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))
    setFilteredCountries(countriesAfterFilter);
  }, [filter])

  let filterResults;
  if (filter){
    if (filteredCountries.length > 10) {
      filterResults = <p>Too many matches, please be more specific.</p>
    } else if (filteredCountries.length === 1){
      filterResults = <Country country={filteredCountries[0]}/>
    } else if (filteredCountries.length <= 10 && filteredCountries.length >= 1){
      filterResults = filteredCountries.map((country) => (
        <li key={country.name}>{country.name} <span><button onClick={() => onShowDetails(country)}>show</button></span></li>
      ))
    } else if (filteredCountries.length === 0){
      filterResults = <p>Unknown country, try something else.</p>
    }
  }

  return (
    <div className="App">
      {!countryDetails ? (
      <>
      <Filter filter={filter} filterChangeHandler={onFilterChange}/>
      <hr />
      {!filter 
      ? <p>Please type something in input field..</p> 
      : (
        <ul>
          {filterResults}
        </ul>
      )}
      </>
      ) : (<Country country={countryDetails}/>)}
    </div>
  );
}

export default App;
