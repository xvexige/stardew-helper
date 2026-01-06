// 星露谷天气数据
export const weatherTypes = {
  主世界: [
    {
      name: "晴天",
      icon: "🌞",
      code: "sunny",
      note: "基础晴天，无特殊效果",
      season: ["春", "夏", "秋", "冬"]
    },
    {
      name: "春季微风",
      icon: "🌸",
      code: "spring_breeze",
      note: "晴天变种，花粉特效",
      season: ["春"]
    },
    {
      name: "秋季微风",
      icon: "🍂",
      code: "autumn_breeze",
      note: "晴天变种，落叶特效",
      season: ["秋"]
    },
    {
      name: "雨天",
      icon: "🌧️",
      code: "rain",
      note: "自动浇地，工具耗能量增加",
      season: ["春", "夏", "秋"]
    },
    {
      name: "雷雨",
      icon: "⛈️",
      code: "storm",
      note: "雨天变种，可获闪电箭，夏季特定日期必出",
      season: ["夏"],
      specialDates: ["夏13", "夏26"] // 夏季13日和26日必出雷雨
    },
    {
      name: "绿雨（苔雨）",
      icon: "🟢",
      code: "green_rain",
      note: "夏季随机，催生野外植物，电视预报异常",
      season: ["夏"]
    },
    {
      name: "下雪",
      icon: "❄️",
      code: "snow",
      note: "冬季专属，归类为晴天类",
      season: ["冬"]
    },
    {
      name: "节日/婚礼",
      icon: "🎉",
      code: "festival",
      note: "强制晴天，婚礼显示爱心图标",
      season: ["春", "夏", "秋", "冬"]
    }
  ],
  姜岛: [
    {
      name: "晴天",
      icon: "🌞",
      code: "sunny",
      note: "基础晴天",
      season: ["春", "夏", "秋", "冬"]
    },
    {
      name: "雨天",
      icon: "🌧️",
      code: "rain",
      note: "概率约24%",
      season: ["春", "夏", "秋", "冬"]
    }
  ]
};

// 获取某天的特殊天气（根据日期和季节）
export function getSpecialWeather(season, day) {
  const specialWeathers = [];
  
  // 检查节日（强制晴天）
  const festivals = {
    "春13": "复活节",
    "春15": "花舞节",
    "春24": "蛋蛋节",
    "夏11": "夏威夷宴会",
    "夏28": "月光水母节",
    "秋16": "星露谷展览会",
    "秋27": "万灵节",
    "冬8": "冰雪节",
    "冬25": "冬日星盛宴"
  };
  
  const dateKey = `${season}${day}`;
  if (festivals[dateKey]) {
    specialWeathers.push({
      type: weatherTypes.主世界.find(w => w.code === "festival"),
      reason: festivals[dateKey]
    });
  }
  
  // 检查雷雨（夏季13日和26日必出）
  if (season === "夏" && (day === 13 || day === 26)) {
    specialWeathers.push({
      type: weatherTypes.主世界.find(w => w.code === "storm"),
      reason: "必出雷雨"
    });
  }
  
  return specialWeathers;
}

// 获取所有天气选项（根据季节筛选）
export function getWeatherOptions(season, location = "主世界") {
  const weathers = weatherTypes[location] || weatherTypes.主世界;
  return weathers.filter(w => 
    w.season.includes(season) || w.season.length === 0
  );
}

