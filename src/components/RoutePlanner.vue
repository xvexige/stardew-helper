<script setup>
import { computed } from 'vue'
import { businessHours, festivals } from '../data/businessHours'

const props = defineProps(['day', 'season'])

// 计算周几
const dayOfWeek = computed(() => ((props.day - 1) % 7) + 1)

// 检查是否是节日
const isFestival = computed(() => {
  if (!props.season || !props.day) return null
  const dateKey = `${props.season}${props.day}`
  return festivals[dateKey] || null
})

// 获取今日可访问的地点
const getAvailableLocations = () => {
  const currentTime = 9 // 假设从9点开始规划
  const locations = []
  
  businessHours.forEach(shop => {
    // 检查旅行货车（只在周五和周日出现）
    if (shop.name === '旅行货车') {
      if (dayOfWeek.value === 5 || dayOfWeek.value === 7) {
        locations.push({
          ...shop,
          priority: 1,
          timeWindow: `${shop.open}am-${shop.close}pm`,
          note: '稀有物品，优先访问'
        })
      }
      return
    }
    
    // 检查休息日
    if (shop.offDays.includes(dayOfWeek.value)) return
    
    // 检查节日
    if (isFestival.value?.allClosed && shop.holidays) return
    
    // 检查特殊日期
    let isSpecialClosed = false
    if (shop.special) {
      shop.special.forEach(s => {
        if (s.date) {
          // 解析日期格式：如"春15"或"春15-17"
          const match = s.date.match(/^([春夏秋冬])(\d+)(?:-(\d+))?$/)
          if (match) {
            const [, season, startDay, endDay] = match
            if (season === props.season) {
              if (endDay) {
                // 日期范围
                if (props.day >= Number(startDay) && props.day <= Number(endDay)) {
                  isSpecialClosed = true
                }
              } else {
                // 单个日期
                if (props.day === Number(startDay)) {
                  isSpecialClosed = true
                }
              }
            }
          }
        }
      })
    }
    if (isSpecialClosed) return
    
    // 计算优先级（关门早的优先）
    const priority = shop.close < 17 ? 2 : 3
    
    locations.push({
      ...shop,
      priority,
      timeWindow: `${shop.open}am-${shop.close}pm`,
      urgency: shop.close - currentTime
    })
  })
  
  // 按优先级和紧急程度排序
  return locations.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority
    return a.urgency - b.urgency
  })
}

const recommendedRoute = computed(() => {
  const locations = getAvailableLocations()
  
  if (locations.length === 0) {
    return {
      message: '今日大部分商店休息，建议进行农场工作或探索',
      route: []
    }
  }
  
  // 生成路线建议
  const route = []
  let time = 9
  
  locations.slice(0, 5).forEach((loc, idx) => {
    route.push({
      order: idx + 1,
      name: loc.name,
      icon: loc.icon,
      time: `${time}:00`,
      window: loc.timeWindow,
      note: loc.note || (loc.close < 17 ? '早关门，优先' : '')
    })
    time += 1 // 假设每个地点1小时
  })
  
  return {
    message: `推荐访问${locations.length}个地点，预计耗时${route.length}小时`,
    route
  }
})

// 特殊提醒
const specialReminders = computed(() => {
  const reminders = []
  
  // 周三提醒
  if (dayOfWeek.value === 3) {
    reminders.push('⚠️ 皮埃尔休息，种子去Joja买或等明天')
  }
  
  // 周五/周日提醒
  if (dayOfWeek.value === 5 || dayOfWeek.value === 7) {
    reminders.push('🚚 旅行货车出现在煤矿森林（6am-8pm）')
  }
  
  // 明日节日提醒
  if (props.season && props.day) {
    const tomorrowDay = props.day + 1
    if (tomorrowDay <= 28) {
      const tomorrowKey = `${props.season}${tomorrowDay}`
      if (festivals[tomorrowKey]) {
        reminders.push(`📅 明日：${festivals[tomorrowKey].name}，建议今日完成采购`)
      }
    }
  }
  
  return reminders
})
</script>

<template>
  <div class="space-y-3">
    <!-- 特殊提醒 -->
    <div v-if="specialReminders.length > 0" class="space-y-1">
      <div 
        v-for="(reminder, idx) in specialReminders" 
        :key="idx"
        class="p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded text-xs"
      >
        {{ reminder }}
      </div>
    </div>

    <!-- 路线规划 -->
    <div class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
      <h3 class="font-bold text-blue-800 text-sm mb-2">📍 今日最优采购路线</h3>
      <div class="text-xs text-blue-700 mb-2">{{ recommendedRoute.message }}</div>
      
      <div v-if="recommendedRoute.route.length > 0" class="space-y-2 mt-3">
        <div 
          v-for="step in recommendedRoute.route" 
          :key="step.order"
          class="flex items-center gap-2 p-2 bg-white rounded border border-blue-200"
        >
          <div class="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
            {{ step.order }}
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-1">
              <span>{{ step.icon }}</span>
              <span class="font-semibold">{{ step.name }}</span>
            </div>
            <div class="text-[10px] text-gray-600">
              {{ step.time }} | {{ step.window }}
            </div>
          </div>
          <div v-if="step.note" class="text-[10px] text-orange-600">
            {{ step.note }}
          </div>
        </div>
      </div>
      
      <div v-else class="text-xs text-gray-600 mt-2">
        {{ recommendedRoute.message }}
      </div>
    </div>

    <!-- 路线优化提示 -->
    <div class="p-2 bg-gray-50 rounded text-xs text-gray-600">
      💡 提示：使用矿车可快速移动，节省时间
    </div>
  </div>
</template>
