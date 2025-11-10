/**
 * Chat API 服务
 * 封装与后端 GraphQL API 的通信逻辑
 *
 * 主要功能：
 * - 发送聊天消息到 AI 后端
 * - 获取可用的 AI 模型列表
 * - 支持自定义 API 端点配置
 */

/**
 * GraphQL API 端点配置
 * 从环境变量读取，如未设置则使用默认的本地开发地址
 */
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8787/graphql';

/**
 * 聊天消息接口
 * 用于 API 请求的消息格式
 */
export interface ChatMessage {
  /** 消息角色：系统、用户或助手 */
  role: 'system' | 'user' | 'assistant';
  /** 消息内容 */
  content: string;
}

/**
 * 聊天输入参数接口
 * 定义发送给 API 的请求参数
 */
export interface ChatInput {
  /** 消息历史列表 */
  messages: ChatMessage[];
  /** 使用的 AI 模型（可选） */
  model?: string;
  /** 温度参数，控制输出的随机性（0-2） */
  temperature?: number;
  /** 最大生成的 token 数量 */
  maxTokens?: number;
}

/**
 * 聊天响应接口
 * 定义 API 返回的响应数据结构
 */
export interface ChatResponse {
  /** AI 生成的消息 */
  message: ChatMessage;
  /** 实际使用的模型名称 */
  model: string;
  /** Token 使用统计（可选） */
  usage?: {
    /** 提示词消耗的 token 数量 */
    promptTokens: number;
    /** 补全内容消耗的 token 数量 */
    completionTokens: number;
    /** 总共消耗的 token 数量 */
    totalTokens: number;
  };
}

/**
 * 发送聊天消息
 * 通过 GraphQL 调用后端 chat mutation，获取 AI 回复
 *
 * @param input - 聊天输入参数，包含消息历史和配置
 * @returns 返回 AI 生成的聊天响应
 * @throws 如果网络请求失败或 API 返回错误
 *
 * @example
 * ```typescript
 * const response = await sendChatMessage({
 *   messages: [{ role: 'user', content: '你好' }],
 *   model: 'gpt-3.5-turbo',
 *   temperature: 0.7,
 *   maxTokens: 1000
 * });
 * console.log(response.message.content);
 * ```
 */
export async function sendChatMessage(input: ChatInput): Promise<ChatResponse> {
  const query = `
    mutation Chat($input: ChatInput!) {
      chat(input: $input) {
        message {
          role
          content
        }
        model
        usage {
          promptTokens
          completionTokens
          totalTokens
        }
      }
    }
  `;

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { input },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0]?.message || 'GraphQL error');
    }

    return result.data.chat;
  } catch (error) {
    console.error('Chat API Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to send chat message'
    );
  }
}

/**
 * 获取可用模型列表
 * 从后端 API 查询所有可用的 AI 模型信息
 *
 * @returns 返回模型列表数组
 * @throws 如果网络请求失败或 API 返回错误
 *
 * @example
 * ```typescript
 * const models = await getModels();
 * console.log('可用模型:', models);
 * ```
 */
export async function getModels(): Promise<any[]> {
  const query = `
    query GetModels {
      models {
        id
        object
        created
        ownedBy
      }
    }
  `;

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0]?.message || 'GraphQL error');
    }

    return result.data.models;
  } catch (error) {
    console.error('Get Models Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to get models'
    );
  }
}
