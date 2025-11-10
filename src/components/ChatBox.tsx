/**
 * 聊天框组件
 * 整合消息列表和输入框，管理聊天状态和 AI 交互逻辑
 */

import { useState } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { Message } from '../types/message'
import { sendChatMessage, ChatMessage as ApiChatMessage } from '../services/chatApi'
import './ChatBox.css'

/**
 * ChatBox 组件
 * 主聊天界面，负责：
 * - 管理消息历史状态
 * - 处理用户输入和 AI 响应
 * - 错误处理和加载状态管理
 *
 * @returns React 组件
 */
function ChatBox() {
  /** 消息历史状态 */
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是 AI 助手，有什么可以帮助你的吗？',
      role: 'assistant',
      timestamp: new Date(),
    },
  ])

  /** 加载状态，表示是否正在等待 AI 回复 */
  const [isLoading, setIsLoading] = useState(false)

  /**
   * 处理发送消息事件
   * 将用户消息添加到历史，调用 AI API 获取回复
   *
   * @param content - 用户输入的消息内容
   */
  const handleSendMessage = async (content: string) => {
    // 创建用户消息对象
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    }

    // 添加用户消息到历史
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      /**
       * 构建消息历史
       * 将界面的 Message 类型转换为 API 所需的 ChatMessage 类型
       */
      const chatHistory: ApiChatMessage[] = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content,
      }))

      /**
       * 调用后端 AI API
       * 发送完整的消息历史以保持对话上下文
       */
      const response = await sendChatMessage({
        messages: chatHistory,
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 1000,
      })

      // 创建 AI 回复消息对象
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.message.content,
        role: 'assistant',
        timestamp: new Date(),
      }

      // 添加 AI 回复到历史
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      // 记录错误到控制台
      console.error('Failed to get AI response:', error)

      /**
       * 创建错误提示消息
       * 以 AI 助手的身份显示错误信息给用户
       */
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `抱歉，发生了错误: ${error instanceof Error ? error.message : '未知错误'}。请检查 API 配置或稍后重试。`,
        role: 'assistant',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      // 无论成功或失败，都要取消加载状态
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h1>AI Chat Assistant</h1>
        <p>智能对话助手</p>
      </div>
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  )
}

export default ChatBox
