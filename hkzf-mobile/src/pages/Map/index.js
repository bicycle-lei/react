import React from 'react'
import NavHeader from '../../components/NavHeader'
import styles from './index.module.css'
import axios from 'axios'


const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255. 255)',
  textAlign: 'center'
}
export default class Map extends React.Component {
  componentDidMount() {
    this.initMap()
  }
  initMap = () => {
    const map = new window.BMap.Map('container')
    var myGeo = new window.BMap.Geocoder()

    const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))

    myGeo.getPoint(label, async point => {
      if (point) {
        map.centerAndZoom(point, 11)
        map.addControl(new window.BMap.ScaleControl())
        map.addControl(new window.BMap.NavigationControl())


        const res = await axios.get(`http://118.190.160.53:8009/area/map?id=${value}`)
        res.data.body.forEach(item => {
          const { coord: { latitude, longitude }, label: areaName, count, value } = item
          const areaPoint = new window.BMap.Point(longitude, latitude)
          const opts = {
            position: areaPoint,
            offset: new window.BMap.Size(-35, -35)
          }
          const label = new window.BMap.Label('', opts)

          label.id = value
          label.setContent(`
            <div class="${styles.bubble}">
              <p class="${styles.name}">${areaName}</p>
              <p>${count} 套</p>
            </div>
          `)
          label.setStyle(labelStyle)

          label.addEventListener('click', () => {
            map.centerAndZoom(areaPoint, 13)
            setTimeout(() => {
              map.clearOverlays()
            }, 0)
          })

          map.addOverlay(label)
        });
      }
    }, label)
  }
  render() {
    return (
      <div className={styles.map}>
        {/* 地图容器 */}
        <NavHeader>地图找房</NavHeader>
        <div id="container" className={styles.container}></div>
      </div>
    )
  }
}