<script setup>
import { ref, computed } from 'vue'
import { crops } from '../data/crops'

const selectedSeason = ref('春')

const seasonCrops = computed(() => crops[selectedSeason.value] || [])
</script>

<template>
  <div class="space-y-4">
    <h2 class="sv-title text-xl">🌱 作物指南</h2>
    
    <!-- 季节选择 -->
    <div class="flex gap-2">
      <button
        v-for="s in ['春', '夏', '秋', '冬']"
        :key="s"
        @click="selectedSeason = s"
        :class="selectedSeason === s ? 'sv-button' : 'bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm'"
      >
        {{ s }}季
      </button>
    </div>
    
    <!-- 作物列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div
        v-for="crop in seasonCrops"
        :key="crop.name"
        class="p-3 bg-white border-2 border-sv-border rounded-lg"
      >
        <div class="font-bold text-sv-border mb-2">{{ crop.name }}</div>
        <div class="text-sm space-y-1">
          <div><span class="font-semibold">成熟时间：</span>{{ crop.days }}天</div>
          <div><span class="font-semibold">收获次数：</span>
            <span :class="crop.harvests === '多次' ? 'text-green-600' : ''">
              {{ crop.harvests === '多次' ? '多次' : '单次' }}
            </span>
          </div>
          <div v-if="crop.price" class="text-blue-600">
            <span class="font-semibold">基础售价：</span>{{ crop.price }}金
          </div>
          <div class="text-xs text-gray-600 italic mt-2">{{ crop.note }}</div>
        </div>
      </div>
    </div>
    
    <div v-if="seasonCrops.length === 0" class="text-center text-gray-500 py-4">
      该季节没有可种植的作物
    </div>
  </div>
</template>

