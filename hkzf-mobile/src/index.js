import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 导入antd-mobile的样式
import 'antd-mobile/dist/antd-mobile.css'

// 导入自己的样式
import './index.css';

// 导入字体图标库
import './assets/fonts/iconfont.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
