<script setup>
import { ref, computed } from 'vue'
import BusinessStatus from './components/BusinessStatus.vue'
import GameCalendar from './components/GameCalendar.vue'
import RoutePlanner from './components/RoutePlanner.vue'
import AddPlan from './components/AddPlan.vue'
import QuickTools from './components/QuickTools.vue'
import AIAssistant from './components/AIAssistant.vue'
import { planner } from './data/plannerData'

import { getWeatherOptions, getSpecialWeather } from './data/weather'

// 1. 定义核心状态
const currentDay = ref(15) // 默认选中的日期
const currentSeason = ref('春')
const currentWeather = ref('晴天') // 当前天气
const showQuickTools = ref(false) // 快捷功能区显示状态
const showAddPlanModal = ref(false) // 显示添加计划弹窗
const addPlanType = ref('harvest') // 添加计划类型：harvest 或 wine
const showAIAssistant = ref(false) // 显示智能助手

// 获取当前季节可用的天气选项
const availableWeathers = computed(() => {
  return getWeatherOptions(currentSeason.value)
})

// 获取今日特殊天气
const todaySpecialWeather = computed(() => {
  return getSpecialWeather(currentSeason.value, currentDay.value)
})

// 2. 派生计算属性 (让顶部状态栏跟随 currentDay 变化)
const weekday = computed(() => {
  const days = ['一', '二', '三', '四', '五', '六', '日']
  return days[(currentDay.value - 1) % 7]
})

// 3. 事件处理：点击日历切换日期
const changeDay = (day) => {
  currentDay.value = day
}

// 季节切换
const seasons = ['春', '夏', '秋', '冬']
const changeSeason = (season) => {
  // 如果切换到新季节，清除上一个季节的所有任务（作物枯萎）
  if (season !== currentSeason.value) {
    const previousSeason = currentSeason.value
    planner.removeTasksBySeason(previousSeason)
  }
  
  currentSeason.value = season
  currentDay.value = 1 // 切换季节时重置到第1天
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-4 space-y-6 min-h-screen">
    <!-- 顶部导航区 -->
    <header class="sv-card">
      <div class="flex flex-wrap justify-between items-center gap-4">
        <div class="flex flex-wrap gap-4 items-baseline">
          <!-- 季节选择 -->
          <div class="flex gap-2">
            <button
              v-for="s in seasons"
              :key="s"
              @click="changeSeason(s)"
              :class="currentSeason === s ? 'sv-button' : 'bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm'"
            >
              {{ s }}季
            </button>
          </div>
          
          <div class="text-2xl font-bold text-sv-border">📅 第 1 年 {{ currentSeason }}季</div>
          <div class="text-xl text-sv-border">第 {{ currentDay }} 日 (周{{ weekday }})</div>
        </div>
        
        <div class="flex gap-2 text-sm flex-wrap items-center">
          <label class="flex items-center gap-1">
            <span class="text-xs text-gray-600">天气：</span>
            <select 
              v-model="currentWeather" 
              class="px-2 py-1 bg-white border-2 border-sv-border rounded text-sm"
            >
              <option 
                v-for="weather in availableWeathers" 
                :key="weather.code"
                :value="weather.name"
              >
                {{ weather.icon }} {{ weather.name }}
              </option>
            </select>
          </label>
          <button class="sv-button">设置提醒</button>
        </div>
      </div>
      
      <!-- 快捷功能按钮 -->
      <div class="mt-4 flex gap-2 flex-wrap">
        <button 
          @click="addPlanType = 'harvest'; showAddPlanModal = true"
          class="sv-button text-sm"
        >
          🌱 添加种植计划
        </button>
        <button 
          @click="addPlanType = 'wine'; showAddPlanModal = true"
          class="sv-button text-sm"
        >
          🍷 添加酿酒批次
        </button>
        <button class="sv-button text-sm">今日待办清单</button>
        <button 
          @click="showQuickTools = !showQuickTools"
          class="sv-button text-sm"
        >
          {{ showQuickTools ? '收起' : '展开' }}快捷工具
        </button>
        <button 
          @click="showAIAssistant = true"
          class="sv-button text-sm"
        >
          🤖 星露谷智慧助手
        </button>
      </div>
    </header>

    <!-- 快捷功能区（可折叠） -->
    <div v-if="showQuickTools" class="sv-card">
      <QuickTools />
    </div>

    <!-- 主内容区 -->
    <main class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 左侧：日历区（占70%） -->
      <section class="lg:col-span-2 space-y-6">
        <div class="sv-card">
          <h2 class="sv-title">季节日历</h2>
          <GameCalendar 
            :activeDay="currentDay" 
            :season="currentSeason"
            :weather="currentWeather"
            @selectDay="changeDay" 
          />
        </div>
      </section>

      <!-- 右侧：信息面板 -->
      <section class="space-y-6">
        <div class="sv-card">
          <h2 class="sv-title text-lg">🏪 营业状态</h2>
          <BusinessStatus 
            :day="currentDay" 
            :weekday="weekday" 
            :season="currentSeason"
          />
        </div>
        
        <div class="sv-card">
          <h2 class="sv-title text-lg">💡 采购路线</h2>
          <RoutePlanner 
            :day="currentDay" 
            :season="currentSeason"
          />
        </div>
      </section>
    </main>

    <!-- 添加计划弹窗 -->
    <div 
      v-if="showAddPlanModal" 
      class="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="showAddPlanModal = false"
    >
      <div class="sv-card max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-opacity-95 backdrop-blur-md shadow-2xl">
        <div class="flex justify-between items-center mb-4">
          <h2 class="sv-title text-xl">
            {{ addPlanType === 'harvest' ? '🌱 添加种植计划' : '🍷 添加酿酒批次' }}
          </h2>
          <button 
            @click="showAddPlanModal = false"
            class="text-2xl text-gray-500 hover:text-gray-700 transition-colors"
          >
            ×
          </button>
        </div>
        <AddPlan 
          :currentDay="currentDay" 
          :season="currentSeason"
          :initialType="addPlanType"
          @close="showAddPlanModal = false"
        />
      </div>
    </div>

    <!-- 智能助手弹窗 -->
    <div 
      v-if="showAIAssistant" 
      class="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="showAIAssistant = false"
    >
      <div class="sv-card max-w-3xl w-full h-[80vh] flex flex-col bg-opacity-95 backdrop-blur-md shadow-2xl">
        <AIAssistant 
          :isOpen="showAIAssistant"
          @close="showAIAssistant = false"
        />
      </div>
    </div>
  </div>
</template>
