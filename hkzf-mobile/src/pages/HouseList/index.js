import React from 'react'
import SearchHeader from '../../components/SearchHeader'
import HouseItem from '../../components/HouseItem'
import { Flex, Toast } from 'antd-mobile'
import { List, AutoSizer, WindowScroller, InfiniteLoader } from 'react-virtualized'
import styles from './index.module.css'
import { API } from '../../utils/api'
import Filter from './components/Filter'
import { BASE_URL } from '../../utils/url'
import Sticky from '../../components/Sticky'
import NoHouse from '../../components/NoHouse'
import { getCurrentCity } from '../../utils/index'
// 获取当前定位城市信息
// const { label, value } = JSON.parse(localStorage.getItem('hkzf_city')) || {}

export default class HouseList extends React.Component {
  filters = {}
  state = {
    list: [],
    count: 0,
    isLoading: false
  }
  label = ''
  value = ''
  async componentDidMount() {
    const { label, value } = await getCurrentCity()
    this.label = label
    this.value = value
    this.searchHouseList()
  }
  onFilter = (filters) => {
    this.filters = filters
    this.searchHouseList()
    window.scrollTo(0, 0)
  }
  searchHouseList = async () => {
    Toast.loading('加载中...', 0, null, false)
    this.setState({
      isLoading: true
    })
    const res = await API.get('/houses', {
      params: {
        cityId: this.value,
        ...this.filters,
        start: 1,
        end: 20
      }
    })
    Toast.hide()
    this.setState({
      isLoading: false
    })
    const { list, count } = res.data.body
    if (count !== 0) {
      Toast.info(`共找到${count}套房源`, 2, null, false)
    }
    this.setState({
      list: list,
      count: count
    })
  }

  renderHouseList = ({ key, index, style }) => {
    const { list } = this.state
    const house = list[index]
    if (!house) {
      return (
        <div key={key} style={style}>
          <p className={styles.loading}></p>
        </div>
      )
    }
    return (
      <HouseItem key={key} style={style} src={BASE_URL + house.houseImg} title={house.title} desc={house.desc} tags={house.tags} price={house.price}></HouseItem>
    )
  }

  isRowLoaded = ({ index }) => {
    return !!this.state.list[index]
  }

  loadMoreRows = ({ startIndex, stopIndex }) => {
    return new Promise(resolve => {
      API.get('/houses', {
        params: {
          cityId: this.value,
          ...this.filters,
          start: startIndex,
          end: stopIndex
        }
      }).then(res => {
        this.setState({
          list: [...this.state.list, ...res.data.body.list]
        })
        resolve()
      })
    })
  }
  renderList() {
    const { count, isLoading } = this.state
    if (count === 0 && !isLoading) {
      return <NoHouse>没有找到房源，请您换个搜索条件吧~</NoHouse>
    }

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={count}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, scrollTop }) => (
              <AutoSizer>
                {({ width }) => (
                  <List
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    autoHeight
                    width={width}
                    height={height}
                    rowCount={count}
                    rowHeight={120}
                    rowRenderer={this.renderHouseList}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    )
  }
  render() {
    return (
      <div>
        <Flex className={styles.header}>
          <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
          <SearchHeader cityName={this.label} className={styles.searchHeader} />
        </Flex>
        <Sticky height={40}>
          <Filter onFilter={this.onFilter} />
        </Sticky>
        <div className={styles.houseItems}>
          {
            this.renderList()
          }
        </div>
      </div>
    )
  }
}