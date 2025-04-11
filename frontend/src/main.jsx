import React from 'react';
// 引入 ReactDOM
import ReactDOM from 'react-dom';
import App from './App.jsx';

const rootElement = document.getElementById('root');
console.log({ rootElement });

// 修改为使用 ReactDOM.render
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
