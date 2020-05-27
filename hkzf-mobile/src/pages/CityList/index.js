import React from 'react'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { getCurrentCity } from "../../utils"
import { List, AutoSizer } from 'react-virtualized'
import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'
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
  switch (letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

export default class CityList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityList: {},
      cityIndex: [],
      activeIndex: 0
    }
    this.cityListComponent = React.createRef()
  }
  async componentDidMount() {
    await this.getCityList()
    // measureAllRows 提前计算list中每一行的高度
    // 调用这个方法的时候需要保证list组件中已经有数据
    this.cityListComponent.current.measureAllRows()
  }

  async getCityList() {
    const res = await axios.get('http://118.190.160.53:8009/area/city?level=1')
    const res1 = await axios.get('http://118.190.160.53:8009/area/hot')
    const { cityList, cityIndex } = formatCityDate(res.data.body)
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

  changeCity = ({ label, value }) => {
    if (HOUSE_CITY.indexOf(label) > -1) {
      // 有
      localStorage.setItem('hkzf_city', JSON.stringify({ label: label, value: value }))
      this.props.history.go(-1)
    } else {
      Toast.info('该城市暂无房源数据', 3)
    }
  }

  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    const { cityIndex, cityList } = this.state
    const letter = cityIndex[index]
    return (
      <div key={key} style={style} className={styles.city}>
        <div className={styles.title}>
          {formatCityIndex(letter)}
        </div>
        {
          cityList[letter].map(item => <div className={styles.name} key={item.value} onClick={() => this.changeCity(item)}>{item.label}</div>)
        }
      </div>
    );
  }

  getRowHeight = ({ index }) => {
    const { cityIndex, cityList } = this.state
    return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
  }

  renderCityIndex = () => {
    const { cityIndex, activeIndex } = this.state
    return cityIndex.map((item, index) =>
      <li className={styles.cityIndexItem} key={item} onClick={() => {
        this.cityListComponent.current.scrollToRow(index)
      }}>
        <span className={activeIndex === index ? styles.indexActive : ''}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
      </li>
    )
  }
  // 用于获取list组件渲染行信息
  onRowsRendered = ({ startIndex }) => {
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex
      })
    }
  }
  render() {
    return (
      <div className={styles.citylist}>
        <NavHeader>城市列表</NavHeader>
        {/* 城市列表 */}
        <AutoSizer>
          {
            ({ height, width }) =>
              (<List
                ref={this.cityListComponent}
                scrollToAlignment='start'
                width={width}
                height={height}
                rowCount={this.state.cityIndex.length}
                rowHeight={this.getRowHeight}
                rowRenderer={this.rowRenderer}
                onRowsRendered={this.onRowsRendered}
              />)
          }
        </AutoSizer>
        {/* 右侧索引 */}
        <ul className={styles.cityIndex}>
          {this.renderCityIndex()}
        </ul>
      </div>
    )
  }
}