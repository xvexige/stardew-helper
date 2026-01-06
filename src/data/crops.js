// 各季节作物数据
export const crops = {
  春: [
    { name: "防风草", days: 4, harvests: 1, harvestCycle: null, note: "献祭常用", price: 35 },
    { name: "土豆", days: 6, harvests: 1, harvestCycle: null, note: "20%概率多产", price: 80 },
    { name: "野生春季种子", days: 7, harvests: 1, harvestCycle: null, note: "随机产4种春季野菜", price: 0 },
    { name: "青豆", days: 10, harvests: "多次", harvestCycle: 3, note: "成熟后每3天收1次", price: 40 },
    { name: "草莓", days: 8, harvests: "多次", harvestCycle: 4, note: "春13复活节售卖，成熟后每4天收1次", price: 120 },
    { name: "花椰菜", days: 12, harvests: 1, harvestCycle: null, note: "售价高", price: 175 }
  ],
  夏: [
    { name: "蓝莓", days: 13, harvests: "多次", harvestCycle: 4, note: "成熟后每4天收1次", price: 50 },
    { name: "啤酒花", days: 11, harvests: "多次", harvestCycle: 1, note: "每天收1次，酿酒优选", price: 25 },
    { name: "辣椒", days: 5, harvests: "多次", harvestCycle: 3, note: "成熟后每3天收1次，概率留种", price: 40 },
    { name: "杨桃", days: 13, harvests: 1, harvestCycle: null, note: "沙漠商店，售价极高", price: 750 }
  ],
  秋: [
    { name: "蔓越莓", days: 7, harvests: "多次", harvestCycle: 5, note: "成熟后每5天收1次", price: 75 },
    { name: "南瓜", days: 13, harvests: 1, harvestCycle: null, note: "可出巨型作物", price: 320 },
    { name: "玉米", days: 14, harvests: 1, harvestCycle: null, note: "春夏秋三季可种", price: 50 }
  ],
  冬: [
    { name: "冬季种子", days: 7, harvests: 1, harvestCycle: null, note: "室内或温室种植", price: 0 }
  ]
};

// 根据作物名称获取作物信息（跨季节查找）
export function getCropInfo(cropName) {
  for (const season in crops) {
    const crop = crops[season].find(c => c.name === cropName);
    if (crop) {
      return { ...crop, season };
    }
  }
  return null;
}

