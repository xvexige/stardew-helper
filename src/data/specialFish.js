// 特殊鱼类数据（需要特定时间、天气、地点的鱼类）
import { fish } from './fish';

// 提取特殊鱼类（有特定时间、天气或地点限制的）
export function getSpecialFish(season, day) {
  const seasonFish = fish[season] || [];
  
  // 筛选出有特殊条件的鱼类
  return seasonFish.filter(f => {
    // 有特定时间限制（不是全天）
    const hasTimeLimit = f.time !== "全天";
    // 有天气限制（不是任意）
    const hasWeatherLimit = f.weather !== "任意";
    // 有特殊地点要求
    const hasSpecialLocation = f.location.includes("秘密") || 
                               f.location.includes("矿井") || 
                               f.location.includes("最北");
    
    return hasTimeLimit || hasWeatherLimit || hasSpecialLocation;
  });
}

// 获取某天的特殊鱼类（根据天气条件）
export function getSpecialFishForDay(season, day, weather = "晴") {
  const specialFish = getSpecialFish(season);
  
  return specialFish.filter(f => {
    // 检查天气条件
    if (f.weather !== "任意" && f.weather !== weather) {
      return false;
    }
    
    // 检查时间条件（这里简化处理，实际游戏中需要根据具体时间）
    // 可以根据需要扩展更精确的时间判断
    
    return true;
  });
}

// 所有特殊鱼类列表（用于显示）
export const allSpecialFish = {
  春: [
    { name: "鲶鱼", time: "全天", weather: "雨", location: "河流/秘密森林池塘", note: "雨天限定" },
    { name: "西鲱", time: "9am-2am", weather: "雨", location: "河流", note: "雨天限定" },
    { name: "鳗鱼", time: "4pm-2am", weather: "雨", location: "海洋", note: "雨天限定" }
  ],
  夏: [
    { name: "河豚", time: "12pm-4pm", weather: "晴", location: "海洋", note: "时间限定，难度高" }
  ],
  秋: [
    { name: "大眼鱼", time: "12pm-2am", weather: "雨", location: "淡水区", note: "雨天限定" }
  ],
  冬: [
    { name: "冰川鱼", time: "全天", weather: "晴", location: "矿井池塘", note: "铱竿+鱼饵，难度高" }
  ]
};

