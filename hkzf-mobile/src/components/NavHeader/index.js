import React from 'react'
import { NavBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import './index.scss'
import PropTypes from 'prop-types'

function NavHeader({ children, history, onLeftClick }) {
  const defaultHandler = () => history.go(-1)
  return (
    <NavBar
      className="navbar"
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onLeftClick={onLeftClick || defaultHandler}
    >
      {children}
    </NavBar>
  )
}

NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func
}
// withRouter 函数的返回值也是一个组件
export default withRouter(NavHeader)