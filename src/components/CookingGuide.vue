<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-6 text-center text-amber-700">食谱图鉴</h2>
    
    <!-- 筛选栏 -->
    <div class="mb-6 flex flex-wrap gap-4 justify-center">
      <div class="w-full md:w-auto">
        <label class="block text-sm font-medium text-gray-700 mb-1">筛选方式</label>
        <select v-model="selectedFilter" class="w-full md:w-64 p-2 border border-gray-300 rounded-md bg-amber-50">
          <option value="all">所有食谱</option>
          <option value="initial">初始解锁</option>
          <option value="kitchen">升级农舍厨房后解锁</option>
          <option value="pierre">皮埃尔商店购买</option>
          <option value="gus">酒吧格斯售卖</option>
        </select>
      </div>
      
      <div class="w-full md:w-auto">
        <label class="block text-sm font-medium text-gray-700 mb-1">效果排序</label>
        <select v-model="sortOrder" class="w-full md:w-48 p-2 border border-gray-300 rounded-md bg-amber-50">
          <option value="default">默认顺序</option>
          <option value="desc">效果从高到低</option>
          <option value="asc">效果从低到高</option>
        </select>
      </div>
    </div>
    
    <!-- 食谱列表 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="recipe in filteredRecipes" :key="recipe.name" class="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
        <h3 class="text-lg font-semibold text-amber-800 mb-2">{{ recipe.name }}</h3>
        <div class="text-sm text-gray-600 mb-1">
          <span class="font-medium">获取方式：</span>{{ recipe.recipeSource }}
        </div>
        <div class="text-sm text-gray-600 mb-1">
          <span class="font-medium">所需材料：</span>{{ recipe.ingredients }}
        </div>
        <div class="text-sm text-gray-600 mb-1">
          <span class="font-medium">效果：</span>{{ recipe.effects }} (生命值+能量值)
        </div>
        <div class="text-sm text-gray-600 mb-2">
          <span class="font-medium">备注：</span>{{ recipe.note }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getAllRecipes, getRecipesBySource, getRecipesSortedByEffects } from '../data/cookingRecipes';

// 响应式变量
const selectedFilter = ref('all');
const sortOrder = ref('default');

// 计算属性：筛选并排序后的食谱
const filteredRecipes = computed(() => {
  let result = getAllRecipes();
  
  // 应用筛选
  if (selectedFilter.value !== 'all') {
    result = getRecipesBySource(
      selectedFilter.value === 'initial' ? '初始解锁' :
      selectedFilter.value === 'kitchen' ? '升级农舍厨房后解锁' :
      selectedFilter.value === 'pierre' ? '皮埃尔商店购买' :
      selectedFilter.value === 'gus' ? '酒吧格斯售卖' : ''
    );
  }
  
  // 应用排序
  if (sortOrder.value === 'desc') {
    return [...result].sort((a, b) => {
      const [aHealth, aEnergy] = a.effects.split('+').map(Number);
      const [bHealth, bEnergy] = b.effects.split('+').map(Number);
      return (bHealth + bEnergy) - (aHealth + aEnergy);
    });
  } else if (sortOrder.value === 'asc') {
    return [...result].sort((a, b) => {
      const [aHealth, aEnergy] = a.effects.split('+').map(Number);
      const [bHealth, bEnergy] = b.effects.split('+').map(Number);
      return (aHealth + aEnergy) - (bHealth + bEnergy);
    });
  }
  
  return result;
});
</script>

<style scoped>
/* 组件特定样式可以在这里添加 */
</style>