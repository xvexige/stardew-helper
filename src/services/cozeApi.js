// Coze API 服务
// 从环境变量读取配置
const COZE_API_CONFIG = {
  endpoint: import.meta.env.VITE_COZE_API_ENDPOINT || 'https://api.coze.cn/open_api/v2/chat',
  apiKey: import.meta.env.VITE_COZE_API_KEY || '',
  botId: import.meta.env.VITE_COZE_BOT_ID || '',
  userId: import.meta.env.VITE_COZE_USER_ID || 'default_user'
}

// 检查配置是否完整
if (!COZE_API_CONFIG.apiKey || COZE_API_CONFIG.apiKey === 'YOUR_COZE_API_KEY') {
  console.warn('⚠️ Coze API Key 未配置，请在 .env 文件中设置 VITE_COZE_API_KEY')
}
if (!COZE_API_CONFIG.botId || COZE_API_CONFIG.botId === 'YOUR_COZE_BOT_ID') {
  console.warn('⚠️ Coze Bot ID 未配置，请在 .env 文件中设置 VITE_COZE_BOT_ID')
}

/**
 * 调用 Coze API 发送消息
 * @param {string} message - 用户消息
 * @param {string} conversationId - 对话ID（可选，不传则自动生成）
 * @returns {Promise<string>} - 助手回复
 */
export async function callCozeAPI(message, conversationId = null) {
  try {
    // 检查必要配置
    if (!COZE_API_CONFIG.apiKey || COZE_API_CONFIG.apiKey === 'YOUR_COZE_API_KEY') {
      throw new Error('Coze API Key 未配置，请在 .env 文件中设置 VITE_COZE_API_KEY')
    }
    if (!COZE_API_CONFIG.botId || COZE_API_CONFIG.botId === 'YOUR_COZE_BOT_ID') {
      throw new Error('Coze Bot ID 未配置，请在 .env 文件中设置 VITE_COZE_BOT_ID')
    }

    // 生成对话ID（如果未提供）
    const convId = conversationId || `conv_${Date.now()}`

    // 构建请求体
    const requestBody = {
      conversation_id: convId,
      bot_id: COZE_API_CONFIG.botId,
      user: COZE_API_CONFIG.userId,
      query: message,
      stream: false
    }

    const response = await fetch(COZE_API_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API请求失败: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    
    // 解析响应：查找 type === 'answer' 的消息
    if (data.messages) {
      const answer = data.messages.find(m => m.type === 'answer')
      if (answer && answer.content) {
        return answer.content
      }
    }
    
    // 如果没有找到答案，返回错误信息
    console.error('API响应格式异常:', data)
    return 'AI 接口返回格式异常，请查看控制台'
    
  } catch (error) {
    console.error('Coze API 调用失败:', error)
    throw error
  }
}

/**
 * 流式调用 Coze API（如果支持）
 * @param {string} message - 用户消息
 * @param {Function} onChunk - 接收数据块的回调函数
 * @param {string} conversationId - 对话ID（可选）
 */
export async function callCozeAPIStream(message, onChunk, conversationId = null) {
  try {
    // 检查必要配置
    if (!COZE_API_CONFIG.apiKey || COZE_API_CONFIG.apiKey === 'YOUR_COZE_API_KEY') {
      throw new Error('Coze API Key 未配置')
    }
    if (!COZE_API_CONFIG.botId || COZE_API_CONFIG.botId === 'YOUR_COZE_BOT_ID') {
      throw new Error('Coze Bot ID 未配置')
    }

    const convId = conversationId || `conv_${Date.now()}`

    const requestBody = {
      conversation_id: convId,
      bot_id: COZE_API_CONFIG.botId,
      user: COZE_API_CONFIG.userId,
      query: message,
      stream: true
    }

    const response = await fetch(COZE_API_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n').filter(line => line.trim())

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6))
            onChunk(data)
          } catch (e) {
            console.warn('解析流式数据失败:', e)
          }
        }
      }
    }
  } catch (error) {
    console.error('Coze API 流式调用失败:', error)
    throw error
  }
}

/**
 * 更新 API 配置
 * @param {Object} config - 新的配置
 */
export function updateCozeConfig(config) {
  Object.assign(COZE_API_CONFIG, config)
}

/**
 * 获取当前配置
 */
export function getCozeConfig() {
  return { ...COZE_API_CONFIG }
}

