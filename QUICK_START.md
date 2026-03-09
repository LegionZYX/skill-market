# Skill Market 使用说明

## 📦 项目已创建完成

您的 OpenClaw Skill Market 已经创建完成,包含以下内容:

### ✅ 数据文件
- `data/skills.json` - 20个技能的完整定义(JSON格式)
- `data/skills.csv` - Excel友好的表格格式
- `data/stats.md` - 统计信息和分析

### ✅ 文档
- `README.md` - 项目主文档
- `docs/README.md` - 详细项目说明
- `docs/categories.md` - 9大分类体系说明
- `docs/usage.md` - 使用指南(数据格式、部署、集成)
- `docs/roadmap.md` - 2026年完整开发路线图

### ✅ 技能文件
- `skills/office/lark-calendar/SKILL.md` - 飞书日程管理示例

### ✅ 工具脚本
- `scripts/validate.py` - 数据验证工具
- `scripts/json_csv_converter.py` - JSON/CSV转换
- `scripts/generate_stats.py` - 统计生成

### ✅ 配置文件
- `requirements.txt` - Python依赖
- `.gitignore` - Git忽略配置
- `setup.sh` - 快速启动脚本
- `PROJECT_SUMMARY.md` - 项目总结

## 🚀 快速使用

### 1. 查看数据

**Excel查看**:
```
直接打开 data/skills.csv
```

**代码查看**:
```python
import json
with open('data/skills.json', 'r', encoding='utf-8') as f:
    skills = json.load(f)
    print(f"总技能数: {len(skills['skills'])}")
```

### 2. 编辑数据

**方式一: Excel编辑**
1. 打开 `data/skills.csv`
2. 添加/修改技能信息
3. 保存
4. 运行转换: `python scripts/json_csv_converter.py --to-json`

**方式二: 直接编辑JSON**
1. 编辑 `data/skills.json`
2. 运行验证: `python scripts/validate.py`
3. 生成CSV: `python scripts/json_csv_converter.py --to-csv`

### 3. 部署到数据库

**MySQL**:
```sql
CREATE DATABASE skillmarket;
USE skillmarket;

CREATE TABLE skills (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    description TEXT,
    rating DECIMAL(2,1),
    downloads INT
);

LOAD DATA INFILE 'data/skills.csv'
INTO TABLE skills
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```

**MongoDB**:
```bash
mongoimport --db skillmarket --collection skills --file data/skills.json --jsonArray
```

### 4. 创建API服务

```python
# 简单的 FastAPI 示例
from fastapi import FastAPI
import json

app = FastAPI()

with open('data/skills.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

@app.get("/skills")
def get_skills(category: str = None):
    skills = data['skills']
    if category:
        skills = [s for s in skills if s['category'] == category]
    return {"total": len(skills), "skills": skills}

@app.get("/skills/{skill_id}")
def get_skill(skill_id: str):
    skill = next((s for s in data['skills'] if s['id'] == skill_id), None)
    return skill or {"error": "Not found"}

# 运行: uvicorn api:app --reload
```

### 5. 安装到 OpenClaw

```bash
# 复制技能
cp -r skills/* ~/.openclaw/workspace/skills/

# 重启 OpenClaw
openclaw restart

# 使用
# 在 OpenClaw 中说: "帮我查询明天的飞书日程"
```

## 📊 当前数据统计

- **总技能数**: 20
- **分类**: 9大领域
- **平台**: 15+
- **平均评分**: 4.56⭐

### 热门分类
1. 办公协作 (3个技能)
2. 电商运营 (4个技能)
3. 营销推广 (4个技能)
4. 客户服务 (2个技能)
5. 数据分析 (2个技能)

### 热门技能
1. 代码审查 (25,000 下载)
2. 内容创作助手 (22,000 下载)
3. 智能客服 (20,000 下载)

## 🎯 下一步

### 立即可做
1. ✅ 用 Excel 打开 `data/skills.csv` 查看数据
2. ✅ 阅读 `docs/categories.md` 了解分类体系
3. ✅ 查看 `skills/office/lark-calendar/SKILL.md` 学习技能格式

### 短期计划
1. 添加更多技能(目标: 50个)
2. 完善每个技能的 SKILL.md
3. 测试工具脚本

### 中期计划
1. 集成更多平台
2. 创建 Web 界面
3. 建立 CI/CD

## 📖 详细文档

- **项目说明**: `README.md`
- **分类体系**: `docs/categories.md`
- **使用指南**: `docs/usage.md`
- **开发路线**: `docs/roadmap.md`
- **项目总结**: `PROJECT_SUMMARY.md`

## 🔧 工具使用

### 数据验证
```bash
python scripts/validate.py
```

### 格式转换
```bash
# JSON → CSV
python scripts/json_csv_converter.py --to-csv

# CSV → JSON
python scripts/json_csv_converter.py --to-json
```

### 生成统计
```bash
python scripts/generate_stats.py
```

## 💡 提示

1. **Excel用户**: 直接用 CSV 文件,最方便
2. **开发者**: 用 JSON 文件,结构更清晰
3. **AI处理**: JSON 格式最友好
4. **数据库**: CSV 导入最简单

## 📞 获取帮助

- 📖 查看 `docs/` 目录下的详细文档
- 💬 Discord: OpenClaw Community
- 🐛 Issues: GitHub Issues
- 📧 Email: support@openclaw.ai

---

**创建时间**: 2026-03-09
**版本**: 1.0.0
**状态**: ✅ 就绪可用
