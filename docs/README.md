# OpenClaw Skill Market - 中国企业版

面向中国企业的 AI Agent Skill 市场,基于真实业务场景设计。

## 📋 项目目标

1. **场景驱动** - 基于中国企业真实业务场景
2. **开箱即用** - 提供 OpenClaw skill 直接可用
3. **易于扩展** - 模块化设计,方便二次开发
4. **数据友好** - 多种格式导出(JSON/CSV/MD)

## 🗂️ 目录结构

```
skill-marketplace/
├── skills/          # OpenClaw skill 文件
│   ├── office/      # 办公协作
│   ├── ecommerce/   # 电商运营
│   ├── service/     # 客户服务
│   ├── data/        # 数据分析
│   ├── marketing/   # 营销推广
│   ├── hr/          # 人力资源
│   ├── finance/     # 财务管理
│   ├── devops/      # 开发运维
│   └── legal/       # 法务合规
├── docs/            # 文档
│   ├── README.md    # 本文件
│   ├── categories.md # 分类说明
│   └── usage.md     # 使用指南
└── data/            # 数据文件
    ├── skills.json  # 技能数据库
    ├── skills.csv   # CSV导出
    └── stats.md     # 统计信息
```

## 🎯 业务场景覆盖

### 1. 办公协作 (Office & Collaboration)
- 飞书/钉钉/企业微信集成
- 会议管理
- 日程安排
- 文档协作

### 2. 电商运营 (E-commerce)
- 淘宝/京东/拼多多运营
- 商品管理
- 订单处理
- 客户管理

### 3. 客户服务 (Customer Service)
- 智能客服
- 工单系统
- FAQ管理
- 满意度调查

### 4. 数据分析 (Data Analytics)
- 报表生成
- 数据可视化
- 预测分析
- BI集成

### 5. 营销推广 (Marketing)
- 社交媒体营销
- 内容创作
- 广告投放
- SEO优化

### 6. 人力资源 (HR)
- 招聘管理
- 考勤统计
- 薪资计算
- 培训管理

### 7. 财务管理 (Finance)
- 发票处理
- 费用报销
- 预算管理
- 税务计算

### 8. 开发运维 (DevOps)
- 代码审查
- CI/CD
- 监控告警
- 日志分析

### 9. 法务合规 (Legal & Compliance)
- 合同审查
- 合规检查
- 知识产权
- 风险评估

## 📊 数据来源

1. **ClawHub** - OpenClaw 官方技能市场
2. **GitHub** - 开源 AI agent 项目
3. **LangChain** - 集成生态
4. **AutoGPT** - 插件生态
5. **自定义开发** - 针对中国企业需求

## 🚀 快速开始

### 安装 Skill

```bash
# 克隆仓库
git clone <your-repo-url>
cd skill-marketplace

# 安装到 OpenClaw
cp -r skills/* ~/.openclaw/workspace/skills/
```

### 使用 Skill

在 OpenClaw 中:

```
# 办公协作示例
帮我查询明天的日程安排

# 电商运营示例
分析这个商品的销售数据

# 数据分析示例
生成上季度的销售报表
```

## 📈 统计信息

- 总技能数: 待统计
- 覆盖场景: 9大领域
- 支持平台: 飞书、钉钉、企业微信、淘宝、京东等
- 更新频率: 每周更新

## 🤝 贡献指南

欢迎贡献新的 skill 或改进现有 skill!

1. Fork 本仓库
2. 创建你的 skill (`skills/<category>/<skill-name>/SKILL.md`)
3. 更新数据文件 (`data/skills.json`)
4. 提交 Pull Request

## 📝 许可证

MIT License

## 📧 联系方式

- Issue: GitHub Issues
- Email: <your-email>
- Discord: OpenClaw Community

---

**最后更新**: 2026-03-09
