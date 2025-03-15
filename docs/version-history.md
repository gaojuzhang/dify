# 版本记录

本文档记录 Dify 平台的版本更新历史，包括功能增强、问题修复、数据库变更等信息，方便开发和运维团队进行版本发布和维护。

## 版本 prd_1.0.0_gaoju_20250308 (开发版本: dev_1.0.0_gaoju_20250308)

发布日期: 2025-03-08

### 功能增强

1. **Azure OpenAI API 基础 URL 验证**
   - 在前端添加了对 Azure OpenAI API 基础 URL 的格式验证
   - 确保用户输入的 API 基础 URL 包含 `https://` 前缀，避免连接错误
   - 修改文件:
     - `web/app/components/header/account-setting/model-provider-page/model-modal/Input.tsx`
     - `web/app/components/header/account-setting/model-provider-page/model-modal/Form.tsx`

### 未解决问题

1. **Azure OpenAI API 基础 URL 验证未生效**
   - 问题描述: 用户在保存 Azure OpenAI 模型配置时，如果 API 基础 URL 不包含 `https://` 前缀，会导致连接错误
   - 错误信息: `{"code": "invalid_param", "message": "Connection error.", "status": 400}`
   - 根本原因: API 基础 URL 格式不正确，缺少 `https://` 前缀
   - 验证结果: 经测试，输入不合法的 URL（如 "baidu.com"）时，没有显示任何验证提示
   - 代码分析:
     1. 之前的修改方案未生效，可能是因为:
        - 修改未正确应用到特定的 Azure OpenAI 表单字段
        - Input 组件的 isUrl 属性未被正确传递或处理
        - 验证逻辑未在正确的生命周期中触发
   
   - 详细修复方案:
     1. **修改 Form.tsx 文件**:
        ```typescript
        // 在 web/app/components/header/account-setting/model-provider-page/model-modal/Form.tsx 中
        
        // 1. 首先确保 Input 组件接收 isUrl 属性
        // 在 renderField 函数中找到处理 textInput 类型的部分
        
        if (formSchema.type === FormTypeEnum.textInput || formSchema.type === FormTypeEnum.secretInput || formSchema.type === FormTypeEnum.textNumber) {
          const {
            variable, label, placeholder, required, show_on,
          } = formSchema as (CredentialFormSchemaTextInput | CredentialFormSchemaSecretInput)
          
          // 添加这段代码来检测是否是 Azure OpenAI 的 API 基础 URL 字段
          const isApiBaseUrl = variable === 'openai_api_base' && 
                              (provider?.includes('azure_openai') || provider?.includes('azure-openai'));
          
          return (
            <div key={variable} className={cn(itemClassName, 'py-3')}>
              {/* ... 其他代码 ... */}
              <Input
                className={cn(inputClassName, `${disabled && 'cursor-not-allowed opacity-60'}`)}
                value={value[variable]}
                onChange={val => handleFormChange(variable, val)}
                validated={validatedSuccess}
                placeholder={placeholder?.[language] || placeholder?.en_US}
                disabled={disabled}
                type={formSchema.type === FormTypeEnum.textNumber ? 'number' : 'text'}
                isUrl={isApiBaseUrl} // 使用上面定义的变量
                {...(formSchema.type === FormTypeEnum.textNumber ? { min: (formSchema as CredentialFormSchemaNumberInput).min, max: (formSchema as CredentialFormSchemaNumberInput).max } : {})} />
              {/* ... 其他代码 ... */}
            </div>
          )
        }
        ```
        
     2. **修改 Input.tsx 文件**:
        ```typescript
        // 在 web/app/components/header/account-setting/model-provider-page/model-modal/Input.tsx 中
        
        // 1. 确保 isUrl 属性被正确定义和处理
        type InputProps = {
          value?: string
          onChange: (v: string) => void
          onFocus?: () => void
          placeholder?: string
          validated?: boolean
          className?: string
          disabled?: boolean
          type?: string
          min?: number
          max?: number
          isUrl?: boolean // 确保这个属性存在
        }
        
        // 2. 在组件中实现 URL 验证逻辑
        const Input: FC<InputProps> = ({
          value,
          onChange,
          onFocus,
          placeholder,
          validated,
          className,
          disabled,
          type = 'text',
          min,
          max,
          isUrl = false, // 设置默认值
        }) => {
          const [error, setError] = useState<string | null>(null)
          
          // 3. 实现 URL 验证函数
          const validateUrl = (url: string) => {
            if (isUrl && url && !url.startsWith('https://')) {
              setError('URL 必须以 https:// 开头')
              return false
            }
            setError(null)
            return true
          }
          
          // 4. 在值变化时调用验证
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value
            onChange(newValue)
            if (isUrl) {
              validateUrl(newValue)
            }
          }
          
          // 5. 在失去焦点时再次验证
          const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.value
            if (type === 'number') {
              toLimit(value)
            }
            if (isUrl && value) {
              validateUrl(value)
            }
          }
          
          // 6. 修改 render 函数，显示错误信息
          return (
            <div className='relative'>
              <input
                tabIndex={0}
                className={`
                  block px-3 w-full h-8 bg-components-input-bg-normal text-sm text-components-input-text-filled rounded-lg border ${error ? 'border-red-500' : 'border-transparent'}
                  appearance-none outline-none caret-primary-600
                  hover:border-components-input-border-hover hover:bg-components-input-bg-hover
                  focus:bg-components-input-bg-active focus:border-components-input-border-active focus:shadow-xs
                  placeholder:text-sm placeholder:text-text-tertiary
                  ${validated && 'pr-[30px]'}
                  ${className}
                `}
                placeholder={placeholder || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={onFocus}
                value={value}
                disabled={disabled}
                type={type}
                min={min}
                max={max}
              />
              {validated && (
                <div className='absolute top-2.5 right-2.5'>
                  <CheckCircle className='w-4 h-4 text-[#039855]' />
                </div>
              )}
              {error && (
                <div className='absolute top-9 left-0 text-xs text-red-500 flex items-center'>
                  <AlertTriangle className='w-3 h-3 mr-1' />
                  {error}
                </div>
              )}
            </div>
          )
        }
        ```
        
     3. **调试步骤**:
        1. 在修改代码后，添加 `console.log` 语句来确认:
           - `isApiBaseUrl` 变量是否正确识别 Azure OpenAI 的 API 基础 URL 字段
           - `isUrl` 属性是否正确传递给 Input 组件
           - `validateUrl` 函数是否被调用，以及其返回值
        
        2. 使用浏览器开发者工具检查:
           - 是否有 JavaScript 错误
           - Input 组件是否正确渲染，包括错误提示元素
           - CSS 样式是否正确应用，错误提示是否可见

### 临时解决方案

在前端验证功能完全实现之前，用户可以采取以下临时解决方案：

1. 手动确保在输入 Azure OpenAI API 基础 URL 时始终包含 `https://` 前缀
2. 在配置文档中添加明确的提示，告知用户 API 基础 URL 必须以 `https://` 开头
3. 添加一个配置检查脚本，定期扫描并修复不正确的 URL 格式:
   ```python
   # 示例脚本: check_azure_urls.py
   import json
   import requests
   
   def fix_azure_urls():
       # 获取所有 Azure OpenAI 配置
       configs = get_all_azure_openai_configs()
       
       for config in configs:
           api_base = config.get('openai_api_base', '')
           if api_base and not api_base.startswith('https://'):
               # 修复 URL 格式
               config['openai_api_base'] = f"https://{api_base}"
               # 更新配置
               update_config(config)
               print(f"Fixed URL format for config {config['id']}: {api_base} -> {config['openai_api_base']}")
   
   if __name__ == "__main__":
       fix_azure_urls()
   ```

### 数据库变更

本版本没有数据库结构变更。

### 部署注意事项

#### 方法一: 直接在宿主机上构建

1. 确保安装 pnpm 包管理器:
   ```bash
   # 使用 npm 安装 pnpm
   npm install -g pnpm
   
   # 或者使用 Homebrew (macOS)
   brew install pnpm
   
   # 或者使用 curl (Linux/macOS)
   curl -fsSL https://get.pnpm.io/install.sh | sh -
   ```

2. 更新前端代码后需要重新构建前端资源:
   ```bash
   cd web
   pnpm install  # 确保依赖已安装
   pnpm build
   ```

3. 重启服务:
   ```bash
   cd docker
   docker compose down
   docker compose up -d
   ```

#### 方法二: 使用 Docker 构建

如果您使用的是 Docker 部署环境，可以使用以下方法重新构建前端镜像:

1. 在项目根目录下执行:
   ```bash
   cd docker
   docker compose build web
   docker compose up -d
   ```

这将使用 Dockerfile 中定义的构建过程重新构建前端镜像，无需在宿主机上安装 pnpm。

#### 验证部署

构建过程中的警告信息（如 DB_USERNAME、DB_PASSWORD 等未设置）是正常的，不影响构建结果。要验证前端验证功能是否生效，请按照以下步骤操作：

1. 确保服务已成功启动:
   ```bash
   docker compose ps
   ```

2. 访问 Dify 平台，进入模型提供商配置页面
   
3. 尝试添加 Azure OpenAI 模型，在 API 基础 URL 字段中输入不包含 `https://` 前缀的 URL（例如 `chat100.openai.azure.com`）

4. 如果前端验证生效，应该会在输入框下方显示错误提示，提示 URL 必须以 `https://` 开头
   
5. 如果没有显示错误提示，则说明前端验证未生效，需要进一步检查代码实现

### 回滚计划

如需回滚，可以恢复到上一个版本的代码，并重新构建前端资源。由于本次更新不涉及数据库变更，不需要执行数据库回滚操作。 