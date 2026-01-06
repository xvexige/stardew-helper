# Coze API 配置说明

## 使用步骤

1. 复制 `.env.example` 文件为 `.env`：
```bash
cp .env.example .env
```

2. 打开 `.env` 文件，填写你的 Coze API 信息：
```env
VITE_COZE_API_ENDPOINT=https://api.coze.cn/open_api/v2/chat
VITE_COZE_API_KEY=你的实际API密钥
VITE_COZE_BOT_ID=你的机器人ID（必填）
VITE_COZE_USER_ID=default_user（或你的用户ID）
```

**重要配置说明：**
- `VITE_COZE_API_ENDPOINT`: Coze API 端点（默认已配置）
- `VITE_COZE_API_KEY`: 你的 Coze API Key（必填）
- `VITE_COZE_BOT_ID`: 你的机器人 ID（必填）
- `VITE_COZE_USER_ID`: 用户标识（可选，默认为 default_user）

3. 重启开发服务器（如果正在运行）：
```bash
npm run dev
```

4. 根据 Coze API 文档调整请求格式：
   - 检查 API 端点 URL
   - 确认请求头格式
   - 确认请求体格式
   - 确认响应数据格式

4. 在 `callCozeAPI` 函数中根据实际 API 响应格式解析数据：
```javascript
// 根据 Coze API 的实际返回格式调整
return data.answer || data.content || data.message || '抱歉，无法获取回复。'
```

## API 调用示例

当前实现支持：
- 普通 API 调用（`callCozeAPI`）
- 流式 API 调用（`callCozeAPIStream`，如果 Coze 支持）

## 注意事项

- API Key 应该存储在环境变量中，不要直接写在代码里
- 建议使用 `.env` 文件管理敏感信息
- 确保 API 端点支持 CORS（如果从浏览器直接调用）

