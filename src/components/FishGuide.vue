<script setup>
import { ref, computed } from 'vue'
import { fish } from '../data/fish'

const selectedSeason = ref('春')
const filterWeather = ref('全部')
const filterLocation = ref('全部')

const filteredFish = computed(() => {
  let result = fish[selectedSeason.value] || []
  
  if (filterWeather.value !== '全部') {
    result = result.filter(f => f.weather === filterWeather.value)
  }
  
  if (filterLocation.value !== '全部') {
    result = result.filter(f => f.location.includes(filterLocation.value))
  }
  
  return result
})

const locations = computed(() => {
  const locs = new Set()
  Object.values(fish).flat().forEach(f => {
    f.location.split('/').forEach(l => locs.add(l.trim()))
  })
  return Array.from(locs)
})
</script>

<template>
  <div class="space-y-4">
    <h2 class="sv-title text-xl">🐟 鱼类分布图鉴</h2>
    
    <!-- 筛选器 -->
    <div class="flex gap-2 flex-wrap">
      <select v-model="selectedSeason" class="border-2 border-sv-border rounded px-2 py-1 text-sm">
        <option v-for="s in ['春', '夏', '秋', '冬']" :key="s">{{ s }}</option>
      </select>
      
      <select v-model="filterWeather" class="border-2 border-sv-border rounded px-2 py-1 text-sm">
        <option>全部</option>
        <option>晴</option>
        <option>雨</option>
        <option>任意</option>
      </select>
      
      <select v-model="filterLocation" class="border-2 border-sv-border rounded px-2 py-1 text-sm">
        <option>全部</option>
        <option v-for="loc in locations" :key="loc">{{ loc }}</option>
      </select>
    </div>
    
    <!-- 鱼类列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        v-for="f in filteredFish"
        :key="f.name"
        class="p-3 bg-white border-2 border-sv-border rounded-lg"
      >
        <div class="font-bold text-sv-border mb-2">{{ f.name }}</div>
        <div class="text-xs space-y-1">
          <div><span class="font-semibold">时间：</span>{{ f.time }}</div>
          <div><span class="font-semibold">天气：</span>
            <span :class="f.weather === '雨' ? 'text-blue-600' : f.weather === '晴' ? 'text-yellow-600' : ''">
              {{ f.weather }}
            </span>
          </div>
          <div><span class="font-semibold">地点：</span>{{ f.location }}</div>
          <div class="text-gray-600 italic">{{ f.note }}</div>
        </div>
      </div>
    </div>
    
    <div v-if="filteredFish.length === 0" class="text-center text-gray-500 py-4">
      没有找到符合条件的鱼类
    </div>
  </div>
</template>

