import axios from 'axios'
import { BASE_URL } from './url'
import { API } from './api'
import { getCity, setCity } from './city'
export const getCurrentCity = () => {
  const localCity = localStorage.getItem('hkzf_city')
  if (!localCity) {
    return new Promise((resolve, reject) => {
      const curCity = new window.BMap.LocalCity()
      curCity.get(async res => {
        try {
          const result = await axios.get(`${BASE_URL}/area/info?name=${res.name}`)
          localStorage.setItem('hkzf_city', JSON.stringify(result.data.body))
          resolve(result.data.body)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  return Promise.resolve(JSON.parse(localCity))
}
export { getCity, setCity, BASE_URL, API }