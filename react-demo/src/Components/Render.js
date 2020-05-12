import React from 'react'
import imgurl from '../images/cat.png'
import PropsTypes from 'prop-types'
/*
  组件复用
   render props 模式(推荐使用children代替render属性) 和 高阶组件(HOC)
*/
class App extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
   
    return (
      <div>
        {/* <Mouse render={(mouse) => {
          return <div>鼠标位置：{mouse.x}, {mouse.y}</div>
          }}
        >
        </Mouse> */}
        
        {/* <Mouse render = {mouse => {
          return <img src={imgurl} alt="猫" style={
            {
              position:'absolute',
              left: mouse.x- 64,
              top: mouse.y- 64
            }
          }/>
        }}/> */}
        <Mouse>
          {
            mouse => {
              return (
                <p>
                  鼠标位置：{mouse.x}, {mouse.y}
                </p>
              )
            }
          }
        </Mouse>
        <Mouse>
          {
            mouse => {
              return <img src={imgurl} alt="猫" style={
                {
                  position:'absolute',
                  left: mouse.x- 64,
                  top: mouse.y- 64
                }
              }/>
            }
          }
        </Mouse>
        {/* 做了校验必传children 且为func */}
        {/* <Mouse/> */}
      </div>
    )
  }
}

// 创建Mouse组件 实现鼠标位置复用 只暴露数据
class Mouse extends React.Component {
  // 鼠标位置state
  state = {
    x: 64,
    y: 64
  }
  // 鼠标移动事件的处理程序
  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }
  // 监听鼠标移动事件
  componentDidMount () {
    window.addEventListener('mousemove',  this.handleMouseMove)
  }
  // 卸载组件时 解除事件绑定
  componentWillUnmount () {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }
  render () {
    // return this.props.render(this.state)
    return this.props.children(this.state)
  }
}

Mouse.propsTypes = {
  children: PropsTypes.func.isRequired
}
export default App