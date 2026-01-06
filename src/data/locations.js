// 酿酒地点数据
export const brewingLocations = [
  {
    name: "农舍内",
    icon: "🏠",
    note: "室内酒桶"
  },
  {
    name: "农场户外",
    icon: "🌾",
    note: "户外酒桶"
  },
  {
    name: "地窖",
    icon: "🍷",
    note: "地窖木桶（可陈酿）"
  },
  {
    name: "温室",
    icon: "🌿",
    note: "温室内部酒桶"
  },
  {
    name: "棚屋",
    icon: "🏡",
    note: "棚屋内酒桶"
  },
  {
    name: "小屋",
    icon: "🏘️",
    note: "多人游戏小屋"
  },
  {
    name: "姜岛",
    icon: "🏝️",
    note: "姜岛农场区域"
  },
  {
    name: "隧道",
    icon: "🚇",
    note: "农场隧道区域"
  },
  {
    name: "自定义区域",
    icon: "📍",
    note: "自定义命名区域"
  }
];

// 获取默认地点
export function getDefaultLocation() {
  return brewingLocations[0].name;
}

