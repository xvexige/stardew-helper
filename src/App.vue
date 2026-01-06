<script setup>
import { ref, computed } from 'vue'
import BusinessStatus from './components/BusinessStatus.vue'
import GameCalendar from './components/GameCalendar.vue'
import RoutePlanner from './components/RoutePlanner.vue'

// 1. 定义核心状态
const currentDay = ref(15) // 默认选中的日期
const currentSeason = ref('春')

// 2. 派生计算属性 (让顶部状态栏跟随 currentDay 变化)
const weekday = computed(() => {
  const days = ['一', '二', '三', '四', '五', '六', '日']
  return days[(currentDay.value - 1) % 7]
})

// 3. 事件处理：点击日历切换日期
const changeDay = (day) => {
  currentDay.value = day
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-4 space-y-6">
    <header class="sv-card flex justify-between items-center">
      <div class="flex gap-6 items-baseline">
        <div class="text-2xl font-bold text-sv-border">📅 第 1 年 {{ currentSeason }}季</div>
        <div class="text-xl text-sv-border">第 {{ currentDay }} 日 (周{{ weekday }})</div>
      </div>
      <div class="flex gap-2 text-sm">
        <span class="px-2 py-1 bg-blue-100 rounded border border-blue-300">☀️ 晴天</span>
        <button class="sv-button">设置提醒</button>
      </div>
    </header>

    <main class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section class="lg:col-span-2">
        <div class="sv-card h-full">
          <h2 class="sv-title">季节日历</h2>
          <GameCalendar :activeDay="currentDay" @selectDay="changeDay" />
        </div>
      </section>

      <section class="space-y-6">
        <div class="sv-card">
          <h2 class="sv-title text-lg">🏪 营业状态</h2>
          <BusinessStatus :day="currentDay" :weekday="weekday" />
        </div>
        
        <div class="sv-card">
          <h2 class="sv-title text-lg">💡 采购路线</h2>
          <RoutePlanner :day="currentDay" />
        </div>
      </section>
    </main>
  </div>
</template>