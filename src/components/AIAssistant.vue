<script setup>
import { ref, computed, nextTick, onUnmounted, watch } from 'vue'
import { callCozeAPI } from '../services/cozeApi'
import { marked } from 'marked'

const props = defineProps(['isOpen'])
const emit = defineEmits(['close'])

// 组件卸载或关闭时停止语音识别
onUnmounted(() => {
  if (recognition.value && isRecording.value) {
    recognition.value.stop()
    isRecording.value = false
  }
})

// 监听弹窗关闭，停止录音
watch(() => props.isOpen, (newVal) => {
  if (!newVal && recognition.value && isRecording.value) {
    recognition.value.stop()
    isRecording.value = false
  }
})

// 消息列表
const messages = ref([
  {
    id: 1,
    type: 'assistant',
    content: '你好！我是星露谷智能助手，可以帮你解答游戏相关问题。比如：\n• 作物种植时间\n• 酿酒配方\n• NPC礼物推荐\n• 献祭物品收集\n• 营业时间查询\n\n有什么问题尽管问我吧！',
    timestamp: new Date()
  }
])

// 输入内容
const inputText = ref('')
const isLoading = ref(false)
const conversationId = ref(null) // 对话ID，用于保持对话上下文

// 语音输入相关
const inputMode = ref('text') // 'text' 或 'voice'
const isRecording = ref(false)
const recognition = ref(null)
const isSpeechSupported = ref(false)

// 检查浏览器是否支持语音识别
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  isSpeechSupported.value = true
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  recognition.value = new SpeechRecognition()
  recognition.value.lang = 'zh-CN' // 设置为中文
  recognition.value.continuous = false // 不连续识别
  recognition.value.interimResults = false // 不返回临时结果
  
  recognition.value.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    inputText.value = transcript
    isRecording.value = false
    // 语音识别完成后，可以选择自动发送或手动发送
    // 这里设置为手动发送，用户确认后再发送
  }
  
  recognition.value.onerror = (event) => {
    console.error('语音识别错误:', event.error)
    isRecording.value = false
    alert(`语音识别失败: ${event.error}`)
  }
  
  recognition.value.onend = () => {
    isRecording.value = false
  }
}

// 滚动到底部
const messagesEnd = ref(null)
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesEnd.value) {
      messagesEnd.value.scrollIntoView({ behavior: 'smooth' })
    }
  })
}

// 发送消息
const sendMessage = async () => {
  if (!inputText.value.trim() || isLoading.value) return

  const userMessage = {
    id: Date.now(),
    type: 'user',
    content: inputText.value.trim(),
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  const question = inputText.value.trim()
  inputText.value = ''
  isLoading.value = true

  // 滚动到底部
  scrollToBottom()

  // 调用 Coze API
  try {
    // 如果是第一次对话，生成新的对话ID
    if (!conversationId.value) {
      conversationId.value = `conv_${Date.now()}`
    }

    const answer = await callCozeAPI(question, conversationId.value)
    
    const assistantMessage = {
      id: Date.now() + 1,
      type: 'assistant',
      content: answer,
      timestamp: new Date()
    }
    messages.value.push(assistantMessage)
  } catch (error) {
    console.error('API调用失败:', error)
    const errorMessage = error.message || '服务暂时不可用，请稍后再试。'
    const assistantMessage = {
      id: Date.now() + 1,
      type: 'assistant',
      content: `抱歉，${errorMessage}\n\n提示：请检查 .env 文件中的 Coze API 配置是否正确。`,
      timestamp: new Date()
    }
    messages.value.push(assistantMessage)
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

// 快速问题
const quickQuestions = [
  '春季种什么作物最赚钱？',
  '草莓什么时候可以买？',
  '如何快速提升NPC好感度？',
  '献祭包需要哪些物品？',
  '今天哪些商店营业？'
]

const selectQuickQuestion = (question) => {
  inputText.value = question
  sendMessage()
}

// 格式化时间
const formatTime = (date) => {
  return date.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// 渲染 Markdown 为 HTML
const renderMarkdown = (text) => {
  if (!text) return ''
  try {
    // 配置 marked 选项
    marked.setOptions({
      breaks: true, // 支持换行
      gfm: true, // 支持 GitHub Flavored Markdown
    })
    return marked.parse(text)
  } catch (error) {
    console.error('Markdown 渲染失败:', error)
    return text // 如果渲染失败，返回原始文本
  }
}

// 清空对话
const clearChat = () => {
  if (confirm('确定要清空对话记录吗？')) {
    messages.value = [{
      id: 1,
      type: 'assistant',
      content: '对话已清空，有什么新问题吗？',
      timestamp: new Date()
    }]
    // 重置对话ID，开始新的对话
    conversationId.value = null
  }
}

// 切换输入模式
const toggleInputMode = () => {
  if (inputMode.value === 'voice' && isRecording.value) {
    stopRecording()
  }
  inputMode.value = inputMode.value === 'text' ? 'voice' : 'text'
}

// 开始语音输入
const startRecording = () => {
  if (!isSpeechSupported.value) {
    alert('您的浏览器不支持语音识别功能')
    return
  }
  
  if (recognition.value) {
    try {
      recognition.value.start()
      isRecording.value = true
    } catch (error) {
      console.error('启动语音识别失败:', error)
      isRecording.value = false
    }
  }
}

// 停止语音输入
const stopRecording = () => {
  if (recognition.value && isRecording.value) {
    recognition.value.stop()
    isRecording.value = false
  }
}

// 处理语音输入按钮（按下开始，松开停止）
const handleVoiceButtonDown = () => {
  if (inputMode.value === 'voice') {
    startRecording()
  }
}

const handleVoiceButtonUp = () => {
  if (inputMode.value === 'voice' && isRecording.value) {
    stopRecording()
  }
}
</script>

<template>
  <div class="sv-card h-full flex flex-col">
    <!-- 标题栏 -->
    <div class="flex justify-between items-center mb-4 pb-3 border-b-2 border-sv-border">
      <div class="flex items-center gap-2">
        <span class="text-2xl">🤖</span>
        <h2 class="sv-title text-xl mb-0">智能助手</h2>
      </div>
      <div class="flex gap-2">
        <button 
          @click="clearChat"
          class="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
          title="清空对话"
        >
          清空
        </button>
        <button 
          @click="emit('close')"
          class="text-xl text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>

    <!-- 消息列表 -->
    <div class="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
      <div 
        v-for="message in messages" 
        :key="message.id"
        class="flex"
        :class="message.type === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div 
          class="max-w-[80%] rounded-lg p-3"
          :class="message.type === 'user' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-800 border border-gray-300'"
        >
          <!-- 用户消息：纯文本显示 -->
          <div v-if="message.type === 'user'" class="whitespace-pre-wrap text-sm">{{ message.content }}</div>
          <!-- AI消息：Markdown渲染 -->
          <div 
            v-else
            class="text-sm markdown-content"
            v-html="renderMarkdown(message.content)"
          ></div>
          <div 
            class="text-xs mt-1 opacity-70"
            :class="message.type === 'user' ? 'text-blue-100' : 'text-gray-500'"
          >
            {{ formatTime(message.timestamp) }}
          </div>
        </div>
      </div>

      <!-- 加载中提示 -->
      <div v-if="isLoading" class="flex justify-start">
        <div class="bg-gray-100 border border-gray-300 rounded-lg p-3">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <span class="animate-pulse">●</span>
            <span>正在思考中...</span>
          </div>
        </div>
      </div>

      <div ref="messagesEnd"></div>
    </div>

    <!-- 快速问题 -->
    <div v-if="messages.length <= 1" class="mb-4">
      <div class="text-xs text-gray-600 mb-2">💡 快速问题：</div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(question, idx) in quickQuestions"
          :key="idx"
          @click="selectQuickQuestion(question)"
          class="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded text-xs text-blue-700 transition-colors"
        >
          {{ question }}
        </button>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="border-t-2 border-sv-border pt-3">
      <!-- 输入模式切换 -->
      <div class="flex justify-center mb-2">
        <div class="flex bg-gray-100 rounded-lg p-1">
          <button
            @click="inputMode = 'text'"
            :class="inputMode === 'text' 
              ? 'bg-white text-sv-border shadow-sm' 
              : 'text-gray-600'"
            class="px-4 py-1.5 rounded text-sm font-medium transition-all"
          >
            ⌨️ 打字
          </button>
          <button
            @click="inputMode = 'voice'"
            :class="inputMode === 'voice' 
              ? 'bg-white text-sv-border shadow-sm' 
              : 'text-gray-600'"
            class="px-4 py-1.5 rounded text-sm font-medium transition-all"
            :disabled="!isSpeechSupported"
          >
            🎤 语音
          </button>
        </div>
      </div>

      <!-- 文字输入模式 -->
      <div v-if="inputMode === 'text'" class="flex gap-2">
        <input
          v-model="inputText"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="输入你的问题..."
          class="flex-1 border-2 border-sv-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          :disabled="isLoading"
        />
        <button
          @click="sendMessage"
          :disabled="!inputText.trim() || isLoading"
          class="sv-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? '发送中...' : '发送' }}
        </button>
      </div>

      <!-- 语音输入模式 -->
      <div v-else class="space-y-2">
        <div class="flex items-center justify-center gap-3">
          <!-- 语音输入按钮 -->
          <button
            @mousedown="handleVoiceButtonDown"
            @mouseup="handleVoiceButtonUp"
            @mouseleave="handleVoiceButtonUp"
            @touchstart="handleVoiceButtonDown"
            @touchend="handleVoiceButtonUp"
            :class="isRecording 
              ? 'bg-red-500 animate-pulse' 
              : 'bg-blue-500 hover:bg-blue-600'"
            class="w-16 h-16 rounded-full text-white text-2xl flex items-center justify-center transition-all shadow-lg"
            :disabled="!isSpeechSupported || isLoading"
          >
            {{ isRecording ? '⏹️' : '🎤' }}
          </button>
          
          <!-- 显示识别到的文字 -->
          <div v-if="inputText" class="flex-1 border-2 border-sv-border rounded px-3 py-2 text-sm bg-gray-50">
            {{ inputText }}
          </div>
        </div>
        
        <!-- 语音状态提示 -->
        <div class="text-center">
          <div v-if="isRecording" class="text-red-500 text-sm font-semibold animate-pulse">
            🎤 正在录音中，松开停止...
          </div>
          <div v-else-if="inputText" class="text-sm text-gray-600">
            识别完成，点击发送按钮发送
            <button
              @click="sendMessage"
              :disabled="isLoading"
              class="ml-2 sv-button px-3 py-1 text-xs"
            >
              {{ isLoading ? '发送中...' : '发送' }}
            </button>
          </div>
          <div v-else class="text-xs text-gray-500">
            {{ isSpeechSupported ? '按住麦克风按钮开始说话' : '您的浏览器不支持语音识别' }}
          </div>
        </div>
      </div>

      <!-- 提示信息 -->
      <div v-if="inputMode === 'text'" class="text-xs text-gray-500 mt-2">
        💡 提示：按 Enter 键快速发送
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Markdown 样式 */
.markdown-content {
  line-height: 1.6;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.markdown-content :deep(h1) { font-size: 1.5em; }
.markdown-content :deep(h2) { font-size: 1.3em; }
.markdown-content :deep(h3) { font-size: 1.1em; }

.markdown-content :deep(p) {
  margin: 0.5em 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

.markdown-content :deep(li) {
  margin: 0.25em 0;
}

.markdown-content :deep(code) {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1em;
  border-radius: 5px;
  overflow-x: auto;
  margin: 0.5em 0;
}

.markdown-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.markdown-content :deep(blockquote) {
  border-left: 3px solid rgba(0, 0, 0, 0.2);
  padding-left: 1em;
  margin: 0.5em 0;
  color: rgba(0, 0, 0, 0.7);
}

.markdown-content :deep(strong) {
  font-weight: bold;
}

.markdown-content :deep(em) {
  font-style: italic;
}

.markdown-content :deep(a) {
  color: #2563eb;
  text-decoration: underline;
}

.markdown-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 0.5em 0;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.5em;
  text-align: left;
}

.markdown-content :deep(th) {
  background-color: rgba(0, 0, 0, 0.1);
  font-weight: bold;
}

.markdown-content :deep(hr) {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  margin: 1em 0;
}
</style>

