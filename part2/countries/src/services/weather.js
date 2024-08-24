import axios from "axios";

const apiKey = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getWeather = (capital) => {
  const request = axios.get(`${baseUrl}${capital}&appid=${apiKey}&units=metric`)
  return request.then(response => response.data)
}

export default { getWeather }

