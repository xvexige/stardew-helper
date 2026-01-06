<script setup>
// 定义接收的属性和发送的事件
defineProps(['activeDay'])
defineEmits(['selectDay'])
</script>

<template>
  <div class="bg-white p-2 rounded shadow-inner">
    <div class="grid grid-cols-7 gap-1 mb-1 text-center font-bold text-gray-400 text-xs">
      <div v-for="d in ['一','二','三','四','五','六','日']" :key="d">{{ d }}</div>
    </div>
    
    <div class="grid grid-cols-7 gap-1">
      <div v-for="n in 28" :key="n" 
           @click="$emit('selectDay', n)"
           :class="[
             'h-16 border rounded relative cursor-pointer transition-all p-1',
             activeDay === n ? 'border-sv-border bg-orange-100 ring-2 ring-orange-300 z-10' : 'border-gray-100 hover:bg-orange-50'
           ]">
        <span class="text-[10px]" :class="activeDay === n ? 'font-bold text-sv-border' : 'text-gray-400'">{{ n }}</span>
        
        <div v-if="n === 13" class="w-full h-1 bg-yellow-400 rounded-full mt-2"></div>
      </div>
    </div>
  </div>
</template>