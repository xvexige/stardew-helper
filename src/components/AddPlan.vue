<script setup>
import { ref, computed, watch } from 'vue';
import { planner } from '../data/plannerData';
import { crops, getCropInfo } from '../data/crops';
import { brewingItems } from '../data/brewing';
import { fertilizers, professions, calculateGrowthTime } from '../data/fertilizers';
import { brewingLocations, getDefaultLocation } from '../data/locations';

const props = defineProps(['currentDay', 'season', 'initialType']);
const emit = defineEmits(['close']);

const taskType = ref(props.initialType || 'harvest'); // harvest 或 wine

// 当initialType改变时，更新taskType
watch(() => props.initialType, (newType) => {
  if (newType) {
    taskType.value = newType;
  }
});
const cropType = ref('防风草');
const duration = ref(4);

// 肥料和地点选择
const selectedFertilizer = ref('无肥料');
const selectedLocation = ref(getDefaultLocation());
const selectedProfession = ref('none');
const customLocationName = ref('');

// 所有可用地点（包括自定义）
const allLocations = computed(() => {
  return [...brewingLocations, ...planner.customLocations.map(name => ({
    name: name,
    icon: "📍",
    note: "自定义区域"
  }))];
});

// 获取当前季节的作物列表
const seasonCrops = computed(() => crops[props.season] || []);

// 常用作物快速选择（从当前季节作物中获取）
const quickCrops = computed(() => {
  return seasonCrops.value.map(crop => ({
    name: crop.name,
    days: crop.days,
    harvestCycle: crop.harvestCycle
  }));
});

// 常用酿造时间（从酿造品数据中获取）
const wineDurations = computed(() => {
  return brewingItems.map(item => ({
    name: item.name,
    days: item.days,
    ingredient: item.ingredient,
    type: item.type
  }));
});

// 当前选择的作物信息
const currentCropInfo = computed(() => {
  if (taskType.value === 'harvest') {
    return getCropInfo(cropType.value) || seasonCrops.value.find(c => c.name === cropType.value);
  }
  return null;
});

// 当前选择的酿造品信息
const currentBrewingInfo = computed(() => {
  if (taskType.value === 'wine') {
    return brewingItems.find(b => b.name === cropType.value);
  }
  return null;
});

// 是否是多次收获作物
const isMultiHarvest = computed(() => {
  return currentCropInfo.value && currentCropInfo.value.harvestCycle && currentCropInfo.value.harvestCycle > 0;
});

// 计算实际生长时间（考虑肥料和职业）
const actualDuration = computed(() => {
  if (taskType.value === 'harvest' && currentCropInfo.value) {
    const baseDays = currentCropInfo.value.days;
    return calculateGrowthTime(baseDays, selectedFertilizer.value, selectedProfession.value);
  }
  return duration.value;
});

const harvestDay = computed(() => {
  const day = props.currentDay + actualDuration.value;
  return day <= 28 ? day : null;
});

// 计算后续收获日期（使用实际天数计算）
const futureHarvestDays = computed(() => {
  if (!isMultiHarvest.value || !harvestDay.value) return [];
  const days = [];
  let nextDay = harvestDay.value + currentCropInfo.value.harvestCycle;
  while (nextDay <= 28) {
    days.push(nextDay);
    nextDay += currentCropInfo.value.harvestCycle;
  }
  return days;
});

// 添加自定义地点
const handleAddCustomLocation = () => {
  if (customLocationName.value.trim()) {
    planner.addCustomLocation(customLocationName.value.trim());
    selectedLocation.value = customLocationName.value.trim();
    customLocationName.value = '';
  }
};

const handleAdd = () => {
  if (!harvestDay.value) {
    alert('收获日期超出当月范围！');
    return;
  }
  
  // 获取收获周期
  const harvestCycle = isMultiHarvest.value ? currentCropInfo.value.harvestCycle : null;
  
  // 获取基础天数
  const baseDays = taskType.value === 'harvest' && currentCropInfo.value 
    ? currentCropInfo.value.days 
    : (taskType.value === 'wine' && currentBrewingInfo.value 
      ? currentBrewingInfo.value.days 
      : duration.value);
  
  // 获取地点（仅酿酒需要）
  const location = taskType.value === 'wine' ? selectedLocation.value : null;
  
  planner.addTask(
    props.currentDay, 
    taskType.value, 
    cropType.value, 
    actualDuration.value, // 使用计算后的实际天数
    props.season, // 传递季节信息
    harvestCycle, // 传递收获周期
    taskType.value === 'harvest' ? selectedFertilizer.value : null, // 肥料
    location, // 地点
    taskType.value === 'harvest' ? selectedProfession.value : null, // 职业
    baseDays // 基础天数
  );
  
  // 重置表单
  cropType.value = '防风草';
  duration.value = 4;
  selectedFertilizer.value = '无肥料';
  selectedLocation.value = getDefaultLocation();
  selectedProfession.value = 'none';
  
  // 显示成功消息
  if (isMultiHarvest.value && futureHarvestDays.value.length > 0) {
    const days = [harvestDay.value, ...futureHarvestDays.value].join('、');
    const fertInfo = selectedFertilizer.value !== '无肥料' ? `（${selectedFertilizer.value}）` : '';
    alert(`已添加${cropType.value}的收获提醒${fertInfo}！\n收获日期：第${days}天（每${harvestCycle}天收获一次）`);
  } else if (taskType.value === 'wine') {
    alert(`已添加${cropType.value}的酿造提醒！\n地点：${location}\n完成日期：第${harvestDay.value}天`);
  }
  
  // 关闭弹窗
  emit('close');
};

const selectQuickCrop = (crop) => {
  cropType.value = crop.name;
  // duration会通过actualDuration自动计算，这里设置基础值
  // 实际显示的天数会根据肥料和职业自动计算
};

const selectWine = (wine) => {
  taskType.value = 'wine';
  cropType.value = wine.name;
  duration.value = wine.days;
};
</script>

<template>
  <div class="space-y-3">
    <!-- 任务类型选择 -->
    <div class="flex gap-2">
      <button
        @click="taskType = 'harvest'"
        :class="taskType === 'harvest' ? 'sv-button' : 'bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm'"
        class="text-sm"
      >
        🌱 种植
      </button>
      <button
        @click="taskType = 'wine'"
        :class="taskType === 'wine' ? 'sv-button' : 'bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm'"
        class="text-sm"
      >
        🍷 酿酒
      </button>
    </div>

    <!-- 种植模式 -->
    <div v-if="taskType === 'harvest'" class="space-y-2">
      <label class="text-xs font-bold text-sv-border">快速选择作物：</label>
      <div class="flex flex-wrap gap-1">
        <button
          v-for="crop in quickCrops"
          :key="crop.name"
          @click="selectQuickCrop(crop)"
          class="px-2 py-1 bg-green-100 hover:bg-green-200 rounded text-xs border border-green-300"
        >
          {{ crop.name }}({{ crop.days }}天)
        </button>
      </div>
      
      <div class="flex flex-col gap-2">
        <label class="text-xs font-bold text-sv-border">作物名称</label>
        <input v-model="cropType" class="border-2 border-sv-border p-1 text-sm rounded bg-white" placeholder="输入作物名称" />
        
        <label class="text-xs font-bold text-sv-border">肥料选择</label>
        <select v-model="selectedFertilizer" class="border-2 border-sv-border p-1 text-sm rounded bg-white">
          <option v-for="fert in fertilizers" :key="fert.name" :value="fert.name">
            {{ fert.name }} {{ fert.note }}
          </option>
        </select>
        
        <label class="text-xs font-bold text-sv-border">职业选择</label>
        <select v-model="selectedProfession" class="border-2 border-sv-border p-1 text-sm rounded bg-white">
          <option v-for="(prof, key) in professions" :key="key" :value="key">
            {{ prof.name }} {{ prof.note }}
          </option>
        </select>
        
        <div class="text-xs text-gray-600">
          <div>基础天数：{{ currentCropInfo?.days || duration }}天</div>
          <div class="font-semibold text-green-600">
            实际天数：{{ actualDuration }}天
            <span v-if="actualDuration < (currentCropInfo?.days || duration)" class="text-green-500">
              （节省{{ (currentCropInfo?.days || duration) - actualDuration }}天）
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 酿酒模式 -->
    <div v-if="taskType === 'wine'" class="space-y-2">
      <label class="text-xs font-bold text-sv-border">快速选择：</label>
      <div class="flex flex-wrap gap-1">
        <button
          v-for="wine in wineDurations"
          :key="wine.name"
          @click="selectWine(wine)"
          class="px-2 py-1 bg-red-100 hover:bg-red-200 rounded text-xs border border-red-300"
          :title="wine.ingredient ? `原料：${wine.ingredient}` : ''"
        >
          {{ wine.name }}({{ wine.days }}天)
        </button>
      </div>
      
      <div class="flex flex-col gap-2">
        <label class="text-xs font-bold text-sv-border">产品名称</label>
        <input v-model="cropType" class="border-2 border-sv-border p-1 text-sm rounded bg-white" placeholder="输入产品名称" />
        
        <label class="text-xs font-bold text-sv-border">酒桶位置</label>
        <select v-model="selectedLocation" class="border-2 border-sv-border p-1 text-sm rounded bg-white">
          <option v-for="loc in allLocations" :key="loc.name" :value="loc.name">
            {{ loc.icon }} {{ loc.name }}
          </option>
        </select>
        
        <!-- 自定义地点输入 -->
        <div v-if="selectedLocation === '自定义区域'" class="flex gap-1">
          <input 
            v-model="customLocationName" 
            class="border-2 border-sv-border p-1 text-sm rounded bg-white flex-1" 
            placeholder="输入区域名称"
            @keyup.enter="handleAddCustomLocation"
          />
          <button 
            @click="handleAddCustomLocation"
            class="sv-button text-xs px-2"
          >
            添加
          </button>
        </div>
        
        <label class="text-xs font-bold text-sv-border">酿造天数</label>
        <input v-model.number="duration" type="number" min="1" max="28" class="border-2 border-sv-border p-1 text-sm rounded bg-white" />
      </div>
      
      <!-- 显示当前选择的酿造品信息 -->
      <div v-if="currentBrewingInfo" class="p-2 bg-blue-50 border border-blue-300 rounded text-xs">
        <div class="font-semibold text-blue-700">{{ currentBrewingInfo.name }}</div>
        <div class="text-blue-600 mt-1">
          <div v-if="currentBrewingInfo.ingredient">原料：{{ currentBrewingInfo.ingredient }}</div>
          <div v-if="currentBrewingInfo.note">{{ currentBrewingInfo.note }}</div>
        </div>
      </div>
    </div>
    
    <!-- 多次收获提示 -->
    <div v-if="isMultiHarvest && harvestDay" class="p-2 bg-green-50 border border-green-300 rounded text-xs">
      <div class="font-semibold text-green-700">🌱 多次收获作物</div>
      <div class="text-green-600 mt-1">
        首次收获：第{{ harvestDay }}天
      </div>
      <div v-if="futureHarvestDays.length > 0" class="text-green-600">
        后续收获：第{{ futureHarvestDays.join('、') }}天（每{{ currentCropInfo.harvestCycle }}天一次）
      </div>
    </div>
    
    <!-- 肥料和职业加成提示 -->
    <div v-if="taskType === 'harvest' && (selectedFertilizer !== '无肥料' || selectedProfession !== 'none')" class="p-2 bg-yellow-50 border border-yellow-300 rounded text-xs">
      <div class="font-semibold text-yellow-700">⚡ 加成效果</div>
      <div class="text-yellow-600 mt-1">
        <div v-if="selectedFertilizer !== '无肥料'">{{ selectedFertilizer }}</div>
        <div v-if="selectedProfession !== 'none'">{{ professions[selectedProfession].name }}</div>
        <div class="font-semibold mt-1">
          实际生长时间：{{ actualDuration }}天（基础{{ currentCropInfo?.days || duration }}天）
        </div>
      </div>
    </div>
    
    <button 
      @click="handleAdd" 
      class="sv-button w-full text-sm"
      :disabled="!harvestDay"
    >
      <span v-if="harvestDay">
        在第 {{ harvestDay }} 天添加{{ taskType === 'harvest' ? '收获' : '收酒' }}提醒
        <span v-if="isMultiHarvest">（含后续{{ futureHarvestDays.length }}次收获）</span>
      </span>
      <span v-else class="text-gray-400">
        日期超出范围
      </span>
    </button>
  </div>
</template>
