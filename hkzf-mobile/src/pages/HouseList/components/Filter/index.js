import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
import { Spring } from 'react-spring/renderprops'
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
    this.htmlBody = document.body

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
    const { titleSelectedStatus, selectedVlues } = this.state
    this.htmlBody.className = 'body-fixed'
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
      } else if (key === 'more' && selectedVal.length !== 0) {
        newTitleSelectedStatus[key] = true
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

  onCancel = (type) => {
    const { titleSelectedStatus, selectedVlues } = this.state
    const newTitleSelectedStatus = { ...titleSelectedStatus }
    const value = selectedVlues[type]
    this.htmlBody.className = ''
    if (type === 'area' && (value.length !== 2 || value[0] !== 'area')) {
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && value[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && value[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else if (type === 'more' && value.length !== 0) {
      newTitleSelectedStatus[type] = true
    } else {
      newTitleSelectedStatus[type] = false
    }
    this.setState({
      titleSelectedStatus: { ...newTitleSelectedStatus },
      openType: ''
    })
  }

  onSave = (type, value) => {
    const { titleSelectedStatus } = this.state
    const newTitleSelectedStatus = { ...titleSelectedStatus }
    this.htmlBody.className = ''
    if (type === 'area' && (value.length !== 2 || value[0] !== 'area')) {
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && value[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && value[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else if (type === 'more' && value.length !== 0) {
      newTitleSelectedStatus[type] = true
    } else {
      newTitleSelectedStatus[type] = false
    }

    const newSelectedValues = {
      ...this.state.selectedVlues,
      [type]: value
    }

    const { area, mode, price, more } = newSelectedValues
    const areaKey = area[0]
    let areaValue = 'null'
    if (area.length === 3) {
      areaValue = area[2] !== 'null' ? area[2] : area[1]
    }

    const filters = {
      [areaKey]: areaValue,
      'mode': mode[0],
      'price': price[0],
      'more': more.join(',')
    }
    this.props.onFilter(filters)
    this.setState({
      openType: '',
      titleSelectedStatus: { ...newTitleSelectedStatus },
      selectedVlues: newSelectedValues
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
    const { openType, selectedVlues, filtersData: { roomType, oriented, floor, characteristic } } = this.state
    const data = {
      roomType,
      oriented,
      floor,
      characteristic
    }
    let defaultValue = selectedVlues.more
    return openType === 'more' ? <FilterMore data={data} type={openType} onSave={this.onSave} defaultValue={defaultValue} onCancel={this.onCancel} /> : ''
  }
  renderMask = () => {
    const { openType } = this.state
    const isHide = openType === 'more' || openType === ''
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: isHide ? 0 : 1 }}>
        {props => {
          if (props.opacity === 0) {
            return null
          } else {
            return (<div style={props} className={styles.mask} onClick={() => this.onCancel(openType)} />)
          }
        }
        }
      </Spring>
    )
  }
  render() {
    const { titleSelectedStatus } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}

        {
          this.renderMask()
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
