import React from 'react'
/*
  受控组件： 其值受到React控制的表单元素
  文本框 富文本框 下拉框 操作value的值
  复选框 操作 checked的值
*/

class Form extends React.Component {
  state = {
    txt: '文本',
    content: '富文本框',
    city: 'sh',
    isChecked: false
  }
  handleTxt = e => {
    this.setState({
      txt: e.target.value
    })
  }

  // 处理富文本框
  handleContent = e => {
    this.setState({
      content: e.target.value
    })
  }

  // 处理下拉框
  handleCiyt = e => {
    this.setState({
      city: e.target.value
    })
  }

  // 处理复选框
  handleChecked = e => {
    this.setState({
      isChecked: e.target.checked
    })
  }

  // 优化后的统一表单函数
  handleChange = e => {
    // 获取当前DOM对象
    const target = e.target

    // 根据类型获取值
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value

    // 获取name  
    const name = target.name

    this.setState({
      [name]: value
    })
  }
  render () {
    return (
      <div>
        {/* 文本框 */}
        <input type="text" value={this.state.txt} onChange={this.handleTxt}/>
        <br/>

        {/* 富文本框 */}
        <textarea value={this.state.content} onChange={this.handleContent}></textarea>
        <br/>

        {/* 下拉框 */}
        <select value={this.state.city} onChange={this.handleCiyt}>
          <option value="sh">上海</option>
          <option value="bj">北京</option>
          <option value="cq">重庆</option>
          <option value="tj">天津</option>
        </select>
        <br/>

        {/* 复选框 */}
        <input type="checkbox" checked={this.state.isChecked} onChange={this.handleChecked}/>
        <br/>
        <div>--------------------------------- 分割线 ----------------------------------------------</div> 

        {/* 多表单元素优化 使用同一个处理函数  */}
        <input type="text" name="txt" value={this.state.txt} onChange={this.handleChange}/>
        <br/>
        <textarea name="content" value={this.state.content} onChange={this.handleChange}></textarea>
        <br/>
        <select name="city" value={this.state.city} onChange={this.handleChange}>
          <option value="sh">上海</option>
          <option value="bj">北京</option>
          <option value="cq">重庆</option>
          <option value="tj">天津</option>
        </select>
        <br/>
        <input name="isChecked" type="checkbox" checked={this.state.isChecked} onChange={this.handleChange}/>
        <br/>
      </div>
    )
  }
}
// export default Form
/*
  非受控组件(不推荐)
*/

class App extends React.Component {
  constructor() {
    super()
    // 创建ref
    this.txtRef = React.createRef()
  }

  //获取文本框的值 
  getTxt = () => {
    console.log('文本框的值为：', this.txtRef.current.value)
  }

  render () {
    return (
      <div>
          <input type="text" ref={this.txtRef}/>
          <button onClick={this.getTxt}>获取文本框的值</button>
      </div>
    )
  }
}

export default App