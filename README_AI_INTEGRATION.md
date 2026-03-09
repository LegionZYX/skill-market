# OpenClaw Skills - AI本地集成版

> 🚀 **300+ AI技能完整数据库** - 专为AI本地集成设计

---

## 📊 数据概览

- **总技能数**: 175+ (8大分类，持续扩展中)
- **数据格式**: JSON + CSV + Markdown
- **最后更新**: 2026-03-09
- **版本**: 4.0.0

---

## 🎯 适用场景

### 1. AI本地集成
- 本地部署的OpenClaw版本
- 离线AI助手
- 企业内部知识库
- 自定义技能系统

### 2. 数据分析
- 技能推荐系统
- 用户画像匹配
- 趋势分析
- 价值评估

### 3. 开发参考
- 技能设计参考
- 功能实现示例
- 最佳实践学习

---

## 📁 数据文件说明

### 完整数据文件

| 文件 | 格式 | 大小 | 用途 |
|------|------|------|------|
| `data/skills_complete.json` | JSON | 147KB | **主要数据源** - 完整技能数据 |
| `data/skills_complete.csv` | CSV | 69KB | **表格格式** - 方便Excel/数据库导入 |
| `data/skills-install-direct.json` | JSON | 6KB | 直接安装命令 |
| `data/skills-install-redirect.json` | JSON | 5KB | 重定向安装链接 |

### 分类数据文件

所有分类文件位于 `data/skills/` 目录：

```
data/skills/
├── skills_office.json        # 办公协作 (20个)
├── skills_ecommerce.json     # 电商运营 (25个)
├── skills_service.json       # 客户服务 (20个)
├── skills_data.json          # 数据分析 (20个)
├── skills_marketing.json     # 营销推广 (25个)
├── skills_hr.json            # 人力资源 (20个)
├── skills_finance.json       # 财务管理 (20个)
└── skills_devops.json        # 开发运维 (25个)
```

---

## 🔧 数据字段说明

### 核心字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `id` | string | 技能唯一标识 | `lark-calendar` |
| `name` | string | 技能名称 | `飞书日程管理` |
| `category` | string | 所属分类 | `office` |
| `description` | string | 功能描述 | `管理飞书日历、日程安排` |
| `rating` | number | 用户评分 (0-5) | `4.8` |
| `downloads` | number | 下载/使用次数 | `15000` |
| `price` | number | 价格 (0=免费) | `0` |

### 安装相关

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `installCommand` | string | 安装命令 | `npx openclaw-skills@latest install lark-calendar` |
| `installReason` | string | 安装理由 | `提高团队协作效率` |
| `documentation` | string | 文档链接 | `https://docs.openclaw.ai/skills/lark-calendar` |
| `repository` | string | 仓库链接 | `https://github.com/openclaw/skills/tree/main/office/lark-calendar` |

### 元数据

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `native` | string\|null | 原生平台 | `飞书原生` |
| `tags` | array | 标签 | `["飞书", "日程", "会议"]` |
| `useCases` | array | 使用场景 | `["查询日程", "创建会议"]` |
| `version` | string | 技能版本 | `1.0.0` |
| `lastUpdated` | string | 更新时间 | `2026-03-09` |

---

## 💻 使用示例

### 1. 加载JSON数据 (JavaScript/Node.js)

```javascript
// 加载完整数据
const skillsData = require('./data/skills_complete.json');

console.log(`总技能数: ${skillsData.totalSkills}`);
console.log(`分类数: ${skillsData.categories.length}`);

// 查找特定技能
const skill = skillsData.skills.find(s => s.id === 'lark-calendar');
console.log(skill.name); // 飞书日程管理

// 按分类筛选
const officeSkills = skillsData.skills.filter(s => s.category === 'office');
console.log(`办公协作技能: ${officeSkills.length}个`);
```

### 2. 加载CSV数据 (Python)

```python
import pandas as pd

# 加载CSV
df = pd.read_csv('data/skills_complete.csv')

print(f"总技能数: {len(df)}")

# 统计各分类技能数量
print(df['category_name'].value_counts())

# 筛选高评分技能
top_skills = df[df['rating'] >= 4.5].sort_values('downloads', ascending=False)
print(top_skills[['name', 'rating', 'downloads']].head(10))
```

### 3. AI推荐系统

```javascript
// 基于用户需求推荐技能
function recommendSkills(userNeeds) {
  const allSkills = require('./data/skills_complete.json').skills;

  return allSkills
    .filter(skill => {
      // 匹配标签
      const tagMatch = skill.tags.some(tag =>
        userNeeds.some(need => tag.includes(need))
      );

      // 匹配使用场景
      const useCaseMatch = skill.useCases.some(useCase =>
        userNeeds.some(need => useCase.includes(need))
      );

      return tagMatch || useCaseMatch;
    })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);
}

// 示例：推荐日程管理相关技能
const recommendations = recommendSkills(['日程', '会议', '提醒']);
console.log(recommendations);
```

### 4. 本地集成到OpenClaw

```javascript
// 在OpenClaw中使用
const skillsData = require('./data/skills_complete.json');

// 注册技能到本地OpenClaw
skillsData.skills.forEach(skill => {
  openclaw.registerSkill({
    id: skill.id,
    name: skill.name,
    description: skill.description,
    installCommand: skill.installCommand,
    metadata: {
      category: skill.category,
      rating: skill.rating,
      tags: skill.tags,
      useCases: skill.useCases
    }
  });
});

// 用户查询技能
openclaw.on('query-skill', (query) => {
  const results = skillsData.skills
    .filter(s => s.name.includes(query) || s.description.includes(query))
    .slice(0, 5);

  return results.map(s => ({
    name: s.name,
    description: s.description,
    installCommand: s.installCommand
  }));
});
```

---

## 📊 数据统计分析

### 分类分布

| 分类 | 技能数 | 占比 |
|------|--------|------|
| 电商运营 | 25 | 14.3% |
| 营销推广 | 25 | 14.3% |
| 开发运维 | 25 | 14.3% |
| 办公协作 | 20 | 11.4% |
| 客户服务 | 20 | 11.4% |
| 数据分析 | 20 | 11.4% |
| 人力资源 | 20 | 11.4% |
| 财务管理 | 20 | 11.4% |

### 评分分布

- **⭐⭐⭐⭐⭐ (4.5-5.0)**: 62个技能 (35.4%)
- **⭐⭐⭐⭐ (4.0-4.4)**: 113个技能 (64.6%)
- **平均评分**: 4.43

### 价格分布

- **🆓 免费技能**: 78个 (44.6%)
- **💰 付费技能**: 97个 (55.4%)
- **平均价格**: ¥51.2 (付费技能)

---

## 🔄 数据更新

### 自动更新

```bash
# 运行数据生成脚本
cd skill-marketplace
node scripts/generate-complete-data.js

# 提交更新
git add data/
git commit -m "📊 更新技能数据"
git push
```

### 手动更新

1. 编辑 `scripts/generate-complete-data.js`
2. 添加新技能到对应分类数组
3. 运行脚本重新生成数据
4. 提交到GitHub

---

## 📖 完整示例

### 示例1: 构建技能搜索API

```javascript
const express = require('express');
const skillsData = require('./data/skills_complete.json');

const app = express();

// 搜索技能
app.get('/api/skills/search', (req, res) => {
  const { q, category, minRating, maxPrice } = req.query;

  let results = skillsData.skills;

  // 关键词搜索
  if (q) {
    results = results.filter(s =>
      s.name.includes(q) || s.description.includes(q)
    );
  }

  // 分类筛选
  if (category) {
    results = results.filter(s => s.category === category);
  }

  // 评分筛选
  if (minRating) {
    results = results.filter(s => s.rating >= parseFloat(minRating));
  }

  // 价格筛选
  if (maxPrice) {
    results = results.filter(s => s.price <= parseFloat(maxPrice));
  }

  res.json({
    total: results.length,
    skills: results.slice(0, 20)
  });
});

app.listen(3000);
```

### 示例2: 技能推荐算法

```python
import json
from typing import List, Dict

class SkillRecommender:
    def __init__(self, data_path: str):
        with open(data_path, 'r', encoding='utf-8') as f:
            self.data = json.load(f)

    def recommend_by_category(self, category: str, limit: int = 10) -> List[Dict]:
        """按分类推荐热门技能"""
        skills = [s for s in self.data['skills'] if s['category'] == category]
        return sorted(skills, key=lambda x: x['rating'], reverse=True)[:limit]

    def recommend_by_tags(self, tags: List[str], limit: int = 10) -> List[Dict]:
        """按标签推荐技能"""
        def score(skill):
            return sum(1 for tag in tags if tag in skill['tags'])

        skills = [(s, score(s)) for s in self.data['skills']]
        skills = [(s, score) for s, score in skills if score > 0]
        skills.sort(key=lambda x: (x[1], x[0]['rating']), reverse=True)

        return [s for s, _ in skills[:limit]]

    def recommend_free_skills(self, limit: int = 10) -> List[Dict]:
        """推荐免费技能"""
        free_skills = [s for s in self.data['skills'] if s['price'] == 0]
        return sorted(free_skills, key=lambda x: x['downloads'], reverse=True)[:limit]

# 使用示例
recommender = SkillRecommender('data/skills_complete.json')

# 推荐办公协作类技能
office_skills = recommender.recommend_by_category('office')
print("办公协作推荐:", [s['name'] for s in office_skills])

# 根据标签推荐
tag_skills = recommender.recommend_by_tags(['AI', '自动化'])
print("AI相关推荐:", [s['name'] for s in tag_skills])

# 推荐免费技能
free_skills = recommender.recommend_free_skills()
print("免费技能推荐:", [s['name'] for s in free_skills])
```

---

## 🤝 贡献指南

### 添加新技能

1. Fork本仓库
2. 编辑 `scripts/generate-complete-data.js`
3. 在对应分类数组中添加新技能
4. 运行 `node scripts/generate-complete-data.js`
5. 提交Pull Request

### 技能数据格式

```javascript
{
  id: 'skill-id',                    // 唯一标识（小写+连字符）
  name: '技能名称',                   // 显示名称
  category: 'office',                // 分类ID
  description: '功能描述',            // 详细描述
  rating: 4.5,                       // 评分 (0-5)
  downloads: 10000,                  // 下载次数
  price: 0,                          // 价格 (0=免费)
  native: '飞书原生',                // 原生平台 (可选)
  tags: ['标签1', '标签2'],          // 标签数组
  installReason: '安装理由',          // 为什么安装
  useCases: ['场景1', '场景2']       // 使用场景
}
```

---

## 📞 技术支持

- **文档**: https://docs.openclaw.ai
- **社区**: https://discord.com/invite/clawd
- **GitHub**: https://github.com/LegionZYX/skill-market
- **问题反馈**: https://github.com/LegionZYX/skill-market/issues

---

## 📄 许可证

MIT License - 可自由使用、修改、分发

---

**最后更新**: 2026-03-09
**维护者**: OpenClaw Community
