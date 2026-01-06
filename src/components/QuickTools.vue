<script setup>
import { ref } from 'vue'
import BundlesView from './BundlesView.vue'
import FishGuide from './FishGuide.vue'
import NPCGifts from './NPCGifts.vue'
import CropsGuide from './CropsGuide.vue'

const activeTab = ref('bundles')

const tabs = [
  { id: 'bundles', label: '献祭包', icon: '📦' },
  { id: 'fish', label: '鱼类图鉴', icon: '🐟' },
  { id: 'npc', label: 'NPC礼物', icon: '🎁' },
  { id: 'crops', label: '作物指南', icon: '🌱' }
]
</script>

<template>
  <div class="sv-card">
    <div class="flex gap-2 mb-4 border-b-2 border-sv-border pb-2 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="activeTab === tab.id 
          ? 'sv-button' 
          : 'bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm'"
        class="flex items-center gap-1 whitespace-nowrap"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
      </button>
    </div>
    
    <div class="min-h-96">
      <BundlesView v-if="activeTab === 'bundles'" />
      <FishGuide v-if="activeTab === 'fish'" />
      <NPCGifts v-if="activeTab === 'npc'" />
      <CropsGuide v-if="activeTab === 'crops'" />
    </div>
  </div>
</template>

