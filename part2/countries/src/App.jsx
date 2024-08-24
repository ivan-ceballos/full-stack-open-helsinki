import { useState, useEffect } from 'react'
import countryService from './services/countries'

import Filter from './components/Filter'
import List from './components/List'
import CountryDetail from './components/CountryDetail'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countryToShow, setCountryToShow] = useState(null)

  useEffect(() => {
    countryService
      .getCountries()
      .then(countries => setCountries(countries))
      .catch(error => console.error('Failed to fetch countries:', error))
  }, [])
  
  const countriesToShow = filter
  ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  : []

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setCountryToShow(null)
  }

  const handleCountryClick = (country) => setCountryToShow(country)

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <List countries={countriesToShow} handleCountryClick={handleCountryClick} />
      {countryToShow && <CountryDetail country={countryToShow} />}
    </div>
  )
}

export default App
