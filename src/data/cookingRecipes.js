// 星露谷食谱数据
export const recipes = [
  { name: "煎鸡蛋", recipeSource: "初始解锁", ingredients: "蛋×1", effects: "20+40", note: "基础料理，所有NPC中立" },
  { name: "煎蛋卷", recipeSource: "升级农舍厨房后解锁", ingredients: "蛋×1+牛奶×1", effects: "40+80", note: "所有NPC中立，可用于制作完美早餐" },
  { name: "沙拉", recipeSource: "酒吧格斯售卖（220金）", ingredients: "野山葵×1+大葱×1+醋×1", effects: "30+60", note: "莉亚最爱，早期易获取" },
  { name: "乳酪花椰菜", recipeSource: "升级农舍厨房后解锁", ingredients: "花椰菜×1+奶酪×1", effects: "60+120", note: "玛鲁最爱，花椰菜春季种植" },
  { name: "烤鱼", recipeSource: "升级农舍厨房后解锁", ingredients: "任意鱼×1", effects: "50+100", note: "基础鱼类料理，所有NPC中立" },
  { name: "防风草汤", recipeSource: "皮埃尔商店购买食谱（200金）", ingredients: "防风草×1+醋×1", effects: "40+80", note: "春季献祭常用，所有NPC中立" },
  { name: "蔬菜杂烩", recipeSource: "升级农舍厨房后解锁", ingredients: "任意蔬菜×2+西红柿×1", effects: "70+140", note: "莉亚喜欢，蔬菜易获取" },
  { name: "完美早餐", recipeSource: "升级农舍厨房后解锁", ingredients: "煎蛋卷×1+牛奶×1+土豆×1", effects: "100+200", note: "亚历克斯/哈维最爱，能量值高" },
  { name: "炸鱿鱼", recipeSource: "升级农舍厨房后解锁", ingredients: "鱿鱼×1+面粉×1+油×1", effects: "80+160", note: "所有NPC中立，鱿鱼冬季垂钓" },
  { name: "奇怪的小面包", recipeSource: "升级农舍厨房后解锁", ingredients: "小麦粉×1+糖×1", effects: "10+20", note: "无特殊用途，所有NPC中立" },
  { name: "龙虾浓汤", recipeSource: "升级农舍厨房后解锁", ingredients: "龙虾×1+牛奶×1+洋葱×1", effects: "120+240", note: "艾利欧特最爱，龙虾蟹笼获取" },
  { name: "枫糖棒", recipeSource: "升级农舍厨房后解锁", ingredients: "枫糖浆×1+糖×1", effects: "60+120", note: "山姆最爱，枫糖浆枫树采集" },
  { name: "蟹黄糕", recipeSource: "升级农舍厨房后解锁", ingredients: "螃蟹×1+面粉×1+糖×1", effects: "100+200", note: "艾利欧特最爱，螃蟹蟹笼获取" },
  { name: "虾鸡尾酒", recipeSource: "升级农舍厨房后解锁", ingredients: "虾×1+番茄×1+醋×1", effects: "80+160", note: "所有NPC中立，虾蟹笼获取" },
  { name: "姜汁汽水", recipeSource: "升级农舍厨房后解锁", ingredients: "姜×1+糖×1+水×1", effects: "50+100", note: "所有NPC中立，姜姜岛采集" },
  { name: "香蕉布丁", recipeSource: "升级农舍厨房后解锁", ingredients: "香蕉×1+牛奶×1+糖×1", effects: "90+180", note: "阿比盖尔最爱，香蕉姜岛种植" },
  { name: "芒果糯米饭", recipeSource: "升级农舍厨房后解锁", ingredients: "芒果×1+大米×1+糖×1", effects: "110+220", note: "桑迪/雷欧最爱，芒果姜岛种植" },
  { name: "夏威夷芋泥", recipeSource: "升级农舍厨房后解锁", ingredients: "芋头×1+椰子×1+糖×1", effects: "100+200", note: "雷欧/桑迪最爱，芋头姜岛种植" },
  { name: "热带咖喱", recipeSource: "升级农舍厨房后解锁", ingredients: "任意热带水果×2+咖喱粉×1", effects: "130+260", note: "所有NPC中立，姜岛专属料理" },
  { name: "墨汁意大利饺", recipeSource: "升级农舍厨房后解锁", ingredients: "鱿鱼墨汁×1+面粉×1+奶酪×1", effects: "90+180", note: "艾利欧特喜欢，鱿鱼墨汁鱿鱼掉落" },
  { name: "幸运午餐", recipeSource: "升级农舍厨房后解锁", ingredients: "任意鱼×1+土豆×1+蛋黄酱×1", effects: "120+240", note: "所有NPC中立，能量值高" },
  { name: "炒蘑菇", recipeSource: "升级农舍厨房后解锁", ingredients: "任意蘑菇×2+油×1", effects: "70+140", note: "所有NPC中立，蘑菇野外采集" },
  { name: "披萨", recipeSource: "酒吧格斯售卖（300金）", ingredients: "面粉×1+奶酪×1+番茄×1", effects: "150+300", note: "山姆/谢恩最爱，早期易购买" },
  { name: "豆类火锅", recipeSource: "升级农舍厨房后解锁", ingredients: "青豆×1+番茄×1+洋葱×1", effects: "80+160", note: "所有NPC中立，青豆春季种植" },
  { name: "琉璃山药", recipeSource: "升级农舍厨房后解锁", ingredients: "雪山药×1+糖×1+油×1", effects: "100+200", note: "潘姆最爱，雪山药冬季采集" },
  { name: "惊喜鲤鱼", recipeSource: "升级农舍厨房后解锁", ingredients: "鲤鱼×1+任意蔬菜×1", effects: "60+120", note: "所有NPC中立，鲤鱼任意水域垂钓" },
  { name: "薯饼", recipeSource: "升级农舍厨房后解锁", ingredients: "土豆×1+油×1", effects: "70+140", note: "所有NPC中立，土豆春季种植" },
  { name: "薄煎饼", recipeSource: "升级农舍厨房后解锁", ingredients: "面粉×1+蛋×1+牛奶×1", effects: "50+100", note: "所有NPC中立，基础早餐料理" },
  { name: "鲑鱼晚餐", recipeSource: "升级农舍厨房后解锁", ingredients: "鲑鱼×1+土豆×1+油×1", effects: "140+280", note: "亚历克斯最爱，鲑鱼秋季垂钓" },
  { name: "鱼肉卷", recipeSource: "升级农舍厨房后解锁", ingredients: "任意鱼×1+面粉×1+蛋×1", effects: "90+180", note: "所有NPC中立，阿比盖尔讨厌" },
  { name: "苔藓汤", recipeSource: "升级农舍厨房后解锁", ingredients: "苔藓×1+水×1", effects: "30+60", note: "所有NPC中立，苔藓矿井采集" },
  { name: "香酥鲈鱼", recipeSource: "升级农舍厨房后解锁", ingredients: "大嘴鲈鱼×1+面粉×1+油×1", effects: "100+200", note: "所有NPC中立，大嘴鲈鱼湖泊垂钓" },
  { name: "爆炒青椒", recipeSource: "升级农舍厨房后解锁", ingredients: "辣椒×1+洋葱×1+油×1", effects: "80+160", note: "谢恩最爱，辣椒夏季种植" },
  { name: "面包", recipeSource: "升级农舍厨房后解锁", ingredients: "面粉×1", effects: "40+80", note: "基础主食，所有NPC中立" },
  { name: "椰汁汤", recipeSource: "升级农舍厨房后解锁", ingredients: "椰子×1+牛奶×1+姜×1", effects: "90+180", note: "艾利欧特最爱，椰子沙漠/姜岛采集" },
  { name: "鳟鱼汤", recipeSource: "升级农舍厨房后解锁", ingredients: "虹鳟×1+洋葱×1+牛奶×1", effects: "80+160", note: "所有NPC中立，虹鳟河流垂钓" },
  { name: "巧克力蛋糕", recipeSource: "皮埃尔商店购买食谱（500金）", ingredients: "面粉×1+糖×1+可可豆×1+蛋×1", effects: "150+300", note: "阿比盖尔/艾芙琳最爱，节日常用" },
  { name: "粉红蛋糕", recipeSource: "皮埃尔商店购买食谱（400金）", ingredients: "面粉×1+糖×1+草莓×1+蛋×1", effects: "140+280", note: "海莉/贾斯/文森特最爱，草莓春季种植" },
  { name: "大黄派", recipeSource: "皮埃尔商店购买食谱（300金）", ingredients: "大黄×1+面粉×1+糖×1", effects: "100+200", note: "潘妮最爱，大黄春季种植" },
  { name: "饼干", recipeSource: "升级农舍厨房后解锁", ingredients: "面粉×1+糖×1+蛋×1", effects: "30+60", note: "所有NPC中立，节日常用" },
  { name: "意大利面", recipeSource: "升级农舍厨房后解锁", ingredients: "面粉×1+番茄×1+奶酪×1", effects: "90+180", note: "罗宾最爱，基础意式料理" },
  { name: "炒鳗鱼", recipeSource: "升级农舍厨房后解锁", ingredients: "鳗鱼×1+大蒜×1+油×1", effects: "120+240", note: "所有NPC中立，鳗鱼雨天垂钓" },
  { name: "香辣鳗鱼", recipeSource: "升级农舍厨房后解锁", ingredients: "鳗鱼×1+辣椒×1+油×1", effects: "130+260", note: "阿比盖尔最爱，鳗鱼雨天垂钓" },
  { name: "生鱼片", recipeSource: "升级农舍厨房后解锁", ingredients: "任意鱼×1", effects: "70+140", note: "塞巴斯蒂安最爱，基础鱼类料理" },
  { name: "生鱼寿司", recipeSource: "升级农舍厨房后解锁", ingredients: "任意鱼×1+海草×1+米饭×1", effects: "80+160", note: "所有NPC中立，阿比盖尔讨厌" },
  { name: "墨西哥薄饼", recipeSource: "升级农舍厨房后解锁", ingredients: "玉米×1+豆子×1+奶酪×1", effects: "100+200", note: "所有NPC中立，玉米夏季种植" },
  { name: "红之盛宴", recipeSource: "升级农舍厨房后解锁", ingredients: "甜菜×1+南瓜×1+萝卜×1", effects: "150+300", note: "潘妮最爱，甜菜秋季种植" },
  { name: "帕尔玛奶酪茄子", recipeSource: "升级农舍厨房后解锁", ingredients: "茄子×1+奶酪×1+面粉×1", effects: "120+240", note: "所有NPC中立，茄子夏季种植" },
  { name: "大米布丁", recipeSource: "升级农舍厨房后解锁", ingredients: "大米×1+牛奶×1+糖×1", effects: "80+160", note: "所有NPC中立，大米夏季种植" },
  { name: "冰淇淋", recipeSource: "升级农舍厨房后解锁", ingredients: "牛奶×1+糖×1+蛋×1", effects: "60+120", note: "所有NPC中立，夏季清凉料理" },
  { name: "蓝莓千层酥", recipeSource: "升级农舍厨房后解锁", ingredients: "蓝莓×1+面粉×1+糖×1+蛋×1", effects: "130+260", note: "所有NPC中立，蓝莓夏季种植" },
  { name: "秋日恩赐", recipeSource: "升级农舍厨房后解锁", ingredients: "南瓜×1+苹果×1+玉米×1", effects: "140+280", note: "所有NPC中立，秋季丰收料理" },
  { name: "南瓜汤", recipeSource: "升级农舍厨房后解锁", ingredients: "南瓜×1+洋葱×1+牛奶×1", effects: "100+200", note: "塞巴斯蒂安/皮埃尔最爱，南瓜秋季种植" },
  { name: "巨无霸餐", recipeSource: "升级农舍厨房后解锁", ingredients: "汉堡排×1+面包×1+番茄×1+生菜×1", effects: "200+400", note: "哈维最爱，能量值最高料理之一" },
  { name: "红莓酱", recipeSource: "升级农舍厨房后解锁", ingredients: "蔓越莓×1+糖×1", effects: "70+140", note: "所有NPC中立，蔓越莓秋季种植" },
  { name: "塞料面包", recipeSource: "升级农舍厨房后解锁", ingredients: "面包×1+奶酪×1+蔬菜×1", effects: "110+220", note: "所有NPC中立，基础主食料理" },
  { name: "农夫午餐", recipeSource: "升级农舍厨房后解锁", ingredients: "任意蔬菜×2+蛋×1+面包×1", effects: "120+240", note: "所有NPC中立，能量值高" },
  { name: "救生汉堡", recipeSource: "升级农舍厨房后解锁", ingredients: "面包×1+肉饼×1+奶酪×1+番茄×1", effects: "180+360", note: "所有NPC中立，适合挖矿/探险" },
  { name: "海之菜肴", recipeSource: "升级农舍厨房后解锁", ingredients: "任意海鲜×2+蔬菜×1", effects: "130+260", note: "所有NPC中立，海鲜蟹笼获取" },
  { name: "矿工特供", recipeSource: "升级农舍厨房后解锁", ingredients: "山洞萝卜×1+土豆×1+洋葱×1", effects: "140+280", note: "玛鲁最爱，适合挖矿时食用" },
  { name: "块茎拼盘", recipeSource: "升级农舍厨房后解锁", ingredients: "山药×1+土豆×1+冬根×1", effects: "100+200", note: "所有NPC中立，冬季料理" },
  { name: "三倍浓缩咖啡", recipeSource: "升级农舍厨房后解锁", ingredients: "咖啡×3", effects: "20+40", note: "提神效果，所有NPC中立" },
  { name: "海泡布丁", recipeSource: "升级农舍厨房后解锁", ingredients: "午夜鲤鱼×1+牛奶×1+糖×1", effects: "120+240", note: "所有NPC中立，午夜鲤鱼夜间垂钓" },
  { name: "海藻汤", recipeSource: "升级农舍厨房后解锁", ingredients: "海草×1+绿藻×1", effects: "30+60", note: "所有NPC中立，海草海滩采集" },
  { name: "清汤", recipeSource: "升级农舍厨房后解锁", ingredients: "任意蔬菜×1+水×1", effects: "20+40", note: "所有NPC中立，潘妮讨厌" },
  { name: "葡萄干布丁", recipeSource: "升级农舍厨房后解锁", ingredients: "葡萄干×1+牛奶×1+糖×1", effects: "80+160", note: "所有NPC中立，葡萄干葡萄制作" },
  { name: "水煮洋蓟", recipeSource: "升级农舍厨房后解锁", ingredients: "洋蓟×1+水×1", effects: "60+120", note: "所有NPC中立，洋蓟秋季种植" },
  { name: "蔬菜什锦盖饭", recipeSource: "升级农舍厨房后解锁", ingredients: "任意蔬菜×3+米饭×1", effects: "110+220", note: "莉亚最爱，蔬菜易获取" },
  { name: "烤榛子", recipeSource: "升级农舍厨房后解锁", ingredients: "榛子×1", effects: "10+20", note: "所有NPC中立，榛子秋季采集" },
  { name: "南瓜派", recipeSource: "升级农舍厨房后解锁", ingredients: "南瓜×1+面粉×1+糖×1+蛋×1", effects: "130+260", note: "玛妮最爱，南瓜秋季种植" },
  { name: "萝卜沙拉", recipeSource: "升级农舍厨房后解锁", ingredients: "萝卜×1+醋×1+油×1", effects: "50+100", note: "所有NPC中立，萝卜春季种植" },
  { name: "水果沙拉", recipeSource: "升级农舍厨房后解锁", ingredients: "任意水果×3", effects: "90+180", note: "海莉最爱，水果易获取" },
  { name: "黑莓脆皮饼", recipeSource: "升级农舍厨房后解锁", ingredients: "黑莓×1+面粉×1+糖×1+蛋×1", effects: "100+200", note: "阿比盖尔最爱，黑莓秋季采集" },
  { name: "蔓越莓糖果", recipeSource: "升级农舍厨房后解锁", ingredients: "蔓越莓×1+糖×1", effects: "40+80", note: "所有NPC中立，蔓越莓秋季种植" },
  { name: "意式烤面包", recipeSource: "升级农舍厨房后解锁", ingredients: "面包×1+番茄×1+奶酪×1", effects: "80+160", note: "所有NPC中立，基础意式料理" },
  { name: "卷心菜沙拉", recipeSource: "升级农舍厨房后解锁", ingredients: "卷心菜×1+醋×1+油×1", effects: "60+120", note: "所有NPC中立，卷心菜春季种植" },
  { name: "意式蕨菜炖饭", recipeSource: "升级农舍厨房后解锁", ingredients: "蕨菜×1+米饭×1+奶酪×1", effects: "90+180", note: "所有NPC中立，蕨菜夏季采集" },
  { name: "虞美人籽松糕", recipeSource: "升级农舍厨房后解锁", ingredients: "虞美人×1+面粉×1+糖×1+蛋×1", effects: "120+240", note: "莉亚/潘妮最爱，虞美人春季种植" },
  { name: "海鲜杂烩汤", recipeSource: "升级农舍厨房后解锁", ingredients: "任意海鲜×2+蔬菜×1+牛奶×1", effects: "140+280", note: "所有NPC中立，海鲜蟹笼获取" },
  { name: "烩鱼汤", recipeSource: "升级农舍厨房后解锁", ingredients: "任意鱼×2+洋葱×1+番茄×1", effects: "130+260", note: "所有NPC中立，鱼类垂钓获取" },
  { name: "法式田螺", recipeSource: "升级农舍厨房后解锁", ingredients: "蜗牛×1+大蒜×1+黄油×1", effects: "110+220", note: "所有NPC中立，蜗牛蟹笼获取" }
];

// 获取所有食谱
export const getAllRecipes = () => {
  return recipes;
};

// 根据食谱获取方式筛选
export const getRecipesBySource = (source) => {
  return recipes.filter(recipe => recipe.recipeSource.includes(source));
};

// 根据NPC喜好筛选（从备注中提取）
export const getRecipesByNPCLiking = (npcName) => {
  return recipes.filter(recipe => recipe.note.includes(npcName));
};

// 获取按效果排序的食谱（从高到低）
export const getRecipesSortedByEffects = () => {
  return [...recipes].sort((a, b) => {
    const [aHealth, aEnergy] = a.effects.split('+').map(Number);
    const [bHealth, bEnergy] = b.effects.split('+').map(Number);
    return (bHealth + bEnergy) - (aHealth + aEnergy);
  });
};