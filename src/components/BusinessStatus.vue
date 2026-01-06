<script setup>
import { computed, ref } from 'vue'
import { businessHours, festivals } from '../data/businessHours'

const props = defineProps(['day', 'weekday', 'season', 'currentTime'])

// 展开/折叠状态
const isExpanded = ref(false)
const expandedShop = ref(null)

// 筛选状态
const filterCategory = ref('全部')
const showOnlyOpen = ref(false)

// 计算当前是周几 (1-7)
const dayOfWeek = computed(() => ((props.day - 1) % 7) + 1)

// 检查是否是节日
const isFestival = computed(() => {
  if (!props.season || !props.day) return null
  const dateKey = `${props.season}${props.day}`
  return festivals[dateKey] || null
})

// 格式化时间（支持小数小时，如23.83 = 11:50pm）
const formatTime = (hour) => {
  if (hour >= 24) hour -= 24
  
  // 处理小数小时（转换为分钟）
  const wholeHour = Math.floor(hour)
  const minutes = Math.round((hour - wholeHour) * 60)
  
  // 确定是上午还是下午
  const period = wholeHour >= 12 ? 'pm' : 'am'
  
  // 转换12小时制
  let displayHour = wholeHour > 12 ? wholeHour - 12 : (wholeHour === 0 ? 12 : wholeHour)
  
  // 如果有分钟，添加分钟显示
  if (minutes > 0) {
    return `${displayHour}:${minutes.toString().padStart(2, '0')}${period}`
  }
  
  return `${displayHour}${period}`
}

// 检查地点是否营业（仅根据日期判断，不考虑时间）
const checkBusinessStatus = (shop) => {
  // 检查是否是休息日
  const isDayOff = shop.offDays.includes(dayOfWeek.value)
  
  // 检查是否是节日（如果节日所有商店关闭）
  const isHolidayClosed = isFestival.value?.allClosed && shop.holidays
  
  // 检查特殊日期
  let isSpecialClosed = false
  let specialReason = ''
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
                specialReason = s.note || '特殊日期休息'
              }
            } else {
              // 单个日期
              if (props.day === Number(startDay)) {
                isSpecialClosed = true
                specialReason = s.note || '特殊日期休息'
              }
            }
          }
        }
      }
    })
  }
  
  // 检查旅行货车特殊逻辑
  if (shop.name === '旅行货车') {
    // 旅行货车只在周五(5)和周日(7)出现
    if (dayOfWeek.value !== 5 && dayOfWeek.value !== 7) {
      return { 
        isOpen: false, 
        status: '今日不出现', 
        reason: '仅周五、周日出现',
        canOpen: false
      }
    }
    // 如果今天出现，则营业
    return {
      isOpen: true,
      status: '今日出现',
      reason: `${formatTime(shop.open)} - ${formatTime(shop.close)}`,
      canOpen: true
    }
  }
  
  // 检查冰淇淋摊（仅夏季）
  if (shop.name === '冰淇淋摊') {
    if (props.season !== '夏') {
      return { 
        isOpen: false, 
        status: '今日不营业', 
        reason: '仅夏季营业',
        canOpen: false
      }
    }
    // 检查是否休息日（周三或雨天）
    if (dayOfWeek.value === 3) {
      return {
        isOpen: false,
        status: '今日休息',
        reason: '周三休息',
        canOpen: false
      }
    }
  }
  
  // 判断是否休息
  if (isDayOff || isHolidayClosed || isSpecialClosed) {
    let reason = ''
    if (isDayOff) {
      reason = shop.note || '休息日'
    } else if (isHolidayClosed) {
      reason = '节日关闭'
    } else if (specialReason) {
      reason = specialReason
    } else {
      reason = '特殊日期休息'
    }
    
    return { 
      isOpen: false, 
      status: '今日休息',
      reason: reason,
      canOpen: false
    }
  }
  
  // 如果都不满足，则今日营业
  return {
    isOpen: true,
    status: '今日营业',
    reason: `${formatTime(shop.open)} - ${formatTime(shop.close)}`,
    canOpen: true
  }
}

// 筛选后的商店列表
const filteredShops = computed(() => {
  let shops = businessHours.map(shop => ({
    ...shop,
    ...checkBusinessStatus(shop)
  }))
  
  // 按类别筛选
  if (filterCategory.value !== '全部') {
    shops = shops.filter(s => s.category === filterCategory.value)
  }
  
  // 仅显示营业中的
  if (showOnlyOpen.value) {
    shops = shops.filter(s => s.isOpen)
  }
  
  return shops.sort((a, b) => {
    if (a.isOpen !== b.isOpen) return a.isOpen ? -1 : 1
    // 如果都营业，按名称排序
    return a.name.localeCompare(b.name)
  })
})

// 统计信息
const stats = computed(() => {
  const all = businessHours.map(s => ({ ...s, ...checkBusinessStatus(s) }))
  return {
    total: all.length,
    open: all.filter(s => s.isOpen).length,
    closed: all.filter(s => !s.isOpen).length
  }
})
</script>

<template>
  <div class="space-y-3">
    <!-- 节日提醒 -->
    <div v-if="isFestival" class="p-2 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
      <div class="font-bold text-yellow-800 text-sm">🎉 {{ isFestival.name }}</div>
      <div class="text-xs text-yellow-700 mt-1">
        {{ isFestival.allClosed ? '所有商店关闭' : '部分商店可能关闭' }}
      </div>
    </div>

    <!-- 可展开的营业时间栏 -->
    <div class="border-2 border-sv-border rounded-lg overflow-hidden">
      <!-- 标题栏（可点击展开） -->
      <button
        @click="isExpanded = !isExpanded"
        class="w-full p-3 bg-sv-panel hover:bg-gray-50 transition-all flex justify-between items-center"
      >
        <div class="flex items-center gap-2">
          <span class="text-lg">🏪</span>
          <div class="text-left">
            <div class="font-bold text-sv-border text-sm">营业时间速查</div>
            <div class="text-xs text-gray-600">
              <span class="text-green-600">✅ {{ stats.open }}个营业</span>
              <span class="text-gray-500 ml-2">❌ {{ stats.closed }}个休息</span>
            </div>
          </div>
        </div>
        <div class="text-sv-border">
          <span v-if="isExpanded">▼</span>
          <span v-else>▶</span>
        </div>
      </button>

      <!-- 展开内容 -->
      <div v-if="isExpanded" class="p-3 bg-white border-t-2 border-sv-border space-y-3 max-h-96 overflow-y-auto">
        <!-- 筛选器 -->
        <div class="space-y-2">
          <div class="flex gap-2 flex-wrap">
            <button 
              v-for="cat in ['全部', '商店类', '服务类', '特殊场所']"
              :key="cat"
              @click="filterCategory = cat"
              :class="filterCategory === cat ? 'sv-button' : 'bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs'"
              class="text-xs"
            >
              {{ cat }}
            </button>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-xs flex items-center gap-1">
              <input type="checkbox" v-model="showOnlyOpen" class="w-3 h-3" />
              仅显示营业中
            </label>
          </div>
        </div>

        <!-- 商店列表 -->
        <div class="space-y-2">
          <div 
            v-for="shop in filteredShops" 
            :key="shop.name"
            class="border rounded-lg transition-all"
            :class="shop.isOpen 
              ? 'border-green-400 bg-green-50' 
              : 'border-gray-300 bg-gray-100 opacity-70'"
          >
            <!-- 商店标题（可点击展开详情） -->
            <button
              @click="expandedShop = expandedShop === shop.name ? null : shop.name"
              class="w-full p-2 flex justify-between items-center hover:bg-opacity-80 transition-all"
            >
              <div class="flex items-center gap-2 flex-1 text-left">
                <span class="text-lg">{{ shop.icon }}</span>
                <div>
                  <div class="font-bold text-sv-border text-sm">{{ shop.name }}</div>
                  <div class="text-xs text-gray-600">
                    {{ formatTime(shop.open) }} - {{ formatTime(shop.close) }}
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div 
                  :class="shop.isOpen ? 'text-green-600' : 'text-red-500'" 
                  class="font-bold text-xs"
                >
                  {{ shop.status }}
                </div>
                <span class="text-sv-border text-xs">
                  {{ expandedShop === shop.name ? '▼' : '▶' }}
                </span>
              </div>
            </button>

            <!-- 商店详情（展开时显示） -->
            <div v-if="expandedShop === shop.name" class="px-2 pb-2 border-t border-gray-200 bg-white">
              <div class="pt-2 space-y-1 text-xs">
                <div class="flex justify-between">
                  <span class="text-gray-600">营业时间：</span>
                  <span class="font-semibold">{{ formatTime(shop.open) }} - {{ formatTime(shop.close) }}</span>
                </div>
                <div v-if="shop.offDays.length > 0" class="flex justify-between">
                  <span class="text-gray-600">休息日：</span>
                  <span class="text-red-600">
                    {{ shop.offDays.map(d => ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'][d]).join('、') }}
                  </span>
                </div>
                <div v-if="shop.holidays" class="flex justify-between">
                  <span class="text-gray-600">节日：</span>
                  <span class="text-orange-600">所有节日关闭</span>
                </div>
                <div v-if="shop.special && shop.special.length > 0" class="pt-1 border-t border-gray-100">
                  <div class="text-gray-600 mb-1">特殊说明：</div>
                  <div v-for="(s, idx) in shop.special" :key="idx" class="text-gray-700 pl-2">
                    • {{ s.date ? `${s.date}：` : '' }}{{ s.note }}
                  </div>
                </div>
                <div class="pt-1 border-t border-gray-100">
                  <div class="text-gray-600">今日状态：</div>
                  <div class="font-semibold" :class="shop.isOpen ? 'text-green-600' : 'text-red-500'">
                    {{ shop.status }}
                  </div>
                  <div class="text-xs text-gray-600 mt-1">{{ shop.reason }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="filteredShops.length === 0" class="text-center text-gray-500 text-sm py-4">
          没有找到符合条件的商店
        </div>
      </div>
    </div>
  </div>
</template>
