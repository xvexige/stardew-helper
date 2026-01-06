<script setup>
import { planner } from '../data/plannerData';
import { birthdayData } from '../data/calendarEvents';
import { festivalData } from '../data/calendarEvents';
import { allSpecialFish } from '../data/specialFish';
import { getSpecialWeather } from '../data/weather';
import { npcGifts } from '../data/npcGifts';

const props = defineProps(['activeDay', 'season', 'weather']);
const emit = defineEmits(['selectDay']);

// 星期数数组
const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

// 过滤出某天的任务
const getTasksForDay = (day) => {
  return planner.tasks.filter(t => t.day === day);
};

// 获取某天的生日
const getBirthday = (day) => {
  const seasonBirthdays = birthdayData[props.season] || {};
  return seasonBirthdays[day];
};

// 获取某天的节日
const getFestival = (day) => {
  const seasonFestivals = festivalData[props.season] || [];
  return seasonFestivals.find(f => f.day === day);
};

// 获取某天的特殊鱼类（简化处理：显示该季节的所有特殊鱼类）
const getSpecialFishForDay = (day) => {
  const seasonFish = allSpecialFish[props.season] || [];
  return seasonFish.length > 0 ? seasonFish : null;
};

// 检查某天是否有特殊鱼类
const hasSpecialFish = (day) => {
  const fish = getSpecialFishForDay(day);
  return fish && fish.length > 0;
};

// 获取某天的特殊天气
const getDaySpecialWeather = (day) => {
  return getSpecialWeather(props.season, day);
};

// 删除任务
const handleDeleteTask = (day, label, event) => {
  event.stopPropagation(); // 阻止触发日期选择
  if (confirm(`确定要删除"${label}"的提醒吗？`)) {
    planner.removeTask(day, label);
  }
};

// 获取任务提示信息
const getTaskTooltip = (task) => {
  let tooltip = task.label;
  if (task.location) {
    tooltip += `\n地点：${task.location}`;
  }
  if (task.fertilizer && task.fertilizer !== '无肥料') {
    tooltip += `\n肥料：${task.fertilizer}`;
  }
  if (task.profession && task.profession !== 'none') {
    tooltip += `\n职业：${task.profession}`;
  }
  if (task.baseDays && task.actualDays && task.baseDays !== task.actualDays) {
    tooltip += `\n基础：${task.baseDays}天 → 实际：${task.actualDays}天`;
  }
  return tooltip;
};

// 获取地点图标
const getLocationIcon = (location) => {
  const icons = {
    '农舍内': '🏠',
    '农场户外': '🌾',
    '地窖': '🍷',
    '温室': '🌿',
    '棚屋': '🏡',
    '小屋': '🏘️',
    '姜岛': '🏝️',
    '隧道': '🚇',
    '自定义区域': '📍'
  };
  return icons[location] || '📍';
};

// 计算进度百分比
const getProgressPercentage = (task, currentDay) => {
  if (!task.plantDay || !task.actualDays) return 0;
  const daysPassed = currentDay - task.plantDay;
  const progress = Math.min(100, Math.max(0, (daysPassed / task.actualDays) * 100));
  return progress;
};

// 根据NPC名称查找礼物喜好信息
const getNPCGiftInfo = (npcName) => {
  // 直接在NPC数组中查找
  return npcGifts.find(npc => npc.name === npcName) || null;
};
</script>

<template>
  <div class="bg-white p-2 rounded shadow-inner">
    <!-- 星期数标题行 -->
    <div class="grid grid-cols-7 gap-1 mb-1">
      <div 
        v-for="(weekday, index) in weekdays" 
        :key="index"
        class="text-center text-xs font-bold text-sv-border py-1"
      >
        {{ weekday }}
      </div>
    </div>
    
    <!-- 日期网格 -->
    <div class="grid grid-cols-7 gap-1">
      <div 
        v-for="n in 28" 
        :key="n" 
        @click="emit('selectDay', n)"
        :class="[ 
          activeDay === n 
            ? 'border-sv-border bg-orange-50 ring-2 ring-orange-200' 
            : 'border-gray-100 bg-white' 
        ]"
        class="h-20 border p-1 relative cursor-pointer overflow-hidden transition-all hover:bg-gray-50"
      >
        <!-- 日期数字 -->
        <span class="text-[10px] text-gray-400 font-semibold">{{ n }}</span>

        <!-- 生日标记 -->
        <div v-if="getBirthday(n)" class="absolute top-1 right-1 text-[10px]" :title="getBirthday(n).map(b => b.name).join('、') + '的生日'">
          🎂
        </div>

        <!-- 节日标记 -->
        <div v-if="getFestival(n)" class="absolute top-1 left-1 text-[10px] bg-yellow-200 px-1 rounded" :title="getFestival(n).name">
          🎉
        </div>

        <!-- 特殊天气标记 -->
        <div v-if="getDaySpecialWeather(n).length > 0" class="absolute bottom-1 left-1 flex gap-0.5">
          <div 
            v-for="(sw, idx) in getDaySpecialWeather(n)" 
            :key="idx"
            class="text-[8px]" 
            :title="sw.type.name + ' - ' + sw.reason"
          >
            {{ sw.type.icon }}
          </div>
        </div>

        <!-- 特殊鱼类标记 -->
        <div v-if="hasSpecialFish(n)" class="absolute bottom-1 right-1 text-[8px]" title="特殊鱼类">
          🐟
        </div>

        <!-- 任务列表 -->
        <div class="mt-1 space-y-0.5">
          <div 
            v-for="(task, idx) in getTasksForDay(n)" 
            :key="idx"
            :class="task.color"
            class="text-[8px] text-white px-1 rounded truncate group relative"
            :title="getTaskTooltip(task)"
          >
            <span>{{ task.label }}</span>
            <!-- 显示地点图标（仅酿酒） -->
            <span v-if="task.location" class="ml-0.5" :title="task.location">
              {{ getLocationIcon(task.location) }}
            </span>
            <!-- 显示肥料图标（仅种植） -->
            <span v-if="task.fertilizer && task.fertilizer !== '无肥料'" class="ml-0.5" :title="task.fertilizer">
              🌿
            </span>
            <!-- 删除按钮（所有任务都可删除） -->
            <button
              @click.stop="handleDeleteTask(n, task.label, $event)"
              class="absolute right-0 top-0 hidden group-hover:block bg-red-500 text-white rounded-full w-3 h-3 text-[6px] leading-none hover:bg-red-600"
              title="删除"
            >
              ×
            </button>
          </div>
        </div>
        
        <!-- 进度条（显示任务进度） -->
        <div v-for="(task, idx) in getTasksForDay(n)" :key="'progress-' + idx" class="mt-0.5">
          <div v-if="task.plantDay && task.plantDay < n" class="w-full bg-gray-200 rounded-full h-0.5">
            <div 
              :class="task.color"
              class="h-0.5 rounded-full transition-all"
              :style="{ width: getProgressPercentage(task, n) + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 图例 -->
    <div class="mt-3 flex flex-wrap gap-2 text-xs">
      <div class="flex items-center gap-1">
        <div class="w-3 h-3 bg-green-500 rounded"></div>
        <span>收菜/种植</span>
      </div>
      <div class="flex items-center gap-1">
        <div class="w-3 h-3 bg-red-500 rounded"></div>
        <span>收酒/酒桶（可删除）</span>
      </div>
      <div class="flex items-center gap-1">
        <span>🐟</span>
        <span>特殊鱼类</span>
      </div>
      <div class="flex items-center gap-1">
        <span>🎂</span>
        <span>生日</span>
      </div>
      <div class="flex items-center gap-1">
        <span>🎉</span>
        <span>节日</span>
      </div>
      <div class="flex items-center gap-1">
        <span>⛈️</span>
        <span>特殊天气</span>
      </div>
    </div>
    
    <!-- 生日详情（点击日期时显示） -->
    <div v-if="getBirthday(activeDay)" class="mt-3 p-3 bg-pink-50 border border-pink-300 rounded text-xs">
      <div class="font-semibold text-pink-700 mb-2 flex items-center gap-2">
        <span>🎂</span>
        <span>第{{ activeDay }}天 - {{ getBirthday(activeDay).map(b => b.name).join('、') }}的生日</span>
      </div>
      
      <!-- 循环显示每个生日NPC的礼物信息 -->
      <div v-for="(birthday, idx) in getBirthday(activeDay)" :key="idx" class="mb-4 pb-3 border-b border-pink-200 last:border-0 last:mb-0 last:pb-0">
        <div v-if="getNPCGiftInfo(birthday.name)" class="space-y-2">
          <div class="font-semibold text-pink-600">{{ birthday.name }}的礼物偏好：</div>
          
          <!-- 最爱礼物 -->
          <div>
            <div class="font-semibold text-red-600 mb-1">❤️ 最爱礼物（+80点，生日+8倍）：</div>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="gift in getNPCGiftInfo(birthday.name).loves" 
                :key="gift"
                class="px-2 py-0.5 bg-red-100 rounded text-xs border border-red-300"
              >
                {{ gift }}
              </span>
            </div>
          </div>
          
          <!-- 喜欢礼物 -->
          <div>
            <div class="font-semibold text-green-600 mb-1">👍 喜欢礼物（+45点）：</div>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="gift in getNPCGiftInfo(birthday.name).likes" 
                :key="gift"
                class="px-2 py-0.5 bg-green-100 rounded text-xs border border-green-300"
              >
                {{ gift }}
              </span>
            </div>
          </div>
          
          <!-- 讨厌礼物 -->
          <div v-if="getNPCGiftInfo(birthday.name).hates.length > 0">
            <div class="font-semibold text-gray-600 mb-1">❌ 讨厌礼物：</div>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="gift in getNPCGiftInfo(birthday.name).hates" 
                :key="gift"
                class="px-2 py-0.5 bg-gray-200 rounded text-xs border border-gray-300"
              >
                {{ gift }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- 如果没有找到NPC礼物信息 -->
        <div v-else class="text-pink-600">
          <div class="font-semibold mb-1">{{ birthday.name }}的礼物信息未找到</div>
        </div>
      </div>
      
      <!-- 提示 -->
      <div class="mt-2 pt-2 border-t border-pink-200 text-pink-600 text-[10px]">
        💡 生日当天送礼好感度+8倍，建议送最爱礼物！
      </div>
    </div>
    
    <!-- 特殊天气详情（点击日期时显示） -->
    <div v-if="getDaySpecialWeather(activeDay).length > 0" class="mt-3 p-2 bg-purple-50 border border-purple-300 rounded text-xs">
      <div class="font-semibold text-purple-700 mb-1">🌤️ 第{{ activeDay }}天特殊天气：</div>
      <div v-for="(sw, idx) in getDaySpecialWeather(activeDay)" :key="idx" class="text-purple-600 mb-1 pb-1 border-b border-purple-200 last:border-0">
        <div class="font-semibold">{{ sw.type.icon }} {{ sw.type.name }}</div>
        <div class="text-[10px]">{{ sw.reason }}</div>
        <div class="text-[10px] italic">{{ sw.type.note }}</div>
      </div>
    </div>
    
    <!-- 特殊鱼类详情（点击日期时显示） -->
    <div v-if="hasSpecialFish(activeDay)" class="mt-3 p-2 bg-blue-50 border border-blue-300 rounded text-xs">
      <div class="font-semibold text-blue-700 mb-1">🐟 第{{ activeDay }}天特殊鱼类：</div>
      <div v-for="fish in getSpecialFishForDay(activeDay)" :key="fish.name" class="text-blue-600 mb-1 pb-1 border-b border-blue-200 last:border-0">
        <div class="font-semibold">{{ fish.name }}</div>
        <div class="text-[10px]">时间：{{ fish.time }} | 天气：{{ fish.weather }} | 地点：{{ fish.location }}</div>
        <div class="text-[10px] italic">{{ fish.note }}</div>
      </div>
    </div>
  </div>
</template>
