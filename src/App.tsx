/**
 * 应用主组件
 * AI 聊天助手的根组件，负责整体布局和组件组合
 */

import ChatBox from './components/ChatBox'
import './App.css'

/**
 * App 组件
 * 应用的顶层组件，包含整个聊天界面
 * @returns React 组件
 */
function App() {
  return (
    <div className="app">
      <ChatBox />
    </div>
  )
}

export default App
