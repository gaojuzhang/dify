# Dify 部署指南

## 1. 系统要求

### 1.1 硬件要求
- CPU: 4核或更多
- 内存: 16GB或更多
- 存储: 100GB或更多

### 1.2 软件要求
- Docker 20.10+
- Docker Compose 2.0+
- PostgreSQL 14+
- Redis 6.0+
- Python 3.10+
- Node.js 18+

## 2. 部署方式

### 2.1 Docker 部署
1. 克隆代码仓库
```bash
git clone https://github.com/langgenius/dify.git
cd dify
```

2. 配置环境变量
```bash
cp .env.example .env
```

3. 修改配置
- 数据库配置
- Redis配置
- 向量数据库配置
- API密钥配置

4. 启动服务
```bash
docker compose up -d
```

### 2.2 手动部署

#### 2.2.1 后端部署
1. 安装依赖
```bash
cd api
pip install -r requirements.txt
```

2. 配置环境
```bash
cp .env.example .env
```

3. 初始化数据库
```bash
flask db upgrade
```

4. 启动服务
```bash
gunicorn -c gunicorn.conf.py app:app
```

#### 2.2.2 前端部署
1. 安装依赖
```bash
cd web
pnpm install
```

2. 构建
```bash
pnpm build
```

3. 启动服务
```bash
pnpm start
```

## 3. 配置说明

### 3.1 环境变量
- `POSTGRES_HOST`: 数据库地址
- `POSTGRES_PORT`: 数据库端口
- `POSTGRES_DB`: 数据库名
- `POSTGRES_USER`: 数据库用户
- `POSTGRES_PASSWORD`: 数据库密码
- `REDIS_HOST`: Redis地址
- `REDIS_PORT`: Redis端口
- `REDIS_PASSWORD`: Redis密码
- `VECTOR_STORE`: 向量数据库类型
- `API_KEY`: API密钥

### 3.2 数据库配置
- 创建数据库
- 配置用户权限
- 启用pgvector扩展

### 3.3 Redis配置
- 内存设置
- 持久化配置
- 密码设置

## 4. 安全配置

### 4.1 网络安全
- 配置防火墙
- 设置反向代理
- SSL证书配置

### 4.2 访问控制
- API认证
- 用户权限
- 资源限制

### 4.3 数据安全
- 数据备份
- 加密配置
- 日志管理

## 5. 监控和维护

### 5.1 系统监控
- 服务状态
- 资源使用
- 性能指标

### 5.2 日志管理
- 日志收集
- 日志分析
- 告警配置

### 5.3 备份策略
- 数据备份
- 配置备份
- 恢复流程

## 6. 扩展配置

### 6.1 负载均衡
- Nginx配置
- 服务扩展
- 会话管理

### 6.2 缓存优化
- Redis集群
- 缓存策略
- 失效管理

### 6.3 存储优化
- 文件存储
- 数据库优化
- 索引管理

## 7. 故障排除

### 7.1 常见问题
- 服务无法启动
- 连接超时
- 内存溢出

### 7.2 诊断工具
- 日志查看
- 性能分析
- 网络诊断

### 7.3 解决方案
- 重启服务
- 清理缓存
- 配置调优

## 8. 升级指南

### 8.1 版本升级
1. 备份数据
2. 更新代码
3. 迁移数据
4. 重启服务

### 8.2 回滚流程
1. 停止服务
2. 恢复备份
3. 启动服务
4. 验证系统

### 8.3 注意事项
- 兼容性检查
- 数据备份
- 服务影响 