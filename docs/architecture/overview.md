# Dify 系统架构概述

## 1. 系统组件

Dify 是一个 LLMOps 平台，主要由以下组件构成：

### 1.1 后端服务 (API)
- 核心服务层 (`api/core/`): 实现核心业务逻辑
- 控制器层 (`api/controllers/`): 处理 HTTP 请求
- 服务层 (`api/services/`): 提供业务服务
- 模型层 (`api/models/`): 数据模型定义
- 任务系统 (`api/tasks/`): 异步任务处理
- 扩展系统 (`api/extensions/`): 系统扩展功能
- 配置管理 (`api/configs/`): 系统配置
- 工厂类 (`api/factories/`): 对象创建工厂
- 数据库迁移 (`api/migrations/`): 数据库版本管理

### 1.2 前端应用 (Web)
- 页面组件 (`web/app/`): Next.js 页面组件
- 工具函数 (`web/utils/`): 通用工具
- 服务层 (`web/service/`): API 调用封装
- 类型定义 (`web/types/`): TypeScript 类型
- 状态管理 (`web/context/`): React Context
- 国际化 (`web/i18n/`): 多语言支持
- 主题系统 (`web/themes/`): UI 主题
- 公共资源 (`web/public/`): 静态资源

### 1.3 Docker 部署
- API Docker 配置 (`api/docker/`)
- Web Docker 配置 (`web/docker/`)
- Docker Compose 配置 (`docker/`)

## 2. 技术栈

### 2.1 后端
- Python
- Flask
- SQLAlchemy
- Celery
- PostgreSQL (含 pgvector 扩展)
- Redis

### 2.2 前端
- Next.js
- React
- TypeScript
- TailwindCSS

### 2.3 部署
- Docker
- Docker Compose

## 3. 系统特点

### 3.1 模块化设计
- 清晰的目录结构
- 组件化的代码组织
- 可扩展的架构

### 3.2 开发友好
- 完整的开发工具配置
- 代码质量保证工具
- 完善的测试框架

### 3.3 国际化支持
- 多语言界面
- 时区配置
- 本地化适配

### 3.4 安全性
- 环境变量配置
- Docker 容器隔离
- 权限管理

## 4. 开发流程

### 4.1 本地开发
1. 配置开发环境
2. 启动所需服务
3. 运行开发服务器

### 4.2 测试
- 单元测试
- 集成测试
- E2E 测试

### 4.3 部署
- Docker 构建
- 环境配置
- 服务编排 