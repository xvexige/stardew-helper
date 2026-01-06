// 星露谷树木数据
export const trees = {
  普通树木: [
    { name: "枫树", product: "枫糖浆（每9天1次）", goldChance: "无", unlock: "小镇、森林、农场均可种植", note: "枫糖浆可制作枫糖棒（山姆最爱）" },
    { name: "橡树", product: "橡树树脂（每7-8天1次）", goldChance: "无", unlock: "小镇、森林、农场均可种植", note: "橡树树脂是酒桶制作核心材料" },
    { name: "松树", product: "松焦油（每5-6天1次）", goldChance: "无", unlock: "小镇、森林、农场、煤矿森林均可种植", note: "松焦油是蜂箱制作材料" },
    { name: "桃花心木", product: "树液（每日1次）", goldChance: "无", unlock: "姜岛（老虎史莱姆区、挖掘点）、秘密森林史莱姆掉落种子", note: "砍伐产出硬木10个" },
    { name: "蘑菇树", product: "普通蘑菇/红蘑菇/紫蘑菇（每7天1次）", goldChance: "无", unlock: "秋季随机事件生成、蘑菇树种子种植", note: "冬季变为树桩，次年春季重生" },
    { name: "棕榈树", product: "椰子（概率掉落）", goldChance: "无", unlock: "沙漠、姜岛", note: "无种子，无法移植" },
    { name: "神秘树", product: "神秘糖浆（每7天1次）", goldChance: "无", unlock: "种植神秘树种获得（采集精通后制作）", note: "1.6版本新增，神秘糖浆价值500金" },
    { name: "绿雨树", product: "苔藓、木材、树液", goldChance: "无", unlock: "绿雨天自然生成、长满苔藓的种子种植", note: "1.6版本新增，摇动概率掉落长满苔藓的种子" }
  ],
  果树: [
    { name: "苹果树", product: "苹果（每日1个）", goldChance: "无", unlock: "种植苹果树苗（28天成熟）", note: "秋季结果；可制作苹果酒" },
    { name: "樱桃树", product: "樱桃（每日1个）", goldChance: "无", unlock: "种植樱桃树苗（28天成熟）", note: "春季结果；可制作樱桃炸弹" },
    { name: "橙树", product: "橙子（每日1个）", goldChance: "无", unlock: "种植橙树树苗（28天成熟）", note: "夏季结果；可制作椰汁汤" },
    { name: "桃子树", product: "桃子（每日1个）", goldChance: "无", unlock: "种植桃子树苗（28天成熟）", note: "夏季结果；罗宾最爱" },
    { name: "石榴树", product: "石榴（每日1个）", goldChance: "无", unlock: "种植石榴树苗（28天成熟）", note: "秋季结果；艾利欧特最爱" },
    { name: "芒果树", product: "芒果（每日1个）", goldChance: "无", unlock: "种植芒果树苗（28天成熟）", note: "姜岛任意季节结果；雷欧最爱" },
    { name: "香蕉树", product: "香蕉（每日1个）", goldChance: "无", unlock: "种植香蕉树苗（28天成熟）", note: "姜岛任意季节结果；可制作香蕉布丁" }
  ]
};

// 获取所有树木类型
export function getTreeTypes() {
  return Object.keys(trees);
}

// 根据类型获取树木列表
export function getTreesByType(type) {
  return trees[type] || [];
}

// 根据名称获取树木信息
export function getTreeInfo(treeName) {
  for (const type in trees) {
    const tree = trees[type].find(t => t.name === treeName);
    if (tree) {
      return { ...tree, type };
    }
  }
  return null;
}