<script setup>
import { ref, computed } from 'vue'
import { livestock, getLivestockTypes } from '../data/livestock'

const selectedType = ref('鸡')

// 获取所有畜牧类型
const livestockTypes = computed(() => getLivestockTypes())

// 获取当前类型的畜牧列表
const currentLivestock = computed(() => livestock[selectedType.value] || [])
</script>

<template>
  <div class="space-y-4">
    <h2 class="sv-title text-xl">🐾 畜牧指南</h2>
    
    <!-- 畜牧类型选择 -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="type in livestockTypes"
        :key="type"
        @click="selectedType = type"
        :class="selectedType === type ? 'sv-button' : 'bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm'"
      >
        {{ type }}
      </button>
    </div>
    
    <!-- 畜牧列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div
        v-for="animal in currentLivestock"
        :key="animal.name"
        class="p-3 bg-white border-2 border-sv-border rounded-lg hover:shadow-md transition-shadow"
      >
        <div class="font-bold text-sv-border mb-2">{{ animal.name }}</div>
        <div class="text-xs space-y-1">
          <!-- 产出物 -->
          <div>
            <span class="font-semibold">产出物：</span>
            {{ animal.product }}
          </div>
          <!-- 金星品质概率 -->
          <div v-if="animal.goldChance && animal.goldChance !== '无'" class="text-yellow-600">
            <span class="font-semibold">金星概率：</span>
            {{ animal.goldChance }}
          </div>
          <!-- 自动采集器解锁条件 -->
          <div v-if="animal.autoCollector">
            <span class="font-semibold">自动采集器：</span>
            {{ animal.autoCollector }}
          </div>
          <!-- 解锁方式 -->
          <div>
            <span class="font-semibold">解锁方式：</span>
            {{ animal.unlock }}
          </div>
          <!-- 备注 -->
          <div v-if="animal.note" class="text-xs text-gray-600 italic mt-2">
            {{ animal.note }}
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="currentLivestock.length === 0" class="text-center text-gray-500 py-4">
      该分类下没有畜牧数据
    </div>
  </div>
</template>