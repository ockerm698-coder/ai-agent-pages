/**
 * 消息输入组件
 * 提供用户输入消息的文本框和发送按钮
 */

import { useState, KeyboardEvent } from 'react'
import './MessageInput.css'

/**
 * MessageInput 组件属性接口
 */
interface MessageInputProps {
  /** 发送消息的回调函数 */
  onSendMessage: (content: string) => void
  /** 是否禁用输入（等待 AI 回复时禁用） */
  disabled?: boolean
}

/**
 * MessageInput 组件
 * 多行文本输入框，支持键盘快捷键
 *
 * 快捷键：
 * - Enter: 发送消息
 * - Shift + Enter: 换行
 *
 * @param props - 组件属性
 * @returns React 组件
 */
function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  /** 输入框内容状态 */
  const [input, setInput] = useState('')

  /**
   * 处理发送消息
   * 仅在输入不为空且未禁用时发送
   */
  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  /**
   * 处理键盘按键事件
   * Enter 键发送消息，Shift+Enter 换行
   *
   * @param e - 键盘事件对象
   */
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="message-input">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="输入消息... (Enter 发送, Shift+Enter 换行)"
        disabled={disabled}
        rows={3}
      />
      <button onClick={handleSend} disabled={disabled || !input.trim()}>
        发送
      </button>
    </div>
  )
}

export default MessageInput
