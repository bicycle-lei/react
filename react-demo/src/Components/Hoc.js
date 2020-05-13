import React from 'react'
import imgurl from '../images/cat.png'
/*
  高阶组件
  HOC是一个函数 接收要包装的组件 返回增强后的组件
  使用步骤
  创建一个函数 名称约定以with开头
  指定函数参数作为要渲染的组件 所以要大写字母开头
  函数每部创建一个类组件 提供复用的状态逻辑代码
  在该组件中渲染参数组件 同时将状态通过prop传递给参数组件
  将要增强的组件放入改组件中调用后渲染出来

  displayName
  使用高阶组件得到的两个组件名称相同
  默认情况下React使用组件名称作为displayName
  所以使用displayName设置不同名称

  传递props
  props丢失 高阶组件没有传递props
*/
function withMouse (WrappedComponent) {
  // 该组件提供复用的逻辑
  class Mouse extends React.Component {
    // 鼠标状态
    state = {
      x: 0,
      y: 0
    }
    //控制鼠标
    handleMouseMove = (e) => {
      this.setState({
        x: e.clientX,
        y: e.clientY
      })
    }
    componentWillUnmount = (e) => {
      window.removeEventListener('mousemove', this.handleMouseMove)
    }
    componentDidMount () {
      window.addEventListener('mousemove', this.handleMouseMove)
    }
    render () {
      return (
      <WrappedComponent {...this.state} {...this.props}></WrappedComponent>
      )
    }
  }
  // 设置dispaayName
  Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`
  return Mouse
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const Position = props => (
  <p>
    鼠标当前位置:(x: {props.x}, y: {props.y}) {props.a}
  </p>
)
// 猫捉老鼠的组件
const Cat = props => (
  <img src={imgurl} alt="" style={
    {
      position: "absolute",
      top: props.y - 64,
      left: props.x - 64
    }
  }/>
)
// 增强后的猫组件
const MouseCat = withMouse(Cat)
// 获取增强后的组件
const MousePosition = withMouse(Position)
class App extends React.Component {
  render () {
    return (
      <div>
        <MouseCat/>
        <MousePosition a="1"/>
      </div>
    )
  }
}
export default App 