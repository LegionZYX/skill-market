# OpenClaw Skill Market

> 面向中国企业的 AI Agent Skill 市场

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-20+-green.svg)](data/skills.json)
[![Platforms](https://img.shields.io/badge/platforms-15+-orange.svg)](data/stats.md)

## 📖 项目简介

OpenClaw Skill Market 是专门为中国企业设计的 AI Agent 技能市场。基于真实业务场景,提供开箱即用的 OpenClaw skills,帮助企业快速实现 AI 助手部署。

### 🎯 核心特性

- **🇨🇳 本地化** - 深度适配中国主流平台(飞书、钉钉、淘宝、微信等)
- **🏢 企业级** - 基于真实企业业务场景设计
- **🔌 即插即用** - 提供完整的 OpenClaw skill 文件
- **📊 数据友好** - 支持 JSON/CSV/Markdown 多种格式
- **🤝 社区驱动** - 开源协作,持续更新

## 🗂️ 目录结构

```
skill-marketplace/
├── 📁 skills/           # OpenClaw skill 文件
│   ├── 📁 office/       # 办公协作
│   ├── 📁 ecommerce/    # 电商运营
│   ├── 📁 service/      # 客户服务
│   ├── 📁 data/         # 数据分析
│   ├── 📁 marketing/    # 营销推广
│   ├── 📁 hr/           # 人力资源
│   ├── 📁 finance/      # 财务管理
│   ├── 📁 devops/       # 开发运维
│   └── 📁 legal/        # 法务合规
├── 📁 docs/             # 文档
│   ├── README.md        # 项目说明
│   ├── categories.md    # 分类体系
│   ├── usage.md         # 使用指南
│   └── roadmap.md       # 开发路线
├── 📁 data/             # 数据文件
│   ├── skills.json      # 技能数据库(JSON)
│   ├── skills.csv       # 技能数据表(CSV)
│   └── stats.md         # 统计信息
├── 📁 scripts/          # 工具脚本
│   ├── validate.py      # 数据验证
│   ├── json_csv_converter.py  # 格式转换
│   └── generate_stats.py      # 统计生成
└── README.md            # 本文件
```

## 🚀 快速开始

### 1. 查看技能列表

**方式一: 查看数据文件**
```bash
# JSON 格式
cat data/skills.json

# CSV 格式(可用 Excel 打开)
open data/skills.csv
```

**方式二: 查看统计信息**
```bash
cat data/stats.md
```

### 2. 安装技能到 OpenClaw

```bash
# 克隆仓库
git clone <your-repo-url>
cd skill-marketplace

# 复制技能到 OpenClaw workspace
cp -r skills/office/lark-calendar ~/.openclaw/workspace/skills/

# 重启 OpenClaw
openclaw restart
```

### 3. 使用技能

在 OpenClaw 中:

```
# 办公协作
帮我查询明天的飞书日程

# 电商运营
分析这个淘宝商品的销售数据

# 数据分析
生成上季度的销售报表
```

## 📊 当前数据

| 指标 | 数值 |
|------|------|
| 总技能数 | 20+ |
| 覆盖分类 | 9 大领域 |
| 支持平台 | 15+ |
| 平均评分 | 4.56 ⭐ |

### 热门分类

1. **办公协作** - 飞书、钉钉、企业微信集成
2. **电商运营** - 淘宝、京东、拼多多运营
3. **营销推广** - 微信公众号、内容创作
4. **客户服务** - 智能客服、工单管理
5. **数据分析** - 报表生成、数据可视化

## 🔧 数据管理

### 验证数据

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

## 📚 文档

- [分类体系说明](docs/categories.md)
- [使用指南](docs/usage.md)
- [开发路线图](docs/roadmap.md)
- [项目说明](docs/README.md)

## 🎯 业务场景覆盖

### 1. 办公协作
- ✅ 飞书日程管理
- ✅ 钉钉考勤统计
- ✅ 企业微信通讯录
- 🚧 腾讯文档集成

### 2. 电商运营
- ✅ 淘宝商品管理
- ✅ 京东订单处理
- ✅ 电商数据分析
- 🚧 抖音电商运营

### 3. 客户服务
- ✅ 智能客服
- ✅ 工单管理
- 🚧 FAQ 自动生成

### 4. 数据分析
- ✅ 报表生成器
- 🚧 数据可视化
- 🚧 销售预测

### 5. 营销推广
- ✅ 公众号管理
- ✅ 内容创作助手
- ✅ 广告优化
- 🚧 SEO 审计

### 6. 人力资源
- ✅ 简历筛选
- 🚧 面试安排
- 🚧 薪资计算

### 7. 财务管理
- ✅ 发票识别
- 🚧 费用审批
- 🚧 预算跟踪

### 8. 开发运维
- ✅ 代码审查
- ✅ CI 流水线
- 🚧 日志分析

### 9. 法务合规
- ✅ 合同审查
- 🚧 合规检查
- 🚧 风险评估

## 🤝 贡献指南

欢迎贡献新的 skill 或改进现有 skill!

### 添加新技能

1. Fork 本仓库
2. 创建技能目录: `skills/<category>/<skill-name>/`
3. 编写 `SKILL.md` 文件(参考现有示例)
4. 更新 `data/skills.json`
5. 运行验证: `python scripts/validate.py`
6. 生成 CSV: `python scripts/json_csv_converter.py --to-csv`
7. 提交 Pull Request

### 技能模板

```markdown
# <Skill Name>

简短描述(1-2句话)

## 功能

- 功能1
- 功能2

## 使用场景

### 场景1

**用户**: "示例对话"

**Agent**:
```
示例响应
```

## 配置

### 环境变量

\`\`\`bash
API_KEY=xxx
\`\`\`

## 工具

### tool_name

工具描述

**参数**:
- param1 (type): 描述

**示例**:
\`\`\`json
{
  "param1": "value"
}
\`\`\`

## 最佳实践

1. 建议1
2. 建议2

## 错误处理

### 常见错误

1. **错误名称**
   - 原因: xxx
   - 解决: xxx

## 更新日志

### v1.0.0 (YYYY-MM-DD)
- ✨ 初始版本

## 许可证

MIT License
```

## 📅 更新计划

详见 [开发路线图](docs/roadmap.md)

### 2026 Q1
- [x] 项目结构设计
- [x] 20 个核心技能定义
- [ ] 50+ 技能完成
- [ ] 完整文档

### 2026 Q2
- [ ] 平台集成
- [ ] 统一 API
- [ ] 自动化测试

### 2026 Q3
- [ ] AI 能力增强
- [ ] 工作流自动化

### 2026 Q4
- [ ] 企业级特性
- [ ] 1.0 正式版

## 📈 统计信息

![Skills](https://img.shields.io/badge/skills-20+-green)
![Downloads](https://img.shields.io/badge/downloads-250K+-blue)
![Rating](https://img.shields.io/badge/rating-4.56⭐-yellow)

详细统计: [stats.md](data/stats.md)

## 📞 联系方式

- 💬 Discord: [OpenClaw Community](https://discord.gg/clawd)
- 📧 Email: support@openclaw.ai
- 🐛 Issues: [GitHub Issues](https://github.com/openclaw/skill-market/issues)
- 📖 文档: [docs.openclaw.ai](https://docs.openclaw.ai)

## 📄 许可证

[MIT License](LICENSE)

## 🙏 致谢

感谢以下项目和平台:
- [OpenClaw](https://github.com/openclaw/openclaw)
- [ClawHub](https://clawhub.com)
- 所有贡献者

---

**维护者**: OpenClaw Community
**最后更新**: 2026-03-09
**版本**: 1.0.0
