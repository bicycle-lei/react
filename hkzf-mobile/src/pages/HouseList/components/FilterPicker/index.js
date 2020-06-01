import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'


export default class FilterPicker extends Component {

  state = {
    value: this.props.defaultValue
  }
  change = (val) => {
    this.setState({
      value: val
    })
  }
  render() {
    const { onCancel, onSave, data, cols, type } = this.props
    const { value } = this.state
    return (
      <>
        {/* 选择器组件： */}
        <PickerView data={data} value={value} cols={cols} onChange={this.change} />

        {/* 底部按钮 */}
        <FilterFooter onCancel={onCancel} onOk={() => onSave(type, value)} />
      </>
    )
  }
}
