import React from 'react'
/*
  组件生命周期
*/
class App extends React.Component {
  constructor (props) {
    super(props)
    //初始化 state
    this.state = {
      count: 0
    }
    // 组件创建最先执行
    console.warn('生命周期钩子函数：constructor')
  }
  componentDidMount () {
    // 组件渲染后执行 可以进行DOM操作 发送网络请求
    console.warn('生命周期钩子函数：componentDidMount')
  }
  componentDidUpdate () {

  }
  // 打豆豆
  handleChange = () => {
    this.setState({
      count: this.state.count + 1
    })
    // 演示强制更新
    // this.forceUpdate()
  }
  render () {
    // 渲染ui(注意render中不能调用setState({})) 改变state数据就会触发
    // 被触发的情况 New props  setState forceUpdate(强制更新)
    console.warn('生命周期钩子函数：render')
    return (
      <div>
        {
          this.state.count > 3 
          ? <p>豆豆被打死了</p>
          : <Counter count={this.state.count}/>
        }
        <button onClick={this.handleChange}>打豆豆</button>
      </div>
    )
  }
}

class Counter extends React.Component {
  constructor (props) {
    super(props)
    console.warn('子组件 constr')
  }
  componentDidUpdate (prevProps) { //prevProps 更新前的props
    // 组件render更新后触发 如果要操作setState必须有判定条件(if) 避免陷入死循环
    console.warn('子组件：componentDidUpdate')
    console.log('上一次的props',prevProps, '当前的props', this.props)
  }
  componentDidMount () {
    console.warn('子组件：componentDidMount')
  }
  // 组件卸载时触发
  componentWillUnmount () {
    console.warn('子组件：componentWillUnmount')
  }
  render () {
    console.warn('接收组件props render 会更新')
    return <h1>统计豆豆被打的次数：{this.props.count}</h1>
  }
}
export default App