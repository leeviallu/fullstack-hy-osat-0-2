import axios from 'axios';
import {useEffect, useState} from 'react'
import Filter from './Filter';
import ListOfCountries from './ListOfCountries';
import CountryPage from './CountryPage';


const App = () => {
  const baseUrl = 'https://restcountries.com/v3.1/all';
  const [countries, setCountries] = useState([])
  const [visibleCountries, setVisibleCountries] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setCountries(response.data);
  })}, [])


  const countriesToShow = (event) => {
    const filteredCountries = countries.filter(country => {
        return country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      })
      setVisibleCountries(filteredCountries);
  }
  return (
    <div>
      <Filter event={countriesToShow} />
      {
        (visibleCountries.length <= 10) 
        ?
        <div>
          {
            (visibleCountries.length === 1) 
            ?
            visibleCountries.map(country => {
              return (
                <CountryPage key={country} country={country} /> 
              )
            })
            :
            <ListOfCountries list={visibleCountries} />
          }
        </div>
        :
        <p>Too many matches, specify another filter</p>
      }
    </div>
  );
}

export default App;
