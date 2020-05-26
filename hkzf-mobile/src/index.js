import React from 'react';
import ReactDOM from 'react-dom';

// 导入antd-mobile的样式
import 'antd-mobile/dist/antd-mobile.css'

// 组件导入 放入组件样式后面
import App from './App';



// 导入自己的样式
import './index.css';

// 导入字体图标库
import './assets/fonts/iconfont.css'

import 'react-virtualized/styles.css'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
