import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import { API } from '../../../../utils/api'

import styles from './index.module.css'
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false,
}

export default class Filter extends Component {
  state = {
    titleSelectedStatus,
    openType: '',
    filtersData: {}
  }

  componentDidMount() {
    this.getFilterData()
  }

  async getFilterData() {
    const { value } = JSON.parse(localStorage.getItem('hkzf_city')) || {}
    const res = await API.get(`/houses/condition?id=${value}`)
    this.setState({
      filtersData: res.data.body
    })
  }

  onTitleClick = (type) => {
    this.setState(prevState => {
      return {
        openType: type,
        titleSelectedStatus: {
          ...prevState.titleSelectedStatus,
          [type]: true
        }
      }
    })
  }

  onCancel = () => {
    this.setState({
      openType: ''
    })
  }

  onSave = () => {
    this.setState({
      openType: ''
    })
  }

  renderFilterPicker = () => {
    const { openType, filtersData: { area, subway, rentType, price } } = this.state
    if (openType !== 'area' && openType !== 'mode' && openType !== 'price') {
      return null
    }
    let data = []
    let cols = 3
    switch (openType) {
      case 'area': data = [area, subway]
        break
      case 'mode':
        data = rentType
        cols = 1
        break
      case 'price':
        data = price
        cols = 1
        break
      default:
        break
    }


    return <FilterPicker onCancel={this.onCancel} onSave={this.onSave} data={data} cols={cols} />
  }

  render() {
    const { titleSelectedStatus, openType } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}

        {
          (openType === 'area' || openType === 'mode' || openType === 'price') ? <div className={styles.mask} onClick={this.onCancel} /> : null
        }
        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle titleSelectedStatus={titleSelectedStatus} onClick={this.onTitleClick} />

          {
            this.renderFilterPicker()
          }
          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
