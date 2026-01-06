// 酿造品数据（根据README.md）
export const brewingItems = [
  {
    name: "啤酒",
    days: 1,
    ingredient: "小麦",
    type: "酒类",
    baseValue: 200,
    note: "1天（1680分钟）"
  },
  {
    name: "淡啤酒",
    days: 2, // 1.5天约等于2天
    ingredient: "啤酒花",
    type: "酒类",
    baseValue: 300,
    note: "1.5天（2250分钟）"
  },
  {
    name: "果酒",
    days: 7,
    ingredient: "各类水果",
    type: "酒类",
    baseValue: null, // 基础价值=水果价值×3
    note: "7天（10000分钟），价值=水果×3"
  },
  {
    name: "远古水果酒",
    days: 13,
    ingredient: "远古水果",
    type: "酒类",
    baseValue: 2250,
    note: "13天"
  },
  {
    name: "果酱",
    days: 3,
    ingredient: "水果",
    type: "罐头",
    baseValue: null,
    note: "4000分钟≈3天，工匠+40%"
  },
  {
    name: "腌菜",
    days: 3,
    ingredient: "蔬菜/可腌制采集物",
    type: "罐头",
    baseValue: null,
    note: "4000分钟≈3天，工匠+40%"
  },
  {
    name: "鱼籽酱",
    days: 4,
    ingredient: "鲟鱼鱼籽",
    type: "罐头",
    baseValue: 500,
    note: "6000分钟≈4天，固定500金"
  },
  {
    name: "腌鱼籽",
    days: 3,
    ingredient: "除鲟鱼外的鱼籽",
    type: "罐头",
    baseValue: null,
    note: "4000分钟≈3天，价值=鱼籽×2"
  }
];

// 根据名称获取酿造品信息
export function getBrewingInfo(name) {
  return brewingItems.find(item => item.name === name);
}

