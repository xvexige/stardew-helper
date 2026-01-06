<script setup>
import { ref, computed } from 'vue'
import { fish } from '../data/fish'

const selectedSeason = ref('春')
const filterWeather = ref('全部')
const filterLocation = ref('全部')
const filterType = ref('全部')

const filteredFish = computed(() => {
  // 获取当前季节的鱼类和任意季节的鱼类
  let result = [...(fish[selectedSeason.value] || []), ...(fish['任意季节'] || [])]
  
  if (filterWeather.value !== '全部') {
    result = result.filter(f => f.weather === filterWeather.value)
  }
  
  if (filterLocation.value !== '全部') {
    result = result.filter(f => f.location.includes(filterLocation.value))
  }
  
  if (filterType.value !== '全部') {
    result = result.filter(f => f.type === filterType.value)
  }
  
  return result
})

const locations = computed(() => {
  const locs = new Set()
  Object.values(fish).flat().forEach(f => {
    // 分割地点字符串，支持中文和英文分隔符
    f.location.split(/[、,]/).forEach(l => locs.add(l.trim()))
  })
  return Array.from(locs)
})

const fishTypes = computed(() => {
  const types = new Set()
  Object.values(fish).flat().forEach(f => {
    types.add(f.type)
  })
  return Array.from(types)
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
        <option>雨天</option>
        <option>雪天</option>
        <option>任意</option>
        <option>晴天/风</option>
      </select>
      
      <select v-model="filterLocation" class="border-2 border-sv-border rounded px-2 py-1 text-sm">
        <option>全部</option>
        <option v-for="loc in locations" :key="loc">{{ loc }}</option>
      </select>
      
      <select v-model="filterType" class="border-2 border-sv-border rounded px-2 py-1 text-sm">
        <option>全部</option>
        <option v-for="type in fishTypes" :key="type">{{ type }}</option>
      </select>
    </div>
    
    <!-- 鱼类列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div
        v-for="f in filteredFish"
        :key="f.name"
        class="p-3 bg-white border-2 border-sv-border rounded-lg hover:shadow-md transition-shadow"
      >
        <!-- 鱼类名称和类型标签 -->
        <div class="flex justify-between items-start mb-2">
          <div class="font-bold text-sv-border">{{ f.name }}</div>
          <span 
            class="text-xs px-2 py-0.5 rounded-full"
            :class="
              f.type === '传说鱼类' ? 'bg-red-100 text-red-800' :
              f.type === '1.6新增鱼类' ? 'bg-blue-100 text-blue-800' :
              f.type === '普通鱼类' ? 'bg-green-100 text-green-800' :
              f.type === '1.6新增凝胶类' ? 'bg-purple-100 text-purple-800' :
              'bg-yellow-100 text-yellow-800'
            "
          >
            {{ f.type }}
          </span>
        </div>
        
        <div class="text-xs space-y-1">
          <div><span class="font-semibold">时间：</span>{{ f.time }}</div>
          <div><span class="font-semibold">天气：</span>
            <span :class="
              f.weather.includes('雨') ? 'text-blue-600' :
              f.weather.includes('晴') ? 'text-yellow-600' :
              f.weather.includes('雪') ? 'text-gray-400' : ''
            ">
              {{ f.weather }}
            </span>
          </div>
          <div><span class="font-semibold">地点：</span>{{ f.location }}</div>
          <div><span class="font-semibold">难度：</span>
            <span :class="
              f.difficulty === '无' ? 'text-gray-500' :
              +f.difficulty < 50 ? 'text-green-600' :
              +f.difficulty < 80 ? 'text-yellow-600' :
              'text-red-600'
            ">
              {{ f.difficulty === '无' ? '无' : f.difficulty }}
            </span>
          </div>
          <div><span class="font-semibold">用途：</span>{{ f.use }}</div>
          <div><span class="font-semibold">位置：</span>{{ f.position }}</div>
        </div>
      </div>
    </div>
    
    <div v-if="filteredFish.length === 0" class="text-center text-gray-500 py-4">
      没有找到符合条件的鱼类
    </div>
  </div>
</template>

