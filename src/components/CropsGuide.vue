<script setup>
import { ref, computed } from 'vue'
import { crops, getCropTypes } from '../data/crops'

const selectedType = ref('春')

// 获取所有作物类型
const cropTypes = computed(() => getCropTypes())

// 获取当前类型的作物列表
const currentCrops = computed(() => crops[selectedType.value] || [])
</script>

<template>
  <div class="space-y-4">
    <h2 class="sv-title text-xl">🌱 作物指南</h2>
    
    <!-- 作物类型选择 -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="type in cropTypes"
        :key="type"
        @click="selectedType = type"
        :class="selectedType === type ? 'sv-button' : 'bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm'"
      >
        {{ type }}
      </button>
    </div>
    
    <!-- 作物列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div
        v-for="crop in currentCrops"
        :key="crop.name"
        class="p-3 bg-white border-2 border-sv-border rounded-lg hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start mb-2">
          <div class="font-bold text-sv-border">{{ crop.name }}</div>
          <span 
            v-if="crop.type" 
            class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800"
          >
            {{ crop.type }}
          </span>
        </div>
        <div class="text-xs space-y-1">
          <!-- 成熟时间/加工时间 -->
          <div v-if="crop.days !== null && crop.days !== undefined">
            <span class="font-semibold">{{ selectedType === '酿造物' || selectedType === '腌制物' ? '加工时间：' : '成熟时间：' }}</span>
            {{ crop.days }}
          </div>
          <!-- 收获次数 -->
          <div v-if="crop.harvests">
            <span class="font-semibold">收获次数：</span>
            <span :class="crop.harvests === '多次' ? 'text-green-600' : ''">
              {{ crop.harvests === '多次' ? '多次' : '单次' }}
            </span>
            <span v-if="crop.harvestCycle && crop.harvests === '多次'" class="text-gray-500">
              (每{{ crop.harvestCycle }}天)
            </span>
          </div>
          <!-- 成本 -->
          <div v-if="crop.cost">
            <span class="font-semibold">成本：</span>
            {{ typeof crop.cost === 'number' ? `${crop.cost}金` : crop.cost }}
          </div>
          <!-- 基础售价 -->
          <div v-if="crop.price" class="text-blue-600">
            <span class="font-semibold">基础售价：</span>
            {{ typeof crop.price === 'number' ? `${crop.price}金` : crop.price }}
          </div>
          <!-- 加工后售价 -->
          <div v-if="crop.processedPrice && crop.processedPrice !== '无'" class="text-purple-600">
            <span class="font-semibold">加工后：</span>{{ crop.processedPrice }}
          </div>
          <!-- 备注信息 -->
          <div v-if="crop.note" class="text-xs text-gray-600 italic mt-2">
            {{ crop.note }}
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="currentCrops.length === 0" class="text-center text-gray-500 py-4">
      该分类下没有作物数据
    </div>
  </div>
</template>

