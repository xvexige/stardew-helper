<script setup>
import { ref } from 'vue'
import { bundles } from '../data/bundles'

const selectedBundle = ref(null)
</script>

<template>
  <div class="space-y-4">
    <h2 class="sv-title text-xl">📦 社区中心献祭包</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        v-for="bundle in bundles"
        :key="bundle.name"
        @click="selectedBundle = selectedBundle === bundle.name ? null : bundle.name"
        class="p-3 bg-white border-2 border-sv-border rounded-lg cursor-pointer hover:bg-yellow-50 transition-all"
        :class="selectedBundle === bundle.name ? 'ring-2 ring-yellow-400' : ''"
      >
        <div class="font-bold text-sv-border mb-2">{{ bundle.name }}</div>
        <div class="text-sm text-gray-700 mb-2">
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="item in bundle.items" 
              :key="item"
              class="px-2 py-0.5 bg-green-100 rounded text-xs"
            >
              {{ item }}
            </span>
          </div>
        </div>
        <div class="text-xs text-blue-600 font-semibold">
          奖励：{{ bundle.reward }}
        </div>
      </div>
    </div>
  </div>
</template>

