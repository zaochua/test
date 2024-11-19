import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Board.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


//关闭严格模式，解决每次组件执行两次
//严格模式更方便我们检查
/*
ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
*/
