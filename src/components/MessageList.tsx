/**
 * 消息列表组件
 * 显示聊天对话的消息历史，支持自动滚动和加载状态
 */

import { useEffect, useRef } from 'react'
import { Message } from '../types/message'
import './MessageList.css'

/**
 * MessageList 组件属性接口
 */
interface MessageListProps {
  /** 消息列表数组 */
  messages: Message[]
  /** 是否正在加载（等待 AI 回复） */
  isLoading: boolean
}

/**
 * MessageList 组件
 * 渲染聊天消息列表，包括用户消息和 AI 回复
 *
 * @param props - 组件属性
 * @returns React 组件
 */
function MessageList({ messages, isLoading }: MessageListProps) {
  /** 用于定位到消息列表底部的引用 */
  const messagesEndRef = useRef<HTMLDivElement>(null)

  /**
   * 滚动到消息列表底部
   * 使用平滑滚动效果
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  /**
   * 当消息列表更新时，自动滚动到底部
   */
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  /**
   * 格式化时间戳为可读的时间字符串
   * @param date - 时间戳
   * @returns 格式化的时间字符串（如："14:30"）
   */
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
        >
          <div className="message-avatar">
            {message.role === 'user' ? '👤' : '🤖'}
          </div>
          <div className="message-content">
            <div className="message-text">{message.content}</div>
            <div className="message-time">{formatTime(message.timestamp)}</div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="message assistant-message">
          <div className="message-avatar">🤖</div>
          <div className="message-content">
            <div className="message-text loading">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList
