# OpenClaw 中国商业技能集成方案

> **目标**: 将 53 个中国商业场景技能集成到 OpenClaw，打造即开即用的中文 AI 助手
> 
> **版本**: v1.0
> **日期**: 2026-03-10
> **作者**: OpenClaw 社区

---

## 📋 目录

1. [现状分析](#现状分析)
2. [集成方案对比](#集成方案对比)
3. [推荐方案：插件式集成](#推荐方案插件式集成)
4. [实施路线图](#实施路线图)
5. [技术架构](#技术架构)
6. [技能清单](#技能清单)
7. [开发指南](#开发指南)
8. [发布策略](#发布策略)

---

## 现状分析

### OpenClaw 技能系统

OpenClaw 使用 **AgentSkills** 兼容的技能系统，技能加载顺序：

```
优先级：workspace > managed > bundled

1. Bundled Skills    - 随 OpenClaw 安装包自带（最低优先级）
2. Managed Skills    - ~/.openclaw/skills（全局共享）
3. Workspace Skills  - <workspace>/skills（最高优先级）
4. Plugin Skills     - 通过插件加载（按插件配置）
```

### 已有资源

| 资源 | 数量 | 状态 |
|------|------|------|
| 本地已安装技能 | 72 | ✅ 可用 |
| 飞书插件技能 | 9 | ✅ 可用 |
| 中国商业场景定义 | 53 | 📝 数据定义 |
| 无需 API 技能 | 26 | 🔥 优先实现 |
| 需要 API 技能 | 27 | 📌 二期实现 |

### 核心发现

1. **OpenClaw 支持插件扩展** - 可以通过插件打包技能
2. **技能系统成熟** - 支持 metadata、安装器、环境配置
3. **ClawHub 作为分发渠道** - 可以发布到官方市场
4. **本地技能优先级最高** - 用户可以覆盖默认技能

---

## 集成方案对比

### 方案 A: Fork OpenClaw + 内置技能包

**描述**: Fork OpenClaw 官方仓库，将中国技能作为 bundled skills 内置

**优点**:
- ✅ 完全控制，可以深度定制
- ✅ 用户安装一次即可获得所有技能
- ✅ 可以修改核心功能适配中文场景

**缺点**:
- ❌ 维护成本高，需要持续同步上游更新
- ❌ 难以贡献回官方仓库
- ❌ 用户需要安装特定版本

**适用场景**: 企业内部定制、深度定制需求

---

### 方案 B: OpenClaw 插件（推荐 ⭐）

**描述**: 创建 `openclaw-china-skills` 插件，通过 OpenClaw 插件系统分发

**优点**:
- ✅ 与官方 OpenClaw 完全兼容
- ✅ 独立维护，不影响主项目
- ✅ 用户可以按需安装/卸载
- ✅ 支持增量更新
- ✅ 可以贡献到官方插件生态

**缺点**:
- ⚠️ 需要学习 OpenClaw 插件开发
- ⚠️ 受限于插件 API 能力

**适用场景**: 社区分发、通用解决方案

---

### 方案 C: ClawHub 发布 + 安装脚本

**描述**: 将技能发布到 ClawHub，提供一键安装脚本

**优点**:
- ✅ 官方推荐方式
- ✅ 用户可以按需选择技能
- ✅ 自动更新支持

**缺点**:
- ❌ 需要逐个发布技能
- ❌ 用户需要手动选择安装
- ❌ 不是"开箱即用"

**适用场景**: 单个技能发布、渐进式采用

---

### 方案 D: Docker 镜像预装版

**描述**: 构建预装所有中国技能的 Docker 镜像

**优点**:
- ✅ 真正的开箱即用
- ✅ 环境一致性保证
- ✅ 易于部署和扩展

**缺点**:
- ❌ Docker 门槛较高
- ❌ 镜像体积大
- ❌ 更新需要重新构建镜像

**适用场景**: 企业部署、云服务

---

## 推荐方案：插件式集成

### 为什么选择插件方案？

1. **最佳平衡** - 在可维护性和易用性之间取得平衡
2. **官方支持** - OpenClaw 原生支持插件系统
3. **独立演进** - 不依赖官方发布周期
4. **社区友好** - 易于贡献和协作

### 插件架构

```
openclaw-china-skills/
├── openclaw.plugin.json          # 插件配置
├── package.json                   # NPM 包配置
├── README.md                      # 使用文档
├── skills/                        # 技能目录
│   ├── office/                    # 办公协作
│   │   ├── lark-calendar/
│   │   │   └── SKILL.md
│   │   ├── meeting-notes/
│   │   │   └── SKILL.md
│   │   └── ...
│   ├── ecommerce/                 # 电商运营
│   │   ├── taobao-product-manager/
│   │   ├── douyin-ecommerce/
│   │   └── ...
│   ├── service/                   # 客户服务
│   │   ├── smart-customer-service/
│   │   ├── faq-generator/
│   │   └── ...
│   ├── data/                      # 数据分析
│   │   ├── report-generator/
│   │   ├── data-visualization/
│   │   └── ...
│   └── ...                        # 其他分类
├── config/                        # 配置模板
│   ├── office.json               # 办公类配置
│   ├── ecommerce.json            # 电商类配置
│   └── ...
└── scripts/                       # 工具脚本
    ├── install.sh                 # 安装脚本
    ├── setup-env.sh               # 环境配置
    └── validate.js                # 技能验证
```

### openclaw.plugin.json 示例

```json
{
  "name": "openclaw-china-skills",
  "version": "1.0.0",
  "description": "中国商业场景技能包 - 53个即开即用的技能",
  "author": "OpenClaw China Community",
  "license": "MIT",
  "repository": "https://github.com/LegionZYX/openclaw-china-skills",
  "skills": ["skills"],
  "config": {
    "skills.china.office.enabled": {
      "type": "boolean",
      "default": true,
      "description": "启用办公协作类技能"
    },
    "skills.china.ecommerce.enabled": {
      "type": "boolean",
      "default": true,
      "description": "启用电商运营类技能"
    },
    "skills.china.feishu.appId": {
      "type": "string",
      "description": "飞书应用 App ID"
    },
    "skills.china.feishu.appSecret": {
      "type": "string",
      "secret": true,
      "description": "飞书应用 App Secret"
    }
  },
  "metadata": {
    "openclaw": {
      "minVersion": "2025.1.0",
      "category": "skills",
      "tags": ["china", "business", "chinese", "lark", "feishu"],
      "homepage": "https://github.com/LegionZYX/openclaw-china-skills#readme"
    }
  }
}
```

---

## 实施路线图

### Phase 1: 基础设施（1-2 周）

**目标**: 搭建插件框架，实现首批 10 个核心技能

**任务**:
- [ ] 创建插件仓库结构
- [ ] 编写 `openclaw.plugin.json`
- [ ] 实现技能验证脚本
- [ ] 创建首批 10 个无 API 技能
  - 内容创作助手
  - 智能客服
  - 报表生成器
  - 数据可视化
  - 简历筛选
  - 代码审查
  - 本地 Whisper 转录
  - 知识库管理
  - PDF 处理
  - 翻译助手

**交付物**:
- ✅ 可安装的插件包
- ✅ 10 个核心技能
- ✅ 基础文档

---

### Phase 2: 办公协作（2-3 周）

**目标**: 完成飞书/钉钉/企业微信集成技能

**任务**:
- [ ] 飞书技能包（9 个）
  - 飞书日历 ✅
  - 飞书多维表格 ✅
  - 飞书任务
  - 飞书消息
  - 飞书文档
  - 会议纪要
  - 审批流程
  - 通讯录
  - 知识库
- [ ] 钉钉技能包（3 个）
  - 钉钉考勤
  - 钉钉消息
  - 钉钉审批
- [ ] 企业微信技能包（2 个）
  - 企业微信通讯录
  - 企业微信消息

**交付物**:
- ✅ 完整的办公协作技能包
- ✅ OAuth 集成文档
- ✅ 配置向导

---

### Phase 3: 电商运营（2-3 周）

**目标**: 完成主流电商平台集成技能

**任务**:
- [ ] 淘宝/天猫技能（3 个）
- [ ] 抖音电商技能（3 个）
- [ ] 拼多多技能（2 个）
- [ ] 京东技能（2 个）
- [ ] 通用电商技能（5 个）
  - 库存管理
  - 价格监控
  - 竞品分析
  - 数据分析
  - 客服管理

**交付物**:
- ✅ 完整的电商运营技能包
- ✅ 平台 API 集成指南
- ✅ 数据安全最佳实践

---

### Phase 4: 内容与营销（2 周）

**目标**: 完成内容创作和营销推广技能

**任务**:
- [ ] 内容创作技能（5 个）
- [ ] 社媒管理技能（5 个）
- [ ] SEO 优化技能（2 个）
- [ ] 广告投放技能（2 个）

**交付物**:
- ✅ 内容营销技能包
- ✅ 多平台发布指南

---

### Phase 5: 企业服务（2 周）

**目标**: 完成数据分析、客户服务、HR 等企业级技能

**任务**:
- [ ] 数据分析技能（5 个）
- [ ] 客户服务技能（5 个）
- [ ] HR 技能（5 个）
- [ ] 财务技能（3 个）
- [ ] 法务技能（2 个）

**交付物**:
- ✅ 企业服务技能包
- ✅ 企业部署指南

---

### Phase 6: 发布与推广（1 周）

**目标**: 正式发布，社区推广

**任务**:
- [ ] 发布到 npm
- [ ] 提交到 ClawHub
- [ ] 编写完整文档
- [ ] 制作演示视频
- [ ] 社区推广

**交付物**:
- ✅ 正式版本发布
- ✅ ClawHub 上架
- ✅ 完整文档站
- ✅ 演示视频

---

## 技术架构

### 技能分层

```
┌─────────────────────────────────────────┐
│           OpenClaw Gateway              │
└──────────────┬──────────────────────────┘
               │
               ├─ Core Skills (Bundled)
               │
               ├─ openclaw-china-skills (Plugin)
               │   ├─ Layer 1: 无需 API (26个)
               │   │   └─ 立即可用
               │   │
               │   ├─ Layer 2: 需要 API (27个)
               │   │   └─ 配置后可用
               │   │
               │   └─ Layer 3: 高级集成
               │       └─ 企业定制
               │
               └─ User Custom Skills (Workspace)
```

### 配置管理

```json5
// ~/.openclaw/openclaw.json
{
  plugins: {
    "openclaw-china-skills": {
      enabled: true,
      config: {
        // 飞书配置
        feishu: {
          appId: { source: "env", id: "FEISHU_APP_ID" },
          appSecret: { source: "env", id: "FEISHU_APP_SECRET" },
        },
        
        // 钉钉配置
        dingtalk: {
          appKey: { source: "env", id: "DINGTALK_APP_KEY" },
          appSecret: { source: "env", id: "DINGTALK_APP_SECRET" },
        },
        
        // 电商配置
        ecommerce: {
          taobao: { enabled: true },
          douyin: { enabled: true },
        },
        
        // 功能开关
        features: {
          autoSetup: true,        // 自动配置
          fallbackToFree: true,   // 无 API 时使用免费替代
          cacheEnabled: true,     // 启用缓存
        },
      },
    },
  },
}
```

### 环境变量模板

```bash
# ~/.openclaw/.env.china

# ===== 飞书 =====
FEISHU_APP_ID=cli_xxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxx

# ===== 钉钉 =====
DINGTALK_APP_KEY=xxxxxxxxxxxxxxxx
DINGTALK_APP_SECRET=xxxxxxxxxxxxxxxx

# ===== 企业微信 =====
WECOM_CORP_ID=xxxxxxxxxxxxxxxx
WECOM_AGENT_ID=xxxxxxxxxxxxxxxx
WECOM_SECRET=xxxxxxxxxxxxxxxx

# ===== 电商 =====
TAOBAO_APP_KEY=xxxxxxxxxxxxxxxx
TAOBAO_APP_SECRET=xxxxxxxxxxxxxxxx
DOUYIN_APP_ID=xxxxxxxxxxxxxxxx
DOUYIN_APP_SECRET=xxxxxxxxxxxxxxxx

# ===== AI 服务 =====
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx

# ===== 搜索 =====
PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxxxxx
TAVILY_API_KEY=tvly-xxxxxxxxxxxxxxxx
```

---

## 技能清单

### 🔥 Layer 1: 无需 API（26个）- 立即可用

| 分类 | 技能 | 优先级 | 状态 |
|------|------|--------|------|
| **内容生成** | 内容创作助手 | P0 | 📝 |
| | YouTube视频摘要 | P1 | 📝 |
| | YouTube标题生成器 | P2 | 📝 |
| **客户服务** | 智能客服 | P0 | 📝 |
| | 工单管理系统 | P1 | 📝 |
| | FAQ自动生成 | P1 | 📝 |
| **数据分析** | 报表生成器 | P0 | 📝 |
| | 数据可视化 | P0 | 📝 |
| | Excel周报仪表板 | P1 | 📝 |
| **人力资源** | 简历筛选 | P1 | 📝 |
| | 简历优化器 | P1 | 📝 |
| **开发运维** | 代码审查 | P0 | ✅ 已有 |
| | CI流水线 | P1 | 📝 |
| **语音处理** | 本地Whisper转录 | P0 | 📝 |
| | Faster Whisper | P1 | 📝 |
| | MLX Whisper | P2 | 📝 |
| **知识管理** | 第二大脑知识库 | P1 | 📝 |
| | Notebook知识库 | P1 | 📝 |
| | 本地文档搜索 | P1 | 📝 |
| | QMD搜索 | P2 | 📝 |
| **PDF处理** | PDF表单填写 | P1 | 📝 |
| | MinerU PDF解析 | P1 | 📝 |
| | PyMuPDF解析 | P2 | 📝 |
| **电商** | 库存管理系统 | P1 | 📝 |
| **财务** | PDF表单填写 | P1 | 📝 |

### 📌 Layer 2: 需要 API（27个）- 配置后可用

#### 🏢 办公协作（6个）

| 技能 | 平台 | API需求 | 优先级 | 状态 |
|------|------|---------|--------|------|
| 飞书日程管理 | 飞书 | App ID/Secret | P0 | ✅ 已有 |
| 钉钉考勤统计 | 钉钉 | App Key/Secret | P0 | 📝 |
| 文档协作 | 飞书 | App ID/Secret | P1 | ✅ 已有 |
| 在线白板 | 飞书 | App ID/Secret | P2 | 📝 |
| 提醒机器人 | 飞书 | App ID/Secret | P1 | 📝 |
| 工作流自动化 | 飞书 | App ID/Secret | P1 | 📝 |

#### 🛒 电商运营（5个）

| 技能 | 平台 | API需求 | 优先级 | 状态 |
|------|------|---------|--------|------|
| 淘宝商品管理 | 淘宝 | App Key/Secret | P0 | 📝 |
| 京东订单处理 | 京东 | App Key/Secret | P1 | 📝 |
| 抖音电商运营 | 抖音 | App ID/Secret | P0 | 📝 |
| 拼多多运营 | 拼多多 | App Key/Secret | P1 | 📝 |
| 麦当劳优惠券 | 麦当劳 | - | P2 | 📝 |

#### 📢 营销推广（4个）

| 技能 | 平台 | API需求 | 优先级 | 状态 |
|------|------|---------|--------|------|
| 公众号管理 | 微信 | App ID/Secret | P0 | 📝 |
| 抖音运营助手 | 抖音 | App ID/Secret | P0 | 📝 |
| 社交媒体调度 | Postiz | API Key | P1 | 📝 |
| 社媒内容管理 | Typefully | API Key | P2 | 📝 |

#### 🔍 搜索与研究（3个）

| 技能 | 平台 | API需求 | 优先级 | 状态 |
|------|------|---------|--------|------|
| Perplexity AI搜索 | Perplexity | API Key | P0 | 📝 |
| Tavily AI搜索 | Tavily | API Key | P1 | 📝 |
| SerpAPI搜索 | SerpAPI | API Key | P1 | 📝 |

---

## 开发指南

### 技能开发流程

```bash
# 1. 创建技能目录
mkdir -p skills/office/meeting-notes

# 2. 创建 SKILL.md
cat > skills/office/meeting-notes/SKILL.md << 'EOF'
---
name: meeting-notes
description: 自动生成会议纪要和待办事项
metadata:
  openclaw:
    emoji: 📝
    category: office
    requires:
      apis: []
      bins: []
---

# 会议纪要助手

自动从会议录音/文本生成结构化纪要和待办事项。

## 功能

- 📝 自动提取关键信息
- ✅ 生成待办事项
- 👥 识别参会人员
- 📊 生成会议摘要

## 使用场景

### 1. 从录音生成纪要

**用户**: "帮我生成今天产品会议的纪要"

**Agent**:
\`\`\`
正在处理会议录音...

✅ 会议纪要已生成:

## 产品需求评审会议
**时间**: 2026-03-10 14:00-15:30
**参会人**: 张三、李四、王五

### 关键决议
1. 确认 Q2 产品路线图
2. 新增 3 个核心功能
3. 延期 2 个非核心功能

### 待办事项
- [ ] 张三: 完成 PRD 文档 (3/15)
- [ ] 李四: 设计原型 (3/18)
- [ ] 王五: 技术评估 (3/20)
\`\`\`

## 配置

无需配置，开箱即用。

## 最佳实践

1. 提供清晰的会议主题
2. 确保录音质量良好
3. 明确标注发言人
EOF

# 3. 验证技能
node scripts/validate.js skills/office/meeting-notes

# 4. 测试技能
openclaw agent --message "帮我生成会议纪要"
```

### 技能模板

```markdown
---
name: <skill-id>
description: <一句话描述>
metadata:
  openclaw:
    emoji: <emoji>
    category: <category>
    requires:
      apis: [<api-names>]
      bins: [<binary-names>]
    install:
      - id: <installer-id>
        kind: brew|npm|download
        # ... installer config
    skillKey: <config-key>  # 可选，用于配置
---

# <技能名称>

<详细描述>

## 功能

- 🎯 功能1
- 🎯 功能2
- 🎯 功能3

## 使用场景

### 1. 场景1

**用户**: "<用户输入>"

**Agent**:
\`\`\`
<Agent 响应>
\`\`\`

## 配置

### 环境变量

\`\`\`bash
ENV_VAR=value
\`\`\`

### OpenClaw 配置

\`\`\`json5
{
  skills: {
    entries: {
      "<skill-id>": {
        enabled: true,
        env: {
          ENV_VAR: "value",
        },
      },
    },
  },
}
\`\`\`

## 最佳实践

1. 实践1
2. 实践2

## 错误处理

### 常见错误

1. **错误1**
   - 原因: xxx
   - 解决: xxx

## API 限制

- 频率: xxx
- 配额: xxx

## 更新日志

### v1.0.0 (YYYY-MM-DD)
- ✨ 初始版本
```

---

## 发布策略

### 版本管理

```
主版本.次版本.修订版

- 主版本: 重大架构变更
- 次版本: 新增技能/功能
- 修订版: Bug 修复/文档更新

示例:
- 1.0.0 - 首次发布
- 1.1.0 - 新增 5 个技能
- 1.1.1 - 修复文档错误
```

### 发布渠道

| 渠道 | 用途 | 更新频率 |
|------|------|----------|
| npm (latest) | 稳定版 | 每月 |
| npm (beta) | 测试版 | 每周 |
| npm (dev) | 开发版 | 每日 |
| GitHub Releases | 里程碑版本 | 按需 |
| ClawHub | 官方市场 | 跟随 npm latest |

### 安装方式

```bash
# 方式 1: 通过 OpenClaw CLI（推荐）
openclaw plugin install openclaw-china-skills

# 方式 2: 通过 npm
npm install -g openclaw-china-skills

# 方式 3: 从源码
git clone https://github.com/LegionZYX/openclaw-china-skills
cd openclaw-china-skills
npm link
```

---

## 下一步行动

### 立即开始

1. **创建仓库**
   ```bash
   git init openclaw-china-skills
   cd openclaw-china-skills
   ```

2. **初始化项目**
   ```bash
   npm init -y
   mkdir -p skills/office skills/ecommerce skills/service
   ```

3. **创建第一个技能**
   ```bash
   # 选择一个无需 API 的技能开始
   mkdir -p skills/content/content-creator
   # 编写 SKILL.md...
   ```

4. **测试安装**
   ```bash
   npm link
   openclaw plugin list
   ```

### 贡献指南

欢迎社区贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md)

### 获取帮助

- 📖 文档: https://github.com/LegionZYX/openclaw-china-skills/wiki
- 💬 社区: https://discord.gg/clawd
- 🐛 问题: https://github.com/LegionZYX/openclaw-china-skills/issues
- 📧 邮件: openclaw-china@example.com

---

## 附录

### A. 参考资源

- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [AgentSkills 规范](https://agentskills.io)
- [ClawHub 技能市场](https://clawhub.com)
- [OpenClaw 插件开发](https://docs.openclaw.ai/tools/plugin)

### B. 相关项目

- [openclaw/openclaw](https://github.com/openclaw/openclaw) - OpenClaw 核心
- [openclaw/skills](https://github.com/openclaw/skills) - 官方技能仓库
- [feishu-openclaw-plugin](https://github.com/openclaw/feishu-openclaw-plugin) - 飞书插件

### C. 许可证

MIT License - 详见 [LICENSE](LICENSE)

---

**文档版本**: 1.0
**最后更新**: 2026-03-10
**维护者**: OpenClaw China Community
