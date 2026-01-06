<script setup>
import { ref, computed } from 'vue'
import { artifacts, getArtifactsBySource } from '../data/artifacts'

const filterSource = ref('全部')

// 根据来源筛选古物
const filteredArtifacts = computed(() => {
  if (filterSource.value === '全部') {
    return artifacts
  }
  return getArtifactsBySource(filterSource.value)
})

// 获取所有可能的来源关键词
const sourceKeywords = computed(() => {
  const keywords = new Set(['全部'])
  artifacts.forEach(artifact => {
    // 提取来源中的关键词
    const sourceParts = artifact.source.split(/[、,\s]/)
    sourceParts.forEach(part => {
      if (part && part !== 'artifact' && part !== 'spot') {
        keywords.add(part)
      }
    })
  })
  return Array.from(keywords)
})
</script>

<template>
  <div class="space-y-4">
    <h2 class="sv-title text-xl">🏺 古物图鉴</h2>
    
    <!-- 筛选器 -->
    <div class="flex flex-wrap gap-2">
      <select 
        v-model="filterSource" 
        class="border-2 border-sv-border rounded px-2 py-1 text-sm"
      >
        <option v-for="keyword in sourceKeywords" :key="keyword">
          {{ keyword }}
        </option>
      </select>
    </div>
    
    <!-- 古物列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div
        v-for="artifact in filteredArtifacts"
        :key="artifact.name"
        class="p-3 bg-white border-2 border-sv-border rounded-lg hover:shadow-md transition-shadow"
      >
        <!-- 古物名称 -->
        <div class="font-bold text-sv-border mb-2">{{ artifact.name }}</div>
        
        <div class="text-xs space-y-1">
          <!-- 捐赠奖励 -->
          <div>
            <span class="font-semibold">捐赠奖励：</span>
            <span :class="artifact.reward !== '无' ? 'text-green-600' : ''">
              {{ artifact.reward }}
            </span>
          </div>
          <!-- 获取方式 -->
          <div>
            <span class="font-semibold">获取方式：</span>
            {{ artifact.source }}
          </div>
          <!-- 备注 -->
          <div>
            <span class="font-semibold">备注：</span>
            {{ artifact.note }}
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="filteredArtifacts.length === 0" class="text-center text-gray-500 py-4">
      没有找到符合条件的古物
    </div>
  </div>
</template>