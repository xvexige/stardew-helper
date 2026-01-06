// 星露谷畜牧数据
export const livestock = {
  鸡: [
    { name: "普通鸡", product: "鸡蛋（每日1个）", goldChance: "20%", autoCollector: "铜锭×1、木材×50、石头×10（耕种10级后玛妮牧场购买，2500金）", unlock: "玛妮牧场购买，3000金/只", note: "基础鸡类，可升级为大型鸡舍" },
    { name: "棕色鸡", product: "鸡蛋（每日1个）", goldChance: "20%", autoCollector: "同上", unlock: "玛妮牧场购买，3000金/只", note: "与普通鸡产出相同，外观不同" },
    { name: "金色鸡", product: "金色鸡蛋（每日1个）", goldChance: "30%", autoCollector: "同上", unlock: "完成\"蛋的专家\"成就", note: "1.6版本新增，产出金色鸡蛋" },
    { name: "虚空鸡", product: "虚空蛋（每日1个）", goldChance: "25%", autoCollector: "同上", unlock: "孵化虚空蛋获得", note: "1.6版本优化，孵化概率提升" }
  ],
  鸭: [
    { name: "鸭", product: "鸭蛋（每2天1个）、鸭毛（每4天1个）", goldChance: "25%（鸭蛋）、15%（鸭毛）", autoCollector: "同上", unlock: "玛妮牧场购买，4000金/只；需升级鸡舍至大型鸡舍", note: "鸭毛可用于制作高级料理" }
  ],
  兔子: [
    { name: "兔子", product: "兔子毛（每4天1个）、兔子的脚（满心后概率产出）", goldChance: "20%（兔子毛）、10%（兔子的脚）", autoCollector: "同上", unlock: "玛妮牧场购买，8000金/只；需升级鸡舍至豪华鸡舍", note: "兔子的脚是刘易斯最爱" }
  ],
  恐龙: [
    { name: "恐龙", product: "恐龙蛋（每7天1个）", goldChance: "15%", autoCollector: "同上", unlock: "孵化恐龙蛋获得；需大型鸡舍", note: "恐龙蛋可制作恐龙蛋黄酱" }
  ],
  奶牛: [
    { name: "普通奶牛", product: "牛奶（每日1个）", goldChance: "25%（普通牛奶）、30%（大瓶牛奶）", autoCollector: "同上", unlock: "玛妮牧场购买，6000金/只；需建造牛舍", note: "牛奶可制作奶酪" },
    { name: "棕色奶牛", product: "牛奶（每日1个）", goldChance: "25%（普通牛奶）、30%（大瓶牛奶）", autoCollector: "同上", unlock: "玛妮牧场购买，6000金/只；需建造牛舍", note: "与普通奶牛产出相同，外观不同" }
  ],
  山羊: [
    { name: "山羊", product: "羊奶（每2天1个）", goldChance: "25%（羊奶）、30%（大瓶羊奶）", autoCollector: "同上", unlock: "玛妮牧场购买，8000金/只；需升级牛舍至大型牛舍", note: "羊奶可制作山羊奶酪（莉亚最爱）" }
  ],
  绵羊: [
    { name: "绵羊", product: "羊毛（每3天1个）", goldChance: "20%（普通羊毛）、30%（牧羊人职业）", autoCollector: "同上", unlock: "玛妮牧场购买，8000金/只；需升级牛舍至大型牛舍", note: "羊毛可制作布料（艾米丽最爱）" }
  ],
  猪: [
    { name: "猪", product: "松露（户外放养时产出）", goldChance: "15%（普通松露）、25%（铱星松露）", autoCollector: "同上", unlock: "玛妮牧场购买，12000金/只；需升级牛舍至豪华牛舍", note: "1.6版本植物学家职业概率提升至50%" }
  ],
  鸵鸟: [
    { name: "鸵鸟", product: "鸵鸟蛋（每7天1个）", goldChance: "20%（金星鸵鸟蛋）、10%（铱星鸵鸟蛋）", autoCollector: "同上", unlock: "姜岛获取鸵鸟蛋，孵化后获得；需豪华牛舍", note: "1.6版本新增，鸵鸟蛋可制作10个蛋黄酱" }
  ]
};

// 获取所有畜牧类型
export function getLivestockTypes() {
  return Object.keys(livestock);
}

// 根据类型获取畜牧列表
export function getLivestockByType(type) {
  return livestock[type] || [];
}

// 根据名称获取畜牧信息
export function getLivestockInfo(livestockName) {
  for (const type in livestock) {
    const animal = livestock[type].find(a => a.name === livestockName);
    if (animal) {
      return { ...animal, type };
    }
  }
  return null;
}