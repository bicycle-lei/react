import React from 'react'
import { NavBar } from 'antd-mobile'
import axios from 'axios'
import { getCurrentCity } from "../../utils"
import { List, AutoSizer } from 'react-virtualized'
import './index.scss'

const TITLE_HEIGHT = 36
const NAME_HEIGHT = 50
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

const formatCityIndex = (letter) => {
  switch(letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'  
    default: 
      return  letter.toUpperCase()
  }
}

export default class CityList extends React.Component {
  state = {
    cityList: {},
    cityIndex: [],
    activeIndex: 0
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

    this.setState({
      cityList: cityList,
      cityIndex: cityIndex
    })
  }
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    const { cityIndex, cityList} = this.state
    const letter = cityIndex[index]
    return (
      <div key={key} style={style} className="city">
        <div className="title">
         {formatCityIndex(letter)}
        </div>
        {
          cityList[letter].map(item => <div className="name" key={item.value}>{item.label}</div>)
        }
      </div>
    );
  }

  getRowHeight = ({ index }) => {
    const { cityIndex, cityList} = this.state
    return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
  }

  renderCityIndex = () => {
    const { cityIndex, activeIndex} = this.state
    return cityIndex.map((item, index) => 
      <li className="city-index-item" key={item}>
        <span className={activeIndex === index ? 'index-active' : ''}>{item === 'hot'? '热' : item.toUpperCase()}</span>
      </li>
    )
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
        {/* 城市列表 */}
        <AutoSizer>
          {
            ({height, width}) => 
              (<List
                width={width}
                height={height}
                rowCount={this.state.cityIndex.length}
                rowHeight={this.getRowHeight}
                rowRenderer={this.rowRenderer}
              />)
          }
        </AutoSizer>
        {/* 右侧索引 */}
        <ul className="city-index">
          {this.renderCityIndex()}
        </ul>
      </div>
    )
  }
}