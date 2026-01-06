<script setup>
import { computed } from 'vue'

// 接收父组件 App.vue 传来的 day
const props = defineProps(['day'])

// 商店原始数据
const shops = [
  { name: "皮埃尔杂货店", open: 9, close: 17, off: [3], note: "周三休息" },
  { name: "铁匠铺", open: 9, close: 16, off: [5], note: "周五休息" },
  { name: "木匠商店", open: 9, close: 17, off: [2], note: "周二休息" },
  { name: "玛妮牧场", open: 9, close: 16, off: [1, 2], note: "周一二休息" }
]

const shopStatus = computed(() => {
  // 计算当前是周几 (1-7)
  const dayOfWeek = ((props.day - 1) % 7) + 1
  const currentTime = 10 // 假设现在是早上10点，你可以后续接入动态时间

  return shops.map(shop => {
    const isDayOff = shop.off.includes(dayOfWeek)
    const isHourOpen = currentTime >= shop.open && currentTime < shop.close
    return {
      ...shop,
      isOpen: !isDayOff && isHourOpen,
      statusText: isDayOff ? "今日休息" : (isHourOpen ? "营业中" : "已打烊")
    }
  })
})
</script>

<template>
  <div class="space-y-3">
    <div v-for="shop in shopStatus" :key="shop.name" 
         class="flex justify-between items-center p-3 rounded-lg border-2"
         :class="shop.isOpen ? 'bg-white border-green-400' : 'bg-gray-100 border-gray-300 opacity-60'">
      <div>
        <div class="font-bold text-sv-border">{{ shop.name }}</div>
        <div class="text-[10px] text-gray-500">{{ shop.note }}</div>
      </div>
      <div :class="shop.isOpen ? 'text-green-600' : 'text-red-500'" class="font-bold text-sm">
        {{ shop.statusText }}
      </div>
    </div>
  </div>
</template>