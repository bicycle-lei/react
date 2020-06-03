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
          cityId: value,
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
  render() {
    const { count } = this.state
    return (
      <div>
        <Flex className={styles.header}>
          <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
          <SearchHeader cityName={label || ''} className={styles.searchHeader} />
        </Flex>
        <Sticky height={40}>
          <Filter onFilter={this.onFilter} />
        </Sticky>
        <div className={styles.houseItems}>
          <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadMoreRows}
            rowCount={count}
          >
            {
              ({ onRowsRendered, registerChild }) => (
                <WindowScroller>
                  {
                    ({ height, isScrolling, scrollTop }) => (
                      <AutoSizer>
                        {({ width }) => (
                          <List
                            onRowsRendered={onRowsRendered}
                            ref={registerChild}
                            autoHeight // 渲染高度
                            width={width}
                            height={height} // 可视高度
                            rowCount={count}
                            rowHeight={120}
                            rowRenderer={this.renderHouseList}
                            isScrolling={isScrolling}
                            scrollTop={scrollTop}
                          />
                        )}
                      </AutoSizer>
                    )
                  }
                </WindowScroller>
              )
            }
          </InfiniteLoader>
        </div>
      </div>
    )
  }
}