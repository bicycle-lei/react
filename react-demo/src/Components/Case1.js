import React from 'react'

class App extends React.Component {
  // 初始化状态
  state = {
    // 评论输入
    userName: '',
    userContent: '',
    // 评论列表
    comments: [
      {id: 1, name: 'jimmy', content: '加油 好好学习'},
      {id: 2, name: 'rose', content: '我想你了jack'},
      {id: 3, name: 'jack', content: 'rose 我来了'}
    ]
  }

  // 渲染评论列表
  renderList = () => {
    if (this.state.comments.length === 0) {
      return <div>暂无评论</div>
    }
    return (
      <ul>
       {
         this.state.comments.map(item => (
           <li key={item.id}>
             <h3>评论人(ID:{item.id})：{item.name} </h3>
             <p>评论内容：{item.content}</p>
           </li>
         ))
       }
     </ul>
    )
  }
  // 处理表单元素值 当前评论信息
  handleChange = e => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  } 

  // 发表评论
  addComment = () => {
    const {userName, userContent, comments} = this.state
    if (!userName) {
      alert('请输入评论人')
      return
    }
    if (!userContent) {
      alert('请输入评论内容')
      return
    }
    this.setState({
      comments: [...comments, {
        id: comments.length + 1,
        name: userName,
        content: userContent,
      }],
      userName: '',
      userContent: '',
    })
  }

  render () {
    const {userName, userContent} = this.state
    return (
      <div>
        <div>
           <input type="text" placeholder="请输入评论人" name="userName" value={userName} onChange={this.handleChange}/>
           <br/>
           <textarea placeholder="请输入评论内容" name="userContent" value={userContent} onChange={this.handleChange}></textarea>
           <br/>
           <button onClick={this.addComment}>发表评论</button>
        </div>  
        <div>
          {/* 渲染评论列表数据 */}
          {this.renderList()}
        </div>  
      </div>
    )
  }
}

export default App