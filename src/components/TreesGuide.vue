<script setup>
import { ref, computed } from 'vue'
import { trees, getTreeTypes } from '../data/trees'

const selectedType = ref('普通树木')

// 获取所有树木类型
const treeTypes = computed(() => getTreeTypes())

// 获取当前类型的树木列表
const currentTrees = computed(() => trees[selectedType.value] || [])
</script>

<template>
  <div class="space-y-4">
    <h2 class="sv-title text-xl">🌳 树木指南</h2>
    
    <!-- 树木类型选择 -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="type in treeTypes"
        :key="type"
        @click="selectedType = type"
        :class="selectedType === type ? 'sv-button' : 'bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm'"
      >
        {{ type }}
      </button>
    </div>
    
    <!-- 树木列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div
        v-for="tree in currentTrees"
        :key="tree.name"
        class="p-3 bg-white border-2 border-sv-border rounded-lg hover:shadow-md transition-shadow"
      >
        <div class="font-bold text-sv-border mb-2">{{ tree.name }}</div>
        <div class="text-xs space-y-1">
          <!-- 产出物 -->
          <div>
            <span class="font-semibold">产出物：</span>
            {{ tree.product }}
          </div>
          <!-- 金星品质概率 -->
          <div v-if="tree.goldChance && tree.goldChance !== '无'" class="text-yellow-600">
            <span class="font-semibold">金星概率：</span>
            {{ tree.goldChance }}
          </div>
          <!-- 解锁方式 -->
          <div>
            <span class="font-semibold">解锁方式：</span>
            {{ tree.unlock }}
          </div>
          <!-- 备注 -->
          <div v-if="tree.note" class="text-xs text-gray-600 italic mt-2">
            {{ tree.note }}
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="currentTrees.length === 0" class="text-center text-gray-500 py-4">
      该分类下没有树木数据
    </div>
  </div>
</template>