import React from 'react'
import SearchHeader from '../../components/SearchHeader'
import HouseItem from '../../components/HouseItem'
import { Flex, Toast } from 'antd-mobile'
import { List, AutoSizer } from 'react-virtualized'
import styles from './index.module.css'
import { API } from '../../utils/api'
import Filter from './components/Filter'
import { BASE_URL } from '../../utils/url'
// 获取当前定位城市信息
const { label, value } = JSON.parse(localStorage.getItem('hkzf_city')) || {}

export default class HouseList extends React.Component {
  filters = {}
  state = {
    list: [],
    count: 0
  }
  componentDidMount() {
    this.searchHouseList()
  }
  onFilter = (filters) => {
    this.filters = filters
  }
  searchHouseList = async () => {
    Toast.loading('加载中...', 0, null, false)
    const res = await API.get('/houses', {
      params: {
        cityId: value,
        ...this.filters,
        start: 1,
        end: 20
      }
    })
    Toast.hide()
    const { list, count } = res.data.body
    this.setState({
      list: list,
      count: count
    })
  }

  renderHouseList = ({
    key,
    index,
    style,
  }) => {
    const { list } = this.state
    const house = list[index]
    return (
      <HouseItem key={key} style={style} src={BASE_URL + house.houseImg} title={house.title} desc={house.desc} tags={house.tags} price={house.price}></HouseItem>
    );
  }
  render() {
    return (
      <div>
        <Flex className={styles.header}>
          <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
          <SearchHeader cityName={label || ''} className={styles.searchHeader} />
        </Flex>

        <Filter onFilter={this.onFilter} />
        <div className={styles.houseItems}>
          {/* <AutoSizer> */}
          <List
            width={300}
            height={300}
            rowCount={this.state.count}
            rowHeight={120}
            rowRenderer={this.renderHouseList}
          />
          {/* </AutoSizer> */}

        </div>
      </div>
    )
  }
}