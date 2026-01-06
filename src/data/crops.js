// 各季节作物数据
export const crops = {
  春: [
    { name: "野山葵", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 80, processedPrice: "160（腌菜）", note: "春季野外采集；皮埃尔讨厌" },
    { name: "黄水仙", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 50, processedPrice: "无", note: "春季野外采集；海莉/刘易斯喜欢" },
    { name: "韭葱", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 60, processedPrice: "120（腌菜）", note: "春季野外采集；潘妮喜欢" },
    { name: "蒲公英", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 40, processedPrice: "无", note: "春季野外采集；刘易斯喜欢" },
    { name: "防风草", type: "作物", days: 4, harvests: 1, harvestCycle: null, cost: 20, price: 35, processedPrice: "70（腌菜）", note: "腌菜价值=基础售价×2；春季献祭常用" },
    { name: "山洞萝卜", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 75, processedPrice: "150（腌菜）", note: "矿井采集；可用于制作矿工特供" },
    { name: "大黄", type: "作物", days: 8, harvests: 1, harvestCycle: null, cost: 30, price: 75, processedPrice: "225（大黄酒）", note: "可用于制作大黄派（潘妮最爱）" },
    { name: "青豆", type: "作物", days: 10, harvests: "多次", harvestCycle: 3, cost: 60, price: 40, processedPrice: "80（腌菜）", note: "连作作物，成熟后每3天收获1次" },
    { name: "草莓", type: "作物", days: 8, harvests: "多次", harvestCycle: 4, cost: 100, price: 120, processedPrice: "360（草莓酒）", note: "酿酒价值=基础售价×3；高级生长激素缩短2天（实际6天成熟）" },
    { name: "花椰菜", type: "作物", days: 14, harvests: 1, harvestCycle: null, cost: 80, price: 175, processedPrice: "350（腌菜）", note: "单季单次收获；高级生长激素缩短3天" },
    { name: "土豆", type: "作物", days: 6, harvests: 1, harvestCycle: null, cost: 50, price: 50, processedPrice: "100（腌菜）", note: "收获时概率额外产出1-2个土豆" },
    { name: "芦笋", type: "作物", days: 13, harvests: "多次", harvestCycle: 3, cost: 30, price: 120, processedPrice: "360（芦笋酒）", note: "连作作物，成熟后每3天收获1次" },
    { name: "番红花", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 60, processedPrice: "120（腌菜）", note: "春季野外采集；可用于制作番红花饭" }
  ],
  夏: [
    { name: "甜豌豆", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 50, processedPrice: "无", note: "夏季野外采集；艾米丽喜欢" },
    { name: "葡萄", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 80, processedPrice: "240（葡萄酒）", note: "夏季野外采集；可用于制作水果沙拉" },
    { name: "香味浆果", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 90, processedPrice: "270（葡萄酒）", note: "夏季野外采集；有刺激气味" },
    { name: "蓝莓", type: "作物", days: 13, harvests: "多次", harvestCycle: 4, cost: 80, price: 80, processedPrice: "240（蓝莓酒）", note: "连作作物，每4天收获1次，每次产2个" },
    { name: "杨桃", type: "作物", days: 13, harvests: 1, harvestCycle: null, cost: 400, price: 200, processedPrice: "600（杨桃酒）", note: "高级生长激素缩短3天（实际10天成熟）；酿酒性价比极高" },
    { name: "甜瓜", type: "作物", days: 13, harvests: 1, harvestCycle: null, cost: 80, price: 250, processedPrice: "750（甜瓜酒）", note: "收获时概率出巨型甜瓜（产15个）；潘妮最爱" },
    { name: "西红柿", type: "作物", days: 11, harvests: "多次", harvestCycle: 5, cost: 50, price: 60, processedPrice: "180（番茄酒）", note: "连作作物，成熟后每5天收获1次" },
    { name: "辣椒", type: "作物", days: 5, harvests: "多次", harvestCycle: 2, cost: 40, price: 40, processedPrice: "120（辣椒酒）", note: "连作作物，成熟后每2天收获1次；谢恩最爱" },
    { name: "茄子", type: "作物", days: 13, harvests: 1, harvestCycle: null, cost: 20, price: 70, processedPrice: "210（茄子酒）", note: "单季单次收获；夏季献祭可选" },
    { name: "玉米", type: "作物", days: 14, harvests: "多次", harvestCycle: null, cost: 150, price: 50, processedPrice: "150（玉米酒）", note: "跨季作物，秋季可继续生长收获" },
    { name: "啤酒花", type: "作物", days: 11, harvests: "多次", harvestCycle: 1, cost: 60, price: 30, processedPrice: "300（啤酒）", note: "连作作物，每天收获1次；啤酒价值固定300金（不随基础售价变动）" },
    { name: "咖啡豆", type: "作物", days: 13, harvests: "多次", harvestCycle: 5, cost: 250, price: 50, processedPrice: "150（咖啡）", note: "连作作物，成熟后每5天收获1次；1咖啡豆可做4杯咖啡" }
  ],
  秋: [
    { name: "南瓜", type: "作物", days: 13, harvests: 1, harvestCycle: null, cost: 100, price: 100, processedPrice: "300（南瓜酒）", note: "有概率种出巨型南瓜（产15个）；阿比盖尔最爱" },
    { name: "甜菜", type: "作物", days: 6, harvests: 1, harvestCycle: null, cost: 20, price: 100, processedPrice: "200（腌菜）", note: "收获时概率获得甜菜种子" },
    { name: "蔓越莓", type: "作物", days: 7, harvests: "多次", harvestCycle: 5, cost: 240, price: 140, processedPrice: "420（蔓越莓酒）", note: "连作作物，每5天收获1次，每次产2个" },
    { name: "朝鲜蓟", type: "作物", days: 8, harvests: 1, harvestCycle: null, cost: 30, price: 160, processedPrice: "480（朝鲜蓟酒）", note: "可用于制作蔬菜什锦盖饭（莉亚最爱）" },
    { name: "野梅", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 90, processedPrice: "180（果酱）", note: "秋季野外采集；可用于制作野梅酱" },
    { name: "榛子", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 50, processedPrice: "无", note: "秋季摇晃枫树掉落；可用于制作烤榛子" },
    { name: "黑莓", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 20, processedPrice: "40（果酱）", note: "秋季野外采集；玛鲁讨厌" },
    { name: "番红花", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 60, processedPrice: "120（腌菜）", note: "秋季野外采集；可用于制作番红花饭" },
    { name: "玉米", type: "作物", days: 14, harvests: "多次", harvestCycle: null, cost: 150, price: 50, processedPrice: "150（玉米酒）", note: "跨季作物，秋季可继续生长收获" }
  ],
  冬: [
    { name: "冬根", type: "作物", days: 6, harvests: 1, harvestCycle: null, cost: 25, price: 70, processedPrice: "140（腌菜）", note: "冬季野外可采集；冬季献祭常用" },
    { name: "雪山药", type: "作物", days: 7, harvests: 1, harvestCycle: null, cost: 30, price: 80, processedPrice: "160（腌菜）", note: "冬季野外可采集；可用于制作琉璃山药（潘姆最爱）" },
    { name: "水晶果", type: "作物", days: 7, harvests: 1, harvestCycle: null, cost: 30, price: 150, processedPrice: "450（水晶果酒）", note: "冬季野外可采集；玛鲁讨厌" },
    { name: "冬青树", type: "采集", days: 0, harvests: 1, harvestCycle: null, cost: 0, price: 20, processedPrice: "无", note: "冬季野外采集；艾米丽/阿比盖尔讨厌" }
  ],
  特殊: [
    { name: "上古水果", type: "作物", days: 28, harvests: "多次", harvestCycle: 7, cost: 1000, price: 550, processedPrice: "1650（上古酒）", note: "高级生长激素缩短7天（实际21天成熟）；全年连作，每7天收获1次" },
    { name: "仙人掌果", type: "作物", days: 12, harvests: "多次", harvestCycle: null, cost: 50, price: 200, processedPrice: "600（仙人掌果酒）", note: "沙漠专属，无需浇水；连作作物；山姆最爱" },
    { name: "菠萝", type: "作物", days: 14, harvests: "多次", harvestCycle: 5, cost: 100, price: 200, processedPrice: "600（菠萝酒）", note: "连作作物，成熟后每5天收获1次；姜岛丰收节展览奖励500金" },
    { name: "香蕉", type: "作物", days: 7, harvests: "多次", harvestCycle: 3, cost: 80, price: 150, processedPrice: "450（香蕉酒）", note: "连作作物，成熟后每3天收获1次；姜岛专属；可用于制作香蕉布丁" },
    { name: "芒果", type: "作物", days: 28, harvests: "多次", harvestCycle: null, cost: 100, price: 200, processedPrice: "600（芒果酒）", note: "姜岛专属果树；雷欧最爱；可用于制作芒果糯米饭" },
    { name: "芋头", type: "作物", days: 10, harvests: 1, harvestCycle: null, cost: 50, price: 100, processedPrice: "200（腌菜）", note: "姜岛种植；可用于制作夏威夷芋泥" }
  ],
  酿造物: [
    { name: "啤酒", type: "酿造", days: "7天", harvests: 1, harvestCycle: null, cost: 30, price: 300, processedPrice: "无", note: "放入木桶陈酿无品质提升；酿酒时间7天；谢恩最爱" },
    { name: "葡萄酒", type: "酿造", days: "14天", harvests: 1, harvestCycle: null, cost: "任意水果", price: "基础售价×3", processedPrice: "基础售价×4.5", note: "放入木桶陈酿14天升级为铱星酒（价值×1.5）" },
    { name: "苹果酒", type: "酿造", days: "14天", harvests: 1, harvestCycle: null, cost: 150, price: 250, processedPrice: "375（铱星苹果酒）", note: "需苹果（苹果树产出）；陈酿14天升级品质" },
    { name: "蜂蜜", type: "酿造", days: null, harvests: "多次", harvestCycle: 4, cost: 0, price: 140, processedPrice: "无", note: "蜂蜜价值受周围花卉影响：草莓花蜂蜜200金、向日葵蜂蜜280金" },
    { name: "松露油", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 750, price: 1065, processedPrice: "无", note: "需油压机制作；哈维最爱" },
    { name: "蜜蜂酒", type: "酿造", days: null, harvests: 1, harvestCycle: null, cost: 100, price: 200, processedPrice: "无", note: "放入木桶酿造；1.6版本新增" },
    { name: "淡啤酒", type: "酿造", days: "7天", harvests: 1, harvestCycle: null, cost: 30, price: 300, processedPrice: "无", note: "同啤酒；1.6版本新增名称" }
  ],
  腌制物: [
    { name: "腌菜", type: "腌制", days: "4天", harvests: 1, harvestCycle: null, cost: "任意蔬菜", price: "基础售价×2", processedPrice: "无", note: "放入泡菜桶腌制4天完成" },
    { name: "果酱", type: "腌制", days: "3天", harvests: 1, harvestCycle: null, cost: "任意水果", price: "基础售价×2", processedPrice: "无", note: "放入果酱桶腌制3天完成" },
    { name: "果干", type: "腌制", days: null, harvests: 1, harvestCycle: null, cost: "任意水果×5", price: "基础售价×1.5", processedPrice: "无", note: "放入脱水机制作；需5个水果制作1个果干" },
    { name: "蘑菇干货", type: "腌制", days: null, harvests: 1, harvestCycle: null, cost: "任意蘑菇", price: "基础售价×2", processedPrice: "无", note: "放入脱水机制作；连红蘑菇/紫蘑菇都可制作" }
  ],
  加工品: [
    { name: "面粉", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 25, price: 50, processedPrice: "无", note: "需磨坊加工；用于制作面包、薄煎饼" },
    { name: "蛋黄酱", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 50, price: 190, processedPrice: "285（金星蛋黄酱）", note: "放入蛋黄酱机制作；金星蛋黄酱需金星鸡蛋" },
    { name: "鸭蛋黄酱", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 75, price: 375, processedPrice: "无", note: "放入蛋黄酱机制作；艾利欧特喜欢" },
    { name: "虚空蛋黄酱", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 65, price: 275, processedPrice: "无", note: "放入蛋黄酱机制作；科罗布斯喜欢" },
    { name: "恐龙蛋黄酱", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 350, price: 800, processedPrice: "无", note: "放入蛋黄酱机制作；1.6版本新增" },
    { name: "奶酪", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 100, price: 230, processedPrice: "345（金星奶酪）", note: "放入奶酪压模制作；陈酿后价值提升" },
    { name: "山羊奶酪", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 150, price: 400, processedPrice: "600（金星山羊奶酪）", note: "放入奶酪压模制作；莉亚最爱" },
    { name: "布料", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 300, price: 470, processedPrice: "705（铱星布料）", note: "需缝纫机制作；艾米丽最爱" },
    { name: "枫糖浆", type: "加工", days: "7天", harvests: "多次", harvestCycle: 7, cost: 0, price: 200, processedPrice: "无", note: "树液采集器7天收获1次；用于制作枫糖棒（山姆最爱）" },
    { name: "橡树树脂", type: "加工", days: "7天", harvests: "多次", harvestCycle: 7, cost: 0, price: 150, processedPrice: "无", note: "树液采集器7天收获1次；酒桶制作核心材料（需10个）" },
    { name: "松焦油", type: "加工", days: "5-6天", harvests: "多次", harvestCycle: null, cost: 0, price: 100, processedPrice: "无", note: "树液采集器5-6天收获1次；蜂箱制作材料（需8个）" },
    { name: "神秘糖浆", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 0, price: 500, processedPrice: "无", note: "1.6版本新增；神秘树采集；可用于制作魔法糖冰棍" },
    { name: "葡萄干", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 50, price: 80, processedPrice: "无", note: "放入脱水机制作；可用于制作葡萄干布丁" },
    { name: "熏鱼", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: "任意鱼", price: "基础售价×1.25", processedPrice: "无", note: "放入烟熏炉制作；1.6版本新增" }
  ],
  采集品: [
    { name: "树液", type: "采集", days: 0, harvests: "多次", harvestCycle: null, cost: 0, price: 5, processedPrice: "无", note: "所有树木均可采集；用于制作肥料" },
    { name: "木材", type: "采集", days: 0, harvests: "多次", harvestCycle: null, cost: 0, price: 10, processedPrice: "无", note: "砍伐树木获得；建筑核心材料" },
    { name: "石头", type: "采集", days: 0, harvests: "多次", harvestCycle: null, cost: 0, price: 20, processedPrice: "无", note: "挖掘石头获得；建筑核心材料" },
    { name: "硬木", type: "采集", days: 0, harvests: "多次", harvestCycle: null, cost: 0, price: 150, processedPrice: "无", note: "砍伐大树桩/圆木获得；1.6版本可用于升级箱子" },
    { name: "纤维", type: "采集", days: 0, harvests: "多次", harvestCycle: null, cost: 0, price: 1, processedPrice: "无", note: "清理杂草获得；用于制作 scarecrow" },
    { name: "苔藓", type: "采集", days: 0, harvests: "多次", harvestCycle: null, cost: 0, price: 10, processedPrice: "无", note: "矿井/洞穴采集；可用于制作苔藓汤" },
    { name: "骨头碎片", type: "采集", days: 0, harvests: "多次", harvestCycle: null, cost: 0, price: 10, processedPrice: "无", note: "矿井怪物掉落；可捐赠博物馆" },
    { name: "放射性矿石", type: "采集", days: 0, harvests: "多次", harvestCycle: null, cost: 0, price: 30, processedPrice: "无", note: "矿井1-40层采集；玛鲁喜欢" },
    { name: "放射性矿锭", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 150, price: 100, processedPrice: "无", note: "熔炉冶炼；1.6版本新增" },
    { name: "火山晶石", type: "采集", days: 0, harvests: "多次", harvestCycle: null, cost: 0, price: 100, processedPrice: "无", note: "姜岛火山采集；可用于制作火山斧" }
  ],
  果树: [
    { name: "苹果", type: "果树", days: 28, harvests: "多次", harvestCycle: null, cost: 400, price: 50, processedPrice: "150（苹果酒）", note: "苹果树秋季结果；可用于制作苹果酒" },
    { name: "杏子", type: "果树", days: 28, harvests: "多次", harvestCycle: null, cost: 400, price: 60, processedPrice: "180（杏子酒）", note: "杏树春季结果；1.6版本新增果树" },
    { name: "樱桃", type: "果树", days: 28, harvests: "多次", harvestCycle: null, cost: 400, price: 80, processedPrice: "240（樱桃酒）", note: "樱桃树春季结果；可用于制作樱桃炸弹" },
    { name: "橙子", type: "果树", days: 28, harvests: "多次", harvestCycle: null, cost: 400, price: 80, processedPrice: "240（橙子酒）", note: "橙子树夏季结果；可用于制作椰汁汤" },
    { name: "桃子", type: "果树", days: 28, harvests: "多次", harvestCycle: null, cost: 400, price: 140, processedPrice: "420（桃子酒）", note: "桃子树夏季结果；罗宾最爱" },
    { name: "石榴", type: "果树", days: 28, harvests: "多次", harvestCycle: null, cost: 400, price: 100, processedPrice: "300（石榴酒）", note: "石榴树秋季结果；艾利欧特最爱" },
    { name: "香蕉", type: "果树", days: 28, harvests: "多次", harvestCycle: null, cost: 500, price: 150, processedPrice: "450（香蕉酒）", note: "香蕉树姜岛结果；可用于制作香蕉布丁" },
    { name: "芒果", type: "果树", days: 28, harvests: "多次", harvestCycle: null, cost: 500, price: 200, processedPrice: "600（芒果酒）", note: "芒果树姜岛结果；雷欧最爱" }
  ],
  畜牧产品: [
    { name: "奶酪", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 100, price: 230, processedPrice: "345（金星奶酪）", note: "放入奶酪压模制作；陈酿后价值提升" },
    { name: "山羊奶酪", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 150, price: 400, processedPrice: "600（金星山羊奶酪）", note: "放入奶酪压模制作；莉亚最爱" },
    { name: "布料", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 300, price: 470, processedPrice: "705（铱星布料）", note: "需缝纫机制作；艾米丽最爱" },
    { name: "松露", type: "畜牧", days: 0, harvests: "多次", harvestCycle: null, cost: 0, price: 625, processedPrice: "1065（松露油）", note: "猪户外放养产出；1.6版本植物学家职业金星概率50%" },
    { name: "兔子的脚", type: "畜牧", days: 0, harvests: "多次", harvestCycle: null, cost: 0, price: 1000, processedPrice: "无", note: "兔子满心后概率产出；刘易斯最爱" },
    { name: "鱼籽酱", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 500, price: 700, processedPrice: "无", note: "放入罐头瓶制作；1.6版本可用于制作高级料理" },
    { name: "腌鱼籽", type: "加工", days: null, harvests: 1, harvestCycle: null, cost: 200, price: 300, processedPrice: "无", note: "放入罐头瓶制作；1.6版本新增" }
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

// 获取所有作物类型
export function getCropTypes() {
  return Object.keys(crops);
}

// 根据类型获取作物列表
export function getCropsByType(type) {
  return crops[type] || [];
}

