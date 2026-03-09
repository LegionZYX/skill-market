# OpenClaw Skill Market - 网页版

> 300+ AI技能市场，30个分类，支持付费使用

---

## 🎯 项目简介

OpenClaw Skill Market 是一个现代化的网页版AI技能市场，展示了300+精选技能，覆盖30个业务分类，为用户提供浏览、搜索、筛选和付费使用AI技能的能力。

### ✨ 核心功能

- ✅ **300+ 精选技能** - 涵盖办公、电商、营销、开发等30个分类
- ✅ **智能搜索** - 支持技能名称、描述、分类搜索
- ✅ **高级筛选** - 按价格、评分、下载量排序
- ✅ **分类导航** - 30个业务分类快速定位
- ✅ **技能详情** - 详细的功能说明和应用场景
- ✅ **付费系统** - 支持免费和付费技能
- ✅ **响应式设计** - 完美支持PC和移动端
- ✅ **用户友好** - 现代化UI设计，流畅交互体验

---

## 📂 项目结构

```
skill-marketplace/
├── web/
│   ├── index.html          # 主页面
│   ├── style.css           # 样式文件
│   ├── app.js              # 应用逻辑
│   ├── skills-data.js      # 技能数据（300+）
│   └── README.md           # 本文档
│
├── data/
│   ├── skills_v4_index.json     # 完整数据索引
│   ├── skills_v3.2.json         # 核心技能数据
│   └── skills.csv               # Excel格式
│
└── docs/
    ├── SKILL_CATALOG_V4.md      # 完整目录（30分类）
    ├── TECH_BLOGGER_SKILLS.md   # 科技博主推荐
    ├── FEISHU_COMPARISON.md     # 飞书功能对比
    └── SCENARIO_GUIDES.md       # 场景指南
```

---

## 🚀 快速开始

### 方法1: 直接打开（推荐）

1. 双击 `index.html` 文件
2. 浏览器自动打开
3. 开始浏览和搜索技能

### 方法2: 本地服务器

```bash
# 使用Python
cd skill-marketplace/web
python -m http.server 8000

# 访问 http://localhost:8000
```

### 方法3: Node.js服务器

```bash
# 安装serve
npm install -g serve

# 启动服务
cd skill-marketplace/web
serve -p 8000

# 访问 http://localhost:8000
```

---

## 📊 数据说明

### 技能数据结构

每个技能包含以下字段：

```javascript
{
  id: "skill-id",              // 唯一标识
  name: "技能名称",             // 显示名称
  description: "技能描述",      // 详细说明
  category: "office",          // 所属分类
  rating: 4.8,                 // 评分（1-5）
  downloads: 15000,            // 下载次数
  price: 0,                    // 价格（0=免费）
  featured: true,              // 是否精选
  native: "飞书原生"            // 原生支持（可选）
}
```

### 分类数据结构

```javascript
{
  id: "office",                // 分类ID
  name: "办公协作",             // 分类名称
  icon: "🏢",                  // 图标emoji
  count: 20                    // 技能数量
}
```

---

## 🎨 功能详解

### 1. 首页展示

- **Hero区域**: 项目介绍和核心数据
- **精选推荐**: 10个精选技能卡片
- **分类导航**: 30个分类快速入口
- **全部技能**: 支持搜索和筛选

### 2. 搜索功能

- **实时搜索**: 输入即搜索，无需按回车
- **多字段搜索**: 支持技能名称、描述、分类
- **高亮显示**: 搜索结果实时更新

### 3. 筛选排序

- **价格筛选**: 全部/免费/付费
- **排序方式**: 
  - 最热门（下载量）
  - 最新发布
  - 评分最高
  - 价格从低到高
  - 价格从高到低

### 4. 分类浏览

- **30个分类**: 覆盖企业全场景
- **快速切换**: 点击标签即时筛选
- **技能计数**: 显示每个分类的技能数量

### 5. 技能详情

- **完整信息**: 名称、描述、评分、下载量
- **应用场景**: 4-5个典型使用场景
- **功能特性**: 核心功能列表
- **操作按钮**: 立即使用/立即购买

### 6. 定价方案

- **免费版**: 5个基础技能，1000次调用
- **专业版**: 50个高级技能，50000次调用
- **企业版**: 全部技能，无限次调用

---

## 🔧 自定义配置

### 修改技能数据

编辑 `skills-data.js` 文件：

```javascript
// 添加新技能
skillsDatabase.skills.push({
  id: "new-skill",
  name: "新技能",
  description: "技能描述",
  category: "office",
  rating: 4.5,
  downloads: 1000,
  price: 29
});

// 添加新分类
skillsDatabase.categories.push({
  id: "new-category",
  name: "新分类",
  icon: "🆕",
  count: 1
});
```

### 修改样式

编辑 `style.css` 文件：

```css
/* 修改主题色 */
:root {
    --primary-color: #4F46E5;    /* 主色调 */
    --secondary-color: #7C3AED;  /* 次要色调 */
}

/* 修改卡片样式 */
.skill-card {
    border-radius: 12px;
    padding: 25px;
}
```

### 修改功能

编辑 `app.js` 文件：

```javascript
// 修改每页显示数量
let skillsPerPage = 12;  // 改为 20

// 修改默认排序
document.getElementById('sortFilter').value = 'rating';
```

---

## 🌐 部署上线

### GitHub Pages（免费）

1. 创建GitHub仓库
2. 上传 `web/` 文件夹所有文件
3. Settings → Pages → Source: main branch
4. 访问 `https://yourusername.github.io/repo-name`

### Vercel（推荐）

```bash
# 安装Vercel CLI
npm install -g vercel

# 部署
cd skill-marketplace/web
vercel

# 按提示操作，获得线上地址
```

### Netlify

1. 访问 [netlify.com](https://netlify.com)
2. 拖拽 `web/` 文件夹到页面
3. 自动部署，获得地址

### 传统服务器

1. 上传 `web/` 文件夹到服务器
2. 配置Nginx/Apache指向该目录
3. 访问域名即可

---

## 💰 付费功能集成

### 集成支付宝

```javascript
// 在 app.js 中修改 buySkill 函数
function buySkill(skillId) {
    const skill = skillsDatabase.skills.find(s => s.id === skillId);
    
    // 调用支付宝API
    Alipay.pay({
        amount: skill.price,
        subject: skill.name,
        success: () => {
            alert('支付成功！');
        }
    });
}
```

### 集成微信支付

```javascript
function buySkill(skillId) {
    const skill = skillsDatabase.skills.find(s => s.id === skillId);
    
    // 调用微信支付API
    WeChat.pay({
        amount: skill.price * 100,  // 微信支付单位是分
        description: skill.name,
        success: () => {
            alert('支付成功！');
        }
    });
}
```

### 集成Stripe（国际）

```javascript
function buySkill(skillId) {
    const skill = skillsDatabase.skills.find(s => s.id === skillId);
    
    // 调用Stripe
    const stripe = Stripe('your_public_key');
    stripe.redirectToCheckout({
        lineItems: [{
            price: 'price_xxx',
            quantity: 1
        }],
        mode: 'payment',
        successUrl: 'https://yourdomain.com/success',
        cancelUrl: 'https://yourdomain.com/cancel'
    });
}
```

---

## 📱 移动端优化

### 响应式设计

项目已内置响应式设计，自动适配：

- **桌面**: 多列网格布局
- **平板**: 2-3列布局
- **手机**: 单列布局

### PWA支持（可选）

添加 `manifest.json` 和 Service Worker：

```json
// manifest.json
{
  "name": "OpenClaw Skill Market",
  "short_name": "Skill Market",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#4F46E5",
  "theme_color": "#4F46E5"
}
```

---

## 🔒 安全建议

### 数据安全

1. **用户数据加密**: 使用HTTPS
2. **API密钥保护**: 不要在前端暴露密钥
3. **输入验证**: 防止XSS攻击

### 支付安全

1. **后端验证**: 所有支付逻辑在后端处理
2. **订单验证**: 验证支付回调的真实性
3. **金额校验**: 后端二次验证金额

---

## 📈 性能优化

### 图片优化

- 使用WebP格式
- 压缩图片大小
- 懒加载技术

### 代码优化

```javascript
// 使用防抖优化搜索
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// 应用到搜索
document.getElementById('searchInput').addEventListener('input', 
    debounce((e) => searchSkills(e.target.value), 300)
);
```

### 数据优化

- 分页加载（已实现）
- 虚拟滚动（大数据量时）
- 缓存策略

---

## 🐛 常见问题

### Q1: 技能数据不显示？

**A**: 检查 `skills-data.js` 是否正确加载，打开浏览器控制台查看错误。

### Q2: 样式不生效？

**A**: 清除浏览器缓存，或使用Ctrl+F5强制刷新。

### Q3: 搜索不工作？

**A**: 确保 `app.js` 在 `skills-data.js` 之后加载。

### Q4: 移动端布局错乱？

**A**: 检查viewport meta标签是否正确设置。

---

## 🤝 贡献指南

### 添加新技能

1. 编辑 `skills-data.js`
2. 添加技能到 `skills` 数组
3. 更新对应分类的 `count`
4. 测试并提交PR

### 报告问题

1. 描述问题现象
2. 提供复现步骤
3. 截图或录屏
4. 提交Issue

---

## 📄 许可证

MIT License - 自由使用和修改

---

## 📞 联系方式

- **官网**: https://openclaw.ai
- **社区**: https://discord.com/invite/clawd
- **GitHub**: https://github.com/openclaw/openclaw
- **邮箱**: support@openclaw.ai

---

## 🎉 致谢

感谢所有为OpenClaw社区贡献技能的开发者！

---

**最后更新**: 2026-03-09  
**版本**: v1.0  
**维护者**: OpenClaw Community
