/**
 * Vite 环境变量类型定义
 * 为 TypeScript 提供环境变量的类型支持
 */

/// <reference types="vite/client" />

/**
 * 扩展 ImportMetaEnv 接口
 * 定义项目中使用的环境变量类型
 */
interface ImportMetaEnv {
  /** GraphQL API 端点地址 */
  readonly VITE_API_ENDPOINT?: string
}

/**
 * 扩展 ImportMeta 接口
 * 使 import.meta.env 能够访问自定义环境变量
 */
interface ImportMeta {
  readonly env: ImportMetaEnv
}
