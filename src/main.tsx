/**
 * React 应用入口文件
 * 负责将 React 应用挂载到 DOM 上
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

/**
 * 创建 React 根节点并渲染应用
 * - 使用 StrictMode 进行开发模式下的额外检查
 * - 将应用挂载到 id 为 'root' 的 DOM 元素上
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
