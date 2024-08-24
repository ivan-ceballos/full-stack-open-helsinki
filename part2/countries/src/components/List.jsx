import Country from './Country'
import CountryDetail from './CountryDetail'

const List = ({ countries, handleCountryClick }) => {
  const renderCountryList = () => (
    <div>
        {countries.map(country => 
          <Country 
            name={country.name.common}
            onClick={() => handleCountryClick(country)}
            key={country.cca3}
          />
        )}
      </div>
  )
  const renderCountryDetail = () => {
    if (countries.length === 1) return <CountryDetail country={countries[0]} />;
    return null;
  }

  if (countries.length > 10) return <p>Too many matches, specify another filter</p>
  if (countries.length > 1) return renderCountryList()
  return renderCountryDetail()
}

export default List
