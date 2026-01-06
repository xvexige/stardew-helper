// 生日数据（按季节分类）
export const birthdayData = {
  春: {
    1: [{ name: "潘姆" }],
    7: [{ name: "刘易斯" }],
    14: [{ name: "海莉" }],
    20: [{ name: "谢恩" }, { name: "艾芙琳" }],
    23: [{ name: "莉亚" }],
    26: [{ name: "皮埃尔" }],
    27: [{ name: "艾米丽" }]
  },
  夏: {
    4: [{ name: "贾斯" }],
    10: [{ name: "玛鲁" }, { name: "文森特" }],
    13: [{ name: "亚历克斯" }],
    15: [{ name: "桑迪" }],
    17: [{ name: "山姆" }, { name: "威利" }],
    22: [{ name: "矮人" }],
    26: [{ name: "雷欧" }]
  },
  秋: {
    2: [{ name: "潘妮" }],
    5: [{ name: "艾利欧特" }],
    13: [{ name: "阿比盖尔" }],
    18: [{ name: "玛妮" }],
    21: [{ name: "罗宾" }],
    24: [{ name: "乔治" }]
  },
  冬: {
    1: [{ name: "科罗布斯" }],
    10: [{ name: "塞巴斯蒂安" }],
    14: [{ name: "哈维" }],
    15: [{ name: "老罗伊" }],
    20: [{ name: "格斯" }],
    26: [{ name: "克林特" }]
  }
};

// 节日数据（按季节）
export const festivalData = {
  春: [
    { day: 13, name: "复活节", allClosed: true },
    { day: 15, name: "花舞节", allClosed: false },
    { day: 24, name: "蛋蛋节", allClosed: true }
  ],
  夏: [
    { day: 11, name: "夏威夷宴会", allClosed: true },
    { day: 28, name: "月光水母节", allClosed: true }
  ],
  秋: [
    { day: 16, name: "星露谷展览会", allClosed: true },
    { day: 27, name: "万灵节", allClosed: true }
  ],
  冬: [
    { day: 8, name: "冰雪节", allClosed: true },
    { day: 25, name: "冬日星盛宴", allClosed: true }
  ]
};
