<script setup>
import { computed } from 'vue'

const props = defineProps(['day'])

// 计算周几 (1-7)
const dayOfWeek = computed(() => ((props.day - 1) % 7) + 1)

const recommendations = computed(() => {
  const routes = []
  if (dayOfWeek.value === 3) routes.push("⚠️ 皮埃尔休息，种子去 Joja 买或等明天")
  if (dayOfWeek.value === 5) routes.push("🚚 旅行货车出现在煤矿森林（6am-8pm）")
  if (dayOfWeek.value === 7) routes.push("🚚 旅行货车出现在煤矿森林")
  
  routes.push("📍 推荐路线：农场 -> 煤矿森林 -> 小镇中心 -> 铁匠铺")
  return routes
})
</script>

<template>
  <div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
    <h3 class="font-bold text-blue-800 text-sm mb-2">💡 今日建议</h3>
    <ul class="text-xs space-y-1 text-blue-700">
      <li v-for="r in recommendations" :key="r">{{ r }}</li>
    </ul>
  </div>
</template>