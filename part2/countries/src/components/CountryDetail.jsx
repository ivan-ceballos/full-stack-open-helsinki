import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const CountryDetail = ({country}) => {
  const [currentWeather, setCurrentWeather] = useState(null)

  useEffect(() => {
    weatherService
      .getWeather(country.capital)
      .then(weather => setCurrentWeather(weather))
      .catch(error => console.error('Failed to fetch weather data', error))
  }, [])

  const languages = Object.values(country.languages)

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        capital {country.capital}
        <br />
        area {country.area} 
      </p>
      <h3>languages:</h3>
      <ul>
        {languages.map((languages, index) => <li key={index}>{languages}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag" width='150'/>
      {currentWeather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>temperature {currentWeather.main.temp} Celcius</p>
          <img 
            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
            alt={currentWeather.weather[0].description}
          />
          <p>wind {currentWeather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default CountryDetail
