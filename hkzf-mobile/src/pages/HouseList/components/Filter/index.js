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

const selectedVlues = {
  area: ['area', 'null'],
  mode: ['null'],
  price: ['null'],
  more: []
}

export default class Filter extends Component {
  state = {
    titleSelectedStatus,
    openType: '',
    filtersData: {},
    selectedVlues
  }

  componentDidMount() {
    this.getFilterData()
  }

  async getFilterData() {
    const { value } = JSON.parse(localStorage.getItem('hkzf_city'))
    const res = await API.get(`/houses/condition?id=${value}`)
    this.setState({
      filtersData: res.data.body
    })
  }

  onTitleClick = (type) => {
    const { titleSelectedStatus, selectedVlues } = this.state

    const newTitleSelectedStatus = {
      ...titleSelectedStatus
    }
    // ['area', 'mode', 'price', 'more']
    Object.keys(titleSelectedStatus).forEach(key => {
      if (key === type) {
        newTitleSelectedStatus[key] = true
        return
      }

      const selectedVal = selectedVlues[key]

      if (key === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
        newTitleSelectedStatus[key] = true
      } else if (key === 'mode' && selectedVal[0] !== 'null') {
        newTitleSelectedStatus[key] = true
      } else if (key === 'price' && selectedVal[0] !== 'null') {
        newTitleSelectedStatus[key] = true
      } else if (key === 'more') {

      } else {
        newTitleSelectedStatus[key] = false
      }
    })
    this.setState(prevState => {
      return {
        openType: type,
        titleSelectedStatus: { ...newTitleSelectedStatus }
      }
    })
  }

  onCancel = () => {
    this.setState({
      openType: ''
    })
  }

  onSave = (type, value) => {

    this.setState({
      openType: '',
      selectedVlues: {
        ...this.state.selectedVlues,
        [type]: value
      }
    })
  }

  renderFilterPicker = () => {
    const { openType, filtersData: { area, subway, rentType, price }, selectedVlues } = this.state
    if (openType !== 'area' && openType !== 'mode' && openType !== 'price') {
      return null
    }
    let data = []
    let cols = 3
    let defaultValue = selectedVlues[openType]

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


    return <FilterPicker
      key={openType}
      onCancel={this.onCancel}
      onSave={this.onSave}
      data={data}
      cols={cols}
      type={openType}
      defaultValue={defaultValue} />
  }
  renderFilterMore() {
    const { openType, filtersData: { roomType, oriented, floor, characteristic } } = this.state
    const data = {
      roomType,
      oriented,
      floor,
      characteristic
    }
    return openType === 'more' ? <FilterMore data={data} /> : ''
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
          {
            this.renderFilterMore()
          }
        </div>
      </div>
    )
  }
}
