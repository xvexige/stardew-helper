<script setup>
import { ref, computed } from 'vue'
import { npcGifts, giftRules } from '../data/npcGifts'

const selectedCategory = ref('可攻略')
const searchQuery = ref('')

const filteredNPCs = computed(() => {
  const npcs = npcGifts[selectedCategory.value] || []
  if (!searchQuery.value) return npcs
  return npcs.filter(npc => 
    npc.name.includes(searchQuery.value) ||
    npc.loves.some(g => g.includes(searchQuery.value)) ||
    npc.likes.some(g => g.includes(searchQuery.value))
  )
})
</script>

<template>
  <div class="space-y-4">
    <h2 class="sv-title text-xl">🎁 NPC礼物查询</h2>
    
    <!-- 筛选器 -->
    <div class="flex gap-2 flex-wrap">
      <button
        v-for="cat in ['可攻略', '其他']"
        :key="cat"
        @click="selectedCategory = cat"
        :class="selectedCategory === cat ? 'sv-button' : 'bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm'"
      >
        {{ cat }}NPC
      </button>
      
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索NPC或礼物..."
        class="border-2 border-sv-border rounded px-2 py-1 text-sm flex-1 min-w-40"
      />
    </div>
    
    <!-- 通用规则 -->
    <div class="p-3 bg-blue-50 border-2 border-blue-300 rounded-lg">
      <div class="font-bold text-sm mb-2">💡 通用规则</div>
      <div class="text-xs space-y-1">
        <div><span class="font-semibold">通用最爱：</span>{{ giftRules.universalLoves.join('、') }}</div>
        <div><span class="font-semibold">通用喜欢：</span>{{ giftRules.universalLikes.join('、') }}</div>
        <div><span class="font-semibold">通用讨厌：</span>{{ giftRules.universalHates.join('、') }}</div>
        <div class="text-gray-600 mt-2">💡 每日1次，每周最多2次；生日当天送礼+8倍好感</div>
      </div>
    </div>
    
    <!-- NPC列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        v-for="npc in filteredNPCs"
        :key="npc.name"
        class="p-4 bg-white border-2 border-sv-border rounded-lg"
      >
        <div class="font-bold text-lg text-sv-border mb-3">{{ npc.name }}</div>
        
        <div class="space-y-2 text-sm">
          <div>
            <div class="font-semibold text-red-600 mb-1">❤️ 最爱（+80点）：</div>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="gift in npc.loves" 
                :key="gift"
                class="px-2 py-0.5 bg-red-100 rounded text-xs"
              >
                {{ gift }}
              </span>
            </div>
          </div>
          
          <div>
            <div class="font-semibold text-green-600 mb-1">👍 喜欢（+45点）：</div>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="gift in npc.likes" 
                :key="gift"
                class="px-2 py-0.5 bg-green-100 rounded text-xs"
              >
                {{ gift }}
              </span>
            </div>
          </div>
          
          <div v-if="npc.hates.length > 0">
            <div class="font-semibold text-gray-600 mb-1">❌ 讨厌：</div>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="gift in npc.hates" 
                :key="gift"
                class="px-2 py-0.5 bg-gray-200 rounded text-xs"
              >
                {{ gift }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="filteredNPCs.length === 0" class="text-center text-gray-500 py-4">
      没有找到符合条件的NPC
    </div>
  </div>
</template>

