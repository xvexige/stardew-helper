<script setup>
import { ref, computed } from 'vue'
import { npcGifts, giftRules } from '../data/npcGifts'

const selectedCategory = ref('可攻略')
const searchQuery = ref('')

// 可攻略NPC名单
const romanceNPCs = ['阿比盖尔', '塞巴斯蒂安', '莉亚', '哈维', '艾米丽', '亚历克斯', '艾利欧特', '山姆', '海莉', '玛鲁', '潘妮', '谢恩']

const filteredNPCs = computed(() => {
  let npcs = []
  
  // 根据选择的类别筛选NPC
  if (selectedCategory.value === '可攻略') {
    npcs = npcGifts.filter(npc => romanceNPCs.includes(npc.name))
  } else {
    npcs = npcGifts.filter(npc => !romanceNPCs.includes(npc.name))
  }
  
  // 搜索筛选
  if (!searchQuery.value) return npcs
  return npcs.filter(npc => 
    npc.name.includes(searchQuery.value) ||
    npc.address.includes(searchQuery.value) ||
    npc.loves.some(g => g.includes(searchQuery.value)) ||
    npc.likes.some(g => g.includes(searchQuery.value)) ||
    npc.earlyLovedItem.includes(searchQuery.value)
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
        class="p-4 bg-white border-2 border-sv-border rounded-lg shadow-sm"
      >
        <div class="flex justify-between items-start mb-3">
          <div class="font-bold text-lg text-sv-border">{{ npc.name }}</div>
          <div class="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">
            {{ npc.birthday }}
          </div>
        </div>
        
        <div class="space-y-3 text-sm">
          <!-- NPC基本信息 -->
          <div class="p-2 bg-gray-50 rounded">
            <div class="flex items-center gap-1 mb-1">
              <span class="text-gray-600">📍</span>
              <span class="font-semibold text-gray-700">住址：</span>
              <span class="text-gray-600">{{ npc.address }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-gray-600">🎁</span>
              <span class="font-semibold text-gray-700">早期最爱：</span>
              <span class="text-gray-600">{{ npc.earlyLovedItem }}</span>
            </div>
          </div>
          
          <!-- 最爱礼物 -->
          <div>
            <div class="font-semibold text-red-600 mb-1">❤️ 最爱（+80点）：</div>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="gift in npc.loves" 
                :key="gift"
                class="px-2 py-0.5 bg-red-100 border border-red-200 rounded text-xs"
              >
                {{ gift }}
              </span>
            </div>
          </div>
          
          <!-- 喜欢礼物 -->
          <div>
            <div class="font-semibold text-green-600 mb-1">👍 喜欢（+45点）：</div>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="gift in npc.likes" 
                :key="gift"
                class="px-2 py-0.5 bg-green-100 border border-green-200 rounded text-xs"
              >
                {{ gift }}
              </span>
            </div>
          </div>
          
          <!-- 讨厌礼物 -->
          <div v-if="npc.hates.length > 0">
            <div class="font-semibold text-gray-600 mb-1">❌ 讨厌：</div>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="gift in npc.hates" 
                :key="gift"
                class="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs"
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

