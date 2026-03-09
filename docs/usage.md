# Skill Market 使用指南

## 🎯 目标用户

1. **企业用户** - 寻找适合企业场景的 AI 技能
2. **开发者** - 开发新的 OpenClaw skill
3. **平台方** - 集成 OpenClaw 到自己的平台
4. **代理商** - 为客户提供 AI 解决方案

## 📦 数据格式说明

### 1. JSON 格式 (skills.json)

**优点**:
- 结构化数据,易于程序处理
- 支持复杂嵌套关系
- 易于扩展字段

**适用场景**:
- 数据库导入
- API 返回
- 前端展示
- 自动化脚本

**字段说明**:
```json
{
  "id": "skill-id",              // 唯一标识
  "name": "技能名称",             // 显示名称
  "category": "office",          // 一级分类
  "subcategory": "calendar",     // 二级分类
  "description": "功能描述",      // 详细描述
  "version": "1.0.0",            // 版本号
  "author": "作者",               // 作者/团队
  "tags": ["标签1", "标签2"],     // 搜索标签
  "priority": "P0",              // 优先级(P0-P3)
  "platforms": ["平台1"],        // 支持平台
  "requirements": {              // 依赖要求
    "apis": ["API名称"],
    "dependencies": ["依赖包"]
  },
  "useCases": ["场景1"],         // 使用场景
  "installCommand": "命令",       // 安装命令
  "repoUrl": "仓库地址",          // 代码仓库
  "rating": 4.5,                 // 评分(1-5)
  "downloads": 1000,             // 下载量
  "status": "stable"             // 状态(stable/beta/dev)
}
```

### 2. CSV 格式 (skills.csv)

**优点**:
- Excel 友好,可直接打开
- 易于批量编辑
- 便于数据透视分析

**适用场景**:
- Excel 数据分析
- 批量导入导出
- 人工编辑

**导入 Excel**:
1. 打开 Excel
2. 数据 → 获取数据 → 从文件 → 从文本/CSV
3. 选择 `skills.csv`
4. 编码选择 UTF-8
5. 分隔符选择逗号

### 3. Markdown 格式 (stats.md)

**优点**:
- 人类可读性强
- 支持格式化
- 易于版本控制

**适用场景**:
- 文档展示
- GitHub README
- 网站内容

## 🔧 数据处理流程

### 1. 数据采集

**从外部市场采集**:

```bash
# 从 ClawHub 采集
python scripts/fetch_from_clawhub.py

# 从 GitHub 采集
python scripts/fetch_from_github.py --topic "ai-agent"

# 从 LangChain 采集
python scripts/fetch_from_langchain.py
```

**手动添加**:
1. 编辑 `data/skills.json`
2. 添加新技能信息
3. 运行 `python scripts/validate.py` 验证
4. 生成 CSV: `python scripts/json_to_csv.py`

### 2. 数据清洗

```python
# 验证数据完整性
python scripts/validate.py --fix

# 去重
python scripts/deduplicate.py

# 标准化格式
python scripts/normalize.py
```

### 3. 数据导出

```bash
# 生成所有格式
python scripts/export.py --all

# 仅生成 CSV
python scripts/export.py --csv

# 仅生成 Markdown
python scripts/export.py --md
```

## 🌐 部署到 Web 平台

### 1. 静态网站

```bash
# 生成静态页面
python scripts/generate_static_site.py

# 部署到 GitHub Pages
cd docs && mkdocs gh-deploy

# 或部署到 Cloudflare Pages
wrangler pages deploy dist
```

### 2. 数据库导入

**MySQL**:
```sql
CREATE TABLE skills (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    subcategory VARCHAR(50),
    description TEXT,
    version VARCHAR(20),
    author VARCHAR(100),
    tags JSON,
    priority ENUM('P0','P1','P2','P3'),
    platforms JSON,
    rating DECIMAL(2,1),
    downloads INT,
    status ENUM('stable','beta','dev'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 从 CSV 导入
LOAD DATA INFILE 'skills.csv'
INTO TABLE skills
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```

**MongoDB**:
```bash
# 导入 JSON
mongoimport --db skillmarket --collection skills --file skills.json --jsonArray
```

**PostgreSQL**:
```bash
# 使用 copy 命令
\copy skills FROM 'skills.csv' WITH (FORMAT csv, HEADER true);
```

### 3. API 服务

```javascript
// Express.js 示例
const express = require('express');
const app = express();
const skills = require('./data/skills.json');

// 获取所有技能
app.get('/api/skills', (req, res) => {
  const { category, priority, search } = req.query;
  
  let filtered = skills.skills;
  
  if (category) {
    filtered = filtered.filter(s => s.category === category);
  }
  
  if (priority) {
    filtered = filtered.filter(s => s.priority === priority);
  }
  
  if (search) {
    filtered = filtered.filter(s => 
      s.name.includes(search) || 
      s.description.includes(search)
    );
  }
  
  res.json({
    total: filtered.length,
    skills: filtered
  });
});

// 获取单个技能
app.get('/api/skills/:id', (req, res) => {
  const skill = skills.skills.find(s => s.id === req.params.id);
  if (skill) {
    res.json(skill);
  } else {
    res.status(404).json({ error: 'Skill not found' });
  }
});

// 获取分类
app.get('/api/categories', (req, res) => {
  res.json(skills.categories);
});

app.listen(3000, () => {
  console.log('Skill Market API running on port 3000');
});
```

## 📱 集成到 OpenClaw

### 1. 安装 Skill

**方式一: 手动安装**
```bash
# 复制 skill 到 workspace
cp -r skills/office/lark-calendar ~/.openclaw/workspace/skills/

# 重启 OpenClaw
openclaw restart
```

**方式二: 使用命令**
```bash
openclaw skill install lark-calendar
```

### 2. 配置 Skill

编辑 `~/.openclaw/workspace/skills/office/lark-calendar/config.json`

### 3. 使用 Skill

在 OpenClaw 中直接使用:
```
帮我查询明天的飞书日程
```

## 🔄 自动化流程

### 1. CI/CD 集成

```yaml
# .github/workflows/update-skills.yml
name: Update Skills Database

on:
  schedule:
    - cron: '0 0 * * 0'  # 每周日更新
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.9'
      
      - name: Install dependencies
        run: pip install -r requirements.txt
      
      - name: Fetch new skills
        run: python scripts/fetch_all.py
      
      - name: Validate data
        run: python scripts/validate.py
      
      - name: Generate exports
        run: python scripts/export.py --all
      
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add data/
          git diff --quiet && git diff --staged --quiet || git commit -m "Update skills database"
          git push
```

### 2. 定时同步

```bash
# crontab
0 2 * * * cd /path/to/skill-marketplace && python scripts/sync.py >> logs/sync.log 2>&1
```

## 📊 数据分析

### 1. Python 分析脚本

```python
import pandas as pd
import matplotlib.pyplot as plt

# 读取数据
df = pd.read_csv('data/skills.csv')

# 分类统计
category_stats = df.groupby('分类').agg({
    '下载量': 'sum',
    '评分': 'mean',
    'ID': 'count'
}).rename(columns={'ID': '技能数'})

print(category_stats)

# 可视化
plt.figure(figsize=(10, 6))
df['分类'].value_counts().plot(kind='bar')
plt.title('Skills by Category')
plt.savefig('docs/images/category_distribution.png')
```

### 2. SQL 分析

```sql
-- 热门技能
SELECT 名称, 下载量, 评分
FROM skills
ORDER BY 下载量 DESC
LIMIT 10;

-- 分类统计
SELECT 分类, COUNT(*) as 数量, AVG(评分) as 平均评分
FROM skills
GROUP BY 分类
ORDER BY 数量 DESC;

-- 平台覆盖
SELECT 
    JSON_UNQUOTE(JSON_EXTRACT(platforms, '$[0]')) as 平台,
    COUNT(*) as 技能数
FROM skills
GROUP BY 平台;
```

## 🔐 数据安全

### 1. 敏感信息处理

```python
# 加密 API 密钥
from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher = Fernet(key)

encrypted_api_key = cipher.encrypt(api_key.encode())
```

### 2. 访问控制

```javascript
// API 限流
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 限制100次请求
});

app.use('/api/', limiter);
```

## 📞 技术支持

- 📖 完整文档: `docs/`
- 💬 社区讨论: Discord
- 🐛 问题反馈: GitHub Issues
- 📧 邮件支持: support@openclaw.ai

---

**维护者**: OpenClaw Community
**更新时间**: 2026-03-09
