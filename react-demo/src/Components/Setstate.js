import React from 'react'
/*
  更新数据
  setState() 异步更新数据
  更新setState后面的不要依赖前面的 多次调用setState只会触发一次render
  setState({}, function) 第二个参数为更新数据后的回调函数
*/
class App extends React.Component {
  state = {
    count: 0
  }
  addCount = () => {
    this.setState({
      count: this.state.count + 1
    })
    console.log(this.state.count) // 1

    this.setState({
      count: this.state.count + 1 // 1 + 1
    }, () => {
      console.log('状态更新：', this.state.count)
    })
    console.log(this.state.count) // 1
  }
  addCount1 = () => {
    // 推荐的语法 也是异步更新
    // 箭头函数的两个参数都是代表最新值
    this.setState((state, props) => {
      return {
        count: state.count + 1
      }
    })
    console.log(this.state.count) // 1

    this.setState((state, props) => {
      console.log(state) // 2
      return {
        count: state.count + 1
      }
    })
    console.log(this.state.count) // 1
  }
  render () {
    console.log('render') // 不管addCount 调用了几次setState render只会更新一次
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.addCount}>点击按钮+1</button>
        <button onClick={this.addCount1}>点击按钮+1</button>
      </div>
    )
  }
}
export default App 