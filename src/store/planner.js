import { reactive } from 'vue';

export const planner = reactive({
  tasks: [
    // 示例数据：{ day: 1, type: 'harvest', label: '防风草', color: 'bg-green-400' }
  ],
  addTask(day, type, label, duration) {
    const harvestDay = day + duration;
    if (harvestDay <= 28) {
      this.tasks.push({
        day: harvestDay,
        type: type,
        label: label,
        color: type === 'harvest' ? 'bg-green-500' : 'bg-red-500'
      });
    }
  }
});