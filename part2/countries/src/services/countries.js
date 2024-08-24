import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getCountries = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getCountries }