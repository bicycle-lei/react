import React from 'react'
import NavHeader from '../../components/NavHeader'
import styles from './index.module.css'

export default class Map extends React.Component {
  componentDidMount() {
    // 在react中使用全局对象要用window 否者eslint 报错
    const map = new window.BMap.Map('container')
    // 设置中心坐标
    const point = new window.BMap.Point(116.404, 39.915)
    // 初始化地图
    map.centerAndZoom(point, 15)
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