import { reactive, watch } from 'vue';

// localStorage 键名
const STORAGE_KEY = 'stardew-helper-planner';
const LOCATIONS_KEY = 'stardew-helper-locations';

// 从 localStorage 加载数据
function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('加载计划数据失败:', error);
  }
  return [];
}

// 从 localStorage 加载自定义地点
function loadLocationsFromStorage() {
  try {
    const saved = localStorage.getItem(LOCATIONS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('加载自定义地点失败:', error);
  }
  return [];
}

// 保存到 localStorage
function saveToStorage(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('保存计划数据失败:', error);
  }
}

// 保存自定义地点到 localStorage
function saveLocationsToStorage(locations) {
  try {
    localStorage.setItem(LOCATIONS_KEY, JSON.stringify(locations));
  } catch (error) {
    console.error('保存自定义地点失败:', error);
  }
}

export const planner = reactive({
  tasks: loadFromStorage(),
  // 自定义地点列表
  customLocations: loadLocationsFromStorage(),
  
  addTask(day, type, label, duration, season = null, harvestCycle = null, fertilizer = null, location = null, profession = null, baseDays = null) {
    const harvestDay = day + duration;
    if (harvestDay <= 28) {
      // 添加首次收获任务
      this.tasks.push({
        day: harvestDay,
        type: type, // 'harvest' 或 'wine'
        label: label,
        color: type === 'harvest' ? 'bg-green-500' : 'bg-red-500',
        season: season,
        harvestCycle: harvestCycle,
        plantDay: day, // 记录种植日期，用于多次收获计算
        fertilizer: fertilizer || '无肥料',
        location: location || (type === 'wine' ? '农舍内' : null),
        profession: profession || 'none',
        baseDays: baseDays || duration, // 记录基础天数
        actualDays: duration // 实际天数（已计算加成）
      });
      
      // 如果是多次收获的作物，添加后续收获任务
      if (type === 'harvest' && harvestCycle && harvestCycle > 0) {
        let nextHarvestDay = harvestDay + harvestCycle;
        while (nextHarvestDay <= 28) {
          this.tasks.push({
            day: nextHarvestDay,
            type: type,
            label: label,
            color: 'bg-green-500',
            season: season,
            harvestCycle: harvestCycle,
            plantDay: day,
            isRepeat: true, // 标记为重复收获
            fertilizer: fertilizer || '无肥料',
            location: location,
            profession: profession || 'none',
            baseDays: baseDays || duration,
            actualDays: duration
          });
          nextHarvestDay += harvestCycle;
        }
      }
    }
    // 自动保存到本地存储
    this.save();
  },
  
  // 添加自定义地点
  addCustomLocation(name) {
    if (!this.customLocations.includes(name)) {
      this.customLocations.push(name);
      // 自动保存到本地存储
      saveLocationsToStorage(this.customLocations);
    }
  },
  
  removeTask(day, label) {
    // 移除指定日期的任务
    this.tasks = this.tasks.filter(t => !(t.day === day && t.label === label));
    // 自动保存到本地存储
    this.save();
  },
  
  removeTasksBySeason(season) {
    // 清除指定季节的所有任务（换季时作物枯萎）
    this.tasks = this.tasks.filter(t => t.season !== season);
    // 自动保存到本地存储
    this.save();
  },
  
  removeTasksByLabel(label) {
    // 移除指定作物的所有任务（包括多次收获的）
    this.tasks = this.tasks.filter(t => t.label !== label);
    // 自动保存到本地存储
    this.save();
  },
  
  // 保存到本地存储
  save() {
    saveToStorage(this.tasks);
  },
  
  // 从本地存储加载
  load() {
    this.tasks = loadFromStorage();
  },
  
  // 清除所有数据
  clear() {
    this.tasks = [];
    this.customLocations = [];
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LOCATIONS_KEY);
  }
});

// 监听 tasks 变化，自动保存（作为备用方案）
watch(() => planner.tasks, () => {
  saveToStorage(planner.tasks);
}, { deep: true });

// 监听 customLocations 变化，自动保存
watch(() => planner.customLocations, () => {
  saveLocationsToStorage(planner.customLocations);
}, { deep: true });

