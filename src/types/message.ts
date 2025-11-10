/**
 * 消息类型定义
 * 用于聊天界面中的消息数据结构
 */

/**
 * 消息接口
 * 表示聊天对话中的单条消息
 */
export interface Message {
  /** 消息唯一标识符 */
  id: string;
  /** 消息文本内容 */
  content: string;
  /** 消息角色：用户或 AI 助手 */
  role: 'user' | 'assistant';
  /** 消息发送时间戳 */
  timestamp: Date;
}
