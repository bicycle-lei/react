import React, { Component, createRef } from 'react'

import styles from './index.module.css'
import PropTypes from 'prop-types'
// dom.getBoundingClientRect() 获取元素的大小及其相对于视口的位置。

class Sticky extends Component {

  placeholder = createRef()
  content = createRef()

  handleScroll = () => {
    const placeholderEl = this.placeholder.current
    const contentEl = this.content.current

    const { top } = placeholderEl.getBoundingClientRect()
    if (top < 0) {
      contentEl.classList.add(styles.fixed)
      placeholderEl.style.height = `${this.props.height}px`
    } else {
      contentEl.classList.remove(styles.fixed)
      placeholderEl.style.height = '0px'
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    return (
      <div>
        <div ref={this.placeholder} />
        <div ref={this.content}>{this.props.children}</div>
      </div>
    )
  }
}
Sticky.propTypes = {
  height: PropTypes.number.isRequired
}
export default Sticky
