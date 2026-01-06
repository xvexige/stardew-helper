// 星露谷全地点营业时间数据
export const businessHours = [
  {
    name: "皮埃尔杂货店",
    category: "商店类",
    open: 9,
    close: 17,
    offDays: [3], // 周三（社区中心修复后无休）
    holidays: true, // 所有节日关闭
    special: [
      { date: "春15", note: "巴士修复后去沙漠节" },
      { note: "小镇钥匙可提前进店" }
    ],
    icon: "🏪"
  },
  {
    name: "Joja超市",
    category: "商店类",
    open: 9,
    close: 23,
    offDays: [],
    holidays: true,
    special: [
      { note: "社区中心修复后永久关闭" },
      { note: "小镇钥匙可延长至6am-2am" }
    ],
    icon: "🏬"
  },
  {
    name: "铁匠铺",
    category: "服务类",
    open: 9,
    close: 16,
    offDays: [5], // 周五（社区中心修复后）
    holidays: true,
    special: [
      { date: "冬16", time: "10:30", note: "后去体检不营业" },
      { date: "春16", note: "沙漠节不营业" }
    ],
    icon: "🛠️"
  },
  {
    name: "木匠商店",
    category: "服务类",
    open: 9,
    close: 17,
    offDays: [2], // 周二
    holidays: true,
    special: [
      { day: 5, note: "周五4pm提前下班" },
      { date: "夏18", note: "罗宾休息" },
      { note: "施工时无法交易" }
    ],
    icon: "🔨"
  },
  {
    name: "鱼店（威利）",
    category: "服务类",
    open: 9,
    close: 17,
    offDays: [6], // 周六
    holidays: true,
    special: [
      { date: "春9", time: "10am", note: "后下班" },
      { date: "春15-17", note: "沙漠节不营业" },
      { note: "姜岛开通后8am开门" }
    ],
    icon: "🐟"
  },
  {
    name: "玛妮牧场",
    category: "商店类",
    open: 9,
    close: 16,
    offDays: [1, 2], // 周一、周二
    holidays: true,
    special: [
      { date: "秋18", note: "休息" },
      { date: "冬18", note: "休息" },
      { note: "读完动物图鉴后可随时进店" }
    ],
    icon: "🐄"
  },
  {
    name: "星之果实餐吧",
    category: "商店类",
    open: 12,
    close: 24,
    offDays: [],
    holidays: true,
    special: [
      { date: "秋4", time: "12pm", note: "开门，4:30pm后可购物" }
    ],
    icon: "🍺"
  },
  {
    name: "哈维诊所",
    category: "服务类",
    open: 9,
    close: 15,
    offDays: [],
    holidays: true,
    special: [
      { day: 6, note: "周六不可购物" },
      { note: "部分日期仅营业至12pm" }
    ],
    icon: "🏥"
  },
  {
    name: "法师塔",
    category: "特殊场所",
    open: 6,
    close: 23,
    offDays: [],
    holidays: false,
    special: [
      { note: "随时可买配方与道具" }
    ],
    icon: "🔮"
  },
  {
    name: "绿洲（沙漠）",
    category: "特殊场所",
    open: 9,
    close: 23.83, // 11:50pm
    offDays: [],
    holidays: false,
    special: [
      { date: "夏11", note: "休息" },
      { date: "春25", note: "休息" },
      { note: "完成金库献祭修复巴士后开放" }
    ],
    icon: "🏜️"
  },
  {
    name: "探险家公会",
    category: "特殊场所",
    open: 14,
    close: 22,
    offDays: [],
    holidays: false,
    special: [
      { note: "矿井探索必备，卖炸弹与装备" }
    ],
    icon: "⚔️"
  },
  {
    name: "旅行货车",
    category: "特殊场所",
    open: 6,
    close: 20,
    offDays: [],
    holidays: false,
    special: [
      { day: 5, note: "每周五出现" },
      { day: 7, note: "每周日出现" },
      { note: "煤矿森林；随机刷新稀有物品" }
    ],
    icon: "🚚"
  },
  {
    name: "冰淇淋摊",
    category: "商店类",
    open: 13,
    close: 17,
    offDays: [3], // 周三
    holidays: false,
    special: [
      { season: "夏", note: "仅夏季营业" },
      { weather: "雨", note: "雨天休息" },
      { date: "夏16", note: "亚历克斯在岗" }
    ],
    icon: "🍦"
  }
];

// 节日数据
export const festivals = {
  "春13": { name: "复活节", allClosed: true },
  "春15": { name: "花舞节", allClosed: false },
  "春16": { name: "沙漠节", allClosed: false },
  "春24": { name: "蛋蛋节", allClosed: true },
  "夏11": { name: "夏威夷宴会", allClosed: true },
  "夏28": { name: "月光水母节", allClosed: true },
  "秋16": { name: "星露谷展览会", allClosed: true },
  "秋27": { name: "万灵节", allClosed: true },
  "冬8": { name: "冰雪节", allClosed: true },
  "冬25": { name: "冬日星盛宴", allClosed: true }
};

