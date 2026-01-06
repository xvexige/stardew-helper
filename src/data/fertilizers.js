// 肥料数据
export const fertilizers = [
  {
    name: "无肥料",
    reduction: 0,
    note: "基础生长时间"
  },
  {
    name: "基础肥料",
    reduction: 0.10, // -10%
    note: "生长时间-10%"
  },
  {
    name: "高级生长激素",
    reduction: 0.25, // -25%
    note: "生长时间-25%"
  },
  {
    name: "顶级肥料",
    reduction: 0.33, // -33%
    note: "生长时间-33%"
  }
];

// 职业加成
export const professions = {
  agriculturist: {
    name: "农业学家",
    reduction: 0.10, // -10%
    note: "生长时间-10%"
  },
  none: {
    name: "无",
    reduction: 0,
    note: "无加成"
  }
};

// 计算实际生长时间
export function calculateGrowthTime(baseDays, fertilizer = null, profession = null) {
  let reduction = 0;
  
  if (fertilizer) {
    const fert = fertilizers.find(f => f.name === fertilizer);
    if (fert) {
      reduction += fert.reduction;
    }
  }
  
  if (profession && profession !== 'none') {
    const prof = professions[profession];
    if (prof) {
      reduction += prof.reduction;
    }
  }
  
  // 计算实际天数（向上取整）
  const actualDays = Math.ceil(baseDays * (1 - reduction));
  return Math.max(1, actualDays); // 至少1天
}

