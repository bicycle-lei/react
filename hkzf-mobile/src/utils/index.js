import axios from 'axios'

export const getCurrentCity = () => {
  const localCity = localStorage.getItem('hkzf_city')
  if (!localCity) {
    return new Promise((resolve, reject) => {
      const curCity = new window.BMap.LocalCity()
      curCity.get(async res => {
        try {
          const result = await axios.get(`http://118.190.160.53:8009/area/info?name=${res.name}`)
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