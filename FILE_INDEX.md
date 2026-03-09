# OpenClaw Skill Market - 文件索引 v3.1

> 最后更新: 2026-03-09

---

## 📂 项目结构

```
skill-marketplace/
│
├── 📄 README.md                    # 项目主文档
├── 📄 QUICK_START.md              # 快速开始指南
├── 📄 FILE_INDEX.md               # 本文件
├── 📄 PROJECT_SUMMARY.md          # 项目总结
│
├── 📁 data/                        # 数据文件
│   ├── skills.json                # 原始20个技能
│   ├── skills_core.json           # ⭐ 核心60个技能
│   ├── skills_minimal.json        # ⭐ 精简版(地址+名称+功能)
│   ├── skills_extended.json       # ⭐ 扩展版(包含创新场景)
│   ├── skills_full.json           # 完整100+技能
│   ├── skills.csv                 # CSV格式
│   └── stats.md                   # 统计信息
│
├── 📁 docs/                        # 文档
│   ├── README.md                  # 文档目录
│   ├── categories.md              # 分类说明
│   ├── usage.md                   # 使用指南
│   ├── roadmap.md                 # 路线图
│   ├── CORE_SKILLS.md             # ⭐ 核心技能详解
│   ├── UPDATE_LOG.md              # ⭐ 更新日志
│   ├── SCENARIO_GUIDES.md         # ⭐ 场景化操作指引
│   └── INNOVATIVE_SCENARIOS.md    # ⭐ 创新场景指南
│
├── 📁 skills/                      # 技能示例
│   └── office/
│       └── lark-calendar/
│           └── SKILL.md           # 飞书日程管理示例
│
└── 📁 scripts/                     # 工具脚本
    ├── validate.py                # 数据验证
    ├── json_csv_converter.py      # 格式转换
    └── generate_stats.py          # 统计生成
```

---

## 🎯 快速导航

### 我是初学者
1. 📖 从 [README.md](README.md) 开始
2. 🚀 看 [QUICK_START.md](QUICK_START.md)
3. 📚 读 [docs/CORE_SKILLS.md](docs/CORE_SKILLS.md)

### 我想直接使用
1. 💾 下载 [data/skills_core.json](data/skills_core.json) (60个核心技能)
2. 📋 查看 [docs/SCENARIO_GUIDES.md](docs/SCENARIO_GUIDES.md) (10个场景)
3. 🛠️ 参考 [skills/office/lark-calendar/SKILL.md](skills/office/lark-calendar/SKILL.md)

### 我想扩展功能
1. 📦 使用 [data/skills_extended.json](data/skills_extended.json) (含创新场景)
2. 🔬 研究 [docs/INNOVATIVE_SCENARIOS.md](docs/INNOVATIVE_SCENARIOS.md)
3. 📖 参考 [data/skills_full.json](data/skills_full.json) (完整库)

### 我是开发者
1. 🔧 查看 [scripts/](scripts/) 目录
2. 📊 运行 [scripts/validate.py](scripts/validate.py)
3. 📈 生成统计 [scripts/generate_stats.py](scripts/generate_stats.py)

---

## 📊 数据文件对比

| 文件 | 技能数 | 特点 | 推荐场景 |
|------|--------|------|----------|
| skills_core.json | 60 | 高质量核心技能 | ⭐ 日常使用 |
| skills_minimal.json | 60 | 精简信息 | AI处理 |
| skills_extended.json | 100+ | 包含创新场景 | ⭐ 扩展应用 |
| skills_full.json | 100+ | 完整信息 | 深度定制 |
| skills.csv | 60 | Excel友好 | 人工查看 |
| skills.json | 20 | 原始版本 | 学习参考 |

---

## 📚 文档导航

### 核心文档
- **README.md** - 项目介绍、功能特性、安装指南
- **QUICK_START.md** - 5分钟快速开始
- **FILE_INDEX.md** - 本文件,文件导航

### 技能文档
- **CORE_SKILLS.md** - 60个核心技能详细说明
- **SCENARIO_GUIDES.md** - 10个经典场景操作指引
- **INNOVATIVE_SCENARIOS.md** - 10个创新应用场景

### 技术文档
- **categories.md** - 10大分类体系
- **usage.md** - API使用、部署指南
- **roadmap.md** - 2026年开发路线图

### 维护文档
- **UPDATE_LOG.md** - 版本更新记录
- **stats.md** - 项目统计数据

---

## 🎨 场景指南索引

### 经典业务场景 (SCENARIO_GUIDES.md)
1. **创业公司快速启动** - 基础办公和业务流程
2. **电商卖家日常运营** - 自动化日常运营
3. **自媒体内容创作** - 内容生产效率提升10倍
4. **企业数字化转型** - 全流程数字化
5. **个人效率提升** - 个人生产力提升2-3倍
6. **开发团队协作** - 开发效率提升3倍
7. **销售团队赋能** - 销售效率提升50%
8. **客户服务升级** - 客户满意度提升20%
9. **数据分析入门** - 快速掌握数据分析
10. **远程团队管理** - 远程协作效率

### 创新应用场景 (INNOVATIVE_SCENARIOS.md)
1. **AI智能体自动化** - 基于AutoGPT的多智能体系统
2. **知识增强生成(RAG)** - 企业知识库问答
3. **多模态内容处理** - 图片、视频、音频统一处理
4. **智能编程助手** - 编程效率提升3-5倍
5. **个性化推荐系统** - 提升转化率和用户体验
6. **自动化测试与质量** - 提升质量,加速交付
7. **智能投顾与风控** - 智能化投资决策
8. **AR/VR内容创作** - 沉浸式体验
9. **IoT智能控制** - 自动化控制,智能决策
10. **可持续发展ESG** - 碳中和、ESG管理

---

## 🔄 版本历史

### v3.1.0 (2026-03-09) - 创新场景扩展
- ✨ 新增 `skills_extended.json` (包含创新场景)
- 📚 新增 `INNOVATIVE_SCENARIOS.md` (10个创新场景)
- 🔧 优化 `skills_minimal.json` (精简信息)

### v3.0.0 (2026-03-09) - 质量优先版本
- ✨ 新增 `skills_core.json` (60个核心技能)
- ✨ 新增 `skills_minimal.json` (精简版)
- 📚 新增 `SCENARIO_GUIDES.md` (10个场景)
- 📚 新增 `UPDATE_LOG.md` (更新日志)
- 🎯 从100+精简到60个核心技能
- 📈 平均评分提升至4.5⭐

### v2.0.0 (2026-03-09) - 初始版本
- ✨ 创建项目结构
- 📦 20个基础技能
- 📚 基础文档体系

---

## 🎯 使用建议

### 快速开始 (5分钟)
```bash
1. 查看 skills_core.json
2. 选择需要的技能
3. 参考 SCENARIO_GUIDES.md
4. 开始使用
```

### 深度定制 (1小时)
```bash
1. 阅读 CORE_SKILLS.md
2. 研究 INNOVATIVE_SCENARIOS.md
3. 从 skills_extended.json 选择
4. 自定义组合
```

### 完整部署 (1天)
```bash
1. 阅读所有文档
2. 评估业务需求
3. 选择技能组合
4. 开发集成
5. 测试部署
```

---

## 📞 获取帮助

### 文档资源
- 📖 [README.md](README.md) - 项目介绍
- 🚀 [QUICK_START.md](QUICK_START.md) - 快速开始
- 📚 [docs/](docs/) - 完整文档

### 社区支持
- 💬 Discord: OpenClaw Community
- 🐛 GitHub: Issues & Discussions
- 📧 Email: support@openclaw.ai

### 专业服务
- 🔧 技术支持: tech@openclaw.ai
- 💼 业务咨询: biz@openclaw.ai
- 🎓 培训服务: training@openclaw.ai

---

## 🎉 下一步

1. ✅ **选择数据文件**: 推荐 `skills_core.json`
2. ✅ **阅读场景指南**: [SCENARIO_GUIDES.md](docs/SCENARIO_GUIDES.md)
3. ✅ **探索创新场景**: [INNOVATIVE_SCENARIOS.md](docs/INNOVATIVE_SCENARIOS.md)
4. ✅ **开始使用**: 根据场景指南实施

---

**维护者**: OpenClaw Community
**版本**: v3.1.0
**最后更新**: 2026-03-09
