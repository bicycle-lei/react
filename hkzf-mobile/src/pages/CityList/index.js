import React from 'react'
import { NavBar } from 'antd-mobile'
import axios from 'axios'
import { getCurrentCity } from "../../utils"

import './index.scss'
// 数据格式化的方法
const formatCityDate = (list) => {
  const cityList = {}
  
  list.forEach(item => {
    const first = item.short.substr(0, 1)
    if (cityList[first]) {
      cityList[first].push(item)
    } else {
      cityList[first] = [item]
    }
  })

  const cityIndex = Object.keys(cityList).sort()
  
  return {
    cityList,
    cityIndex
  }
}
export default class CityList extends React.Component {
  state = {
    cityList: []
  }
  componentDidMount () {
    this.getCityList()
  }

  async getCityList () {
    const res = await axios.get('http://118.190.160.53:8009/area/city?level=1')
    const res1 = await axios.get('http://118.190.160.53:8009/area/hot')
    const {cityList, cityIndex } = formatCityDate(res.data.body)
    cityList['hot'] = res1.data.body
    cityIndex.unshift('hot')
    const curCity = await getCurrentCity()
    cityList['#'] = [curCity]
    cityIndex.unshift('#')
    console.log(cityList)
    console.log(cityIndex)
  }
  render () {
    return (
      <div className="citylist">
        <NavBar
          className="navbar"
          mode="light"
          icon={<i className="iconfont icon-back"/>}
          onLeftClick={() => this.props.history.go(-1)}
        >城市选择</NavBar>
      </div>
    )
  }
}