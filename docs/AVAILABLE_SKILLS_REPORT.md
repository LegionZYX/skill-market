# OpenClaw 可用技能完整报告

> 生成时间: 2026-03-10
> 来源: 本地已安装 + ClawHub + skill-marketplace 数据

---

## 📊 总览

| 类别 | 数量 | 状态 |
|------|------|------|
| 本地已安装可用 | 72 | ✅ 立即可用 |
| skill-marketplace 定义 | 300+ | 📝 数据定义 |
| ClawHub 社区 | 200+ | 🌐 可安装 |

---

## 一、本地已安装技能（72个）

### ✅ 真正可用 - 立即可用

这些技能已经安装在本地，无需任何配置即可使用。

#### 🏢 办公协作 & 飞书集成 (9个)

| 技能ID | 名称 | 描述 | 选择理由 |
|--------|------|------|----------|
| `feishu-calendar` | 飞书日历 | 管理飞书日程、创建会议、查询安排 | 飞书原生集成，高频使用 |
| `feishu-bitable` | 飞书多维表格 | 创建/查询/编辑多维表格记录 | 企业数据管理核心 |
| `feishu-task` | 飞书任务 | 创建、查询、更新任务和清单 | 任务管理必备 |
| `feishu-im-read` | 飞书IM读取 | 获取群聊/单聊历史消息、搜索消息 | 消息检索必备 |
| `feishu-create-doc` | 创建飞书文档 | 从 Markdown 创建飞书云文档 | 文档创建 |
| `feishu-fetch-doc` | 获取飞书文档 | 获取飞书云文档内容 | 文档读取 |
| `feishu-update-doc` | 更新飞书文档 | 追加、替换、插入文档内容 | 文档编辑 |
| `feishu-channel-rules` | 飞书频道规则 | Lark/Feishu 输出格式规则 | 输出优化 |
| `feishu-troubleshoot` | 飞书问题排查 | 诊断飞书插件问题 | 故障排查 |

**安装位置**: `~/.openclaw/extensions/feishu-openclaw-plugin/skills/`

---

#### 🔧 开发运维 (25个)

| 技能ID | 名称 | 描述 | 选择理由 |
|--------|------|------|----------|
| `github` | GitHub操作 | gh CLI 操作 issues、PRs、CI | 开发者必备 |
| `git-essentials` | Git基础 | 版本控制、分支、协作 | 基础技能 |
| `git-workflows` | Git高级 | rebase、bisect、worktree、reflog | 高级操作 |
| `docker-essentials` | Docker基础 | 容器管理、镜像操作 | 容器化必备 |
| `dns-networking` | DNS网络 | DNS解析、网络连接调试 | 运维排查 |
| `ssh-tunnel` | SSH隧道 | 端口转发、跳板机、密钥管理 | 远程访问 |
| `api-dev` | API开发 | REST/GraphQL API脚手架、测试 | API开发 |
| `backend-patterns` | 后端模式 | Node.js/Express/Next.js 最佳实践 | 后端开发 |
| `python-guide` | Python指南 | Python编码规范和最佳实践 | Python开发 |
| `tdd-guide` | TDD指南 | 测试驱动开发工作流 | 测试开发 |
| `mcp-builder` | MCP构建 | 创建MCP服务器 | AI集成 |
| `code-reviewer` | 代码审查 | AI辅助代码审查 | 质量保证 |
| `pr-reviewer` | PR审查 | Pull Request 审查流程 | 代码评审 |
| `deploy-agent` | 部署代理 | 多步骤部署：构建→测试→GitHub→Cloudflare | 自动部署 |
| `emergency-rescue` | 紧急救援 | 开发灾难恢复 | 故障恢复 |
| `senior-architect` | 架构师 | 系统架构设计、技术选型 | 架构设计 |
| `regex-patterns` | 正则模式 | 实用正则表达式模式 | 文本处理 |
| `logseq` | Logseq | Logseq API 集成 | 知识管理 |

**安装位置**: `~/.agents/skills/`

---

#### 📝 内容创作 & 写作 (5个)

| 技能ID | 名称 | 描述 | 选择理由 |
|--------|------|------|----------|
| `writing` | 写作助手 | 写作风格记忆、改进清晰度 | 内容创作 |
| `coding` | 编码风格 | 编码偏好、约定、模式记忆 | 代码风格 |
| `moltbot-best-practices` | AI最佳实践 | Cursor/Claude/ChatGPT/Copilot 最佳实践 | AI协作 |
| `get-tldr` | TLDR摘要 | 网页内容摘要 | 快速阅读 |
| `manim-composer` | Manim视频 | 规划数学/科学教育视频 | 视频创作 |

---

#### 🧠 思维 & 规划 (15个)

| 技能ID | 名称 | 描述 | 选择理由 |
|--------|------|------|----------|
| `brainstorming` | 头脑风暴 | 创意工作前的需求探索 | 创意开发 |
| `writing-plans` | 编写计划 | 多步骤任务的实现计划 | 项目规划 |
| `executing-plans` | 执行计划 | 在独立会话中执行实现计划 | 计划执行 |
| `subagent-driven-development` | 子代理开发 | 独立任务的实现 | 并行开发 |
| `test-driven-development` | 测试驱动 | 功能实现前的TDD | 质量保证 |
| `systematic-debugging` | 系统调试 | Bug修复前的系统调试 | 问题排查 |
| `verification-before-completion` | 完成验证 | 完成前的验证检查 | 质量保证 |
| `requesting-code-review` | 请求代码审查 | 完成任务后的审查请求 | 代码质量 |
| `receiving-code-review` | 接收代码审查 | 处理审查反馈 | 代码改进 |
| `finishing-a-development-branch` | 完成开发分支 | 合并、PR或清理决策 | 开发完成 |
| `using-git-worktrees` | Git Worktrees | 隔离的开发环境 | 并行开发 |
| `productivity` | 生产力 | 时间管理、专注、任务系统 | 效率提升 |
| `business-model-canvas` | 商业模式画布 | 独立创业者的商业模式设计 | 商业规划 |
| `rationality` | 理性思维 | 理性决策支持 | 决策辅助 |
| `quests` | 任务系统 | 任务管理和追踪 | 任务管理 |

---

#### 🌐 浏览器 & 网络工具 (8个)

| 技能ID | 名称 | 描述 | 选择理由 |
|--------|------|------|----------|
| `browse` | 浏览器自动化 | Stagehand CLI 浏览器自动化 | 网页操作 |
| `browserbase-browser-automation` | 浏览器自动化 | 自动化网页交互 | 自动化 |
| `browserbase-auth` | 浏览器认证 | 交互式认证流程 | 登录操作 |
| `browserbase-create` | 创建脚本 | 创建浏览器自动化脚本 | 脚本创建 |
| `browserbase-fix` | 修复脚本 | 调试失败自动化 | 故障修复 |
| `browserbase-functions` | 无服务器函数 | 部署浏览器自动化 | 云部署 |
| `agent-browser` | 代理浏览器 | 网页测试、表单填写、截图 | 网页测试 |
| `exa-web-search-free` | Exa搜索 | 免费 AI 搜索 (无需API) | 网页搜索 |

---

#### 🛠️ 工具 & 实用程序 (10个)

| 技能ID | 名称 | 描述 | 选择理由 |
|--------|------|------|----------|
| `skill-creator` | 技能创建 | 创建或更新 AgentSkills | 技能开发 |
| `writing-skills` | 编写技能 | 创建新技能、编辑现有技能 | 技能编写 |
| `find-skills` | 发现技能 | 发现和安装技能 | 技能发现 |
| `dispatching-parallel-agents` | 并行代理 | 分发独立任务到多个代理 | 并行处理 |
| `using-superpowers` | 使用超能力 | 查找和使用技能 | 技能使用 |
| `file-links-tool` | 文件链接 | 安全上传文件并提供下载链接 | 文件分享 |
| `hour-meter` | 计时器 | 运行时间追踪 | 时间追踪 |
| `task-status` | 任务状态 | 长任务的状态更新 | 状态报告 |
| `speedtest` | 网速测试 | Ookla Speedtest CLI | 网络测试 |
| `prompt-log` | 提示日志 | 提取会话日志 | 日志提取 |

---

#### 🎨 前端 & 设计 (2个)

| 技能ID | 名称 | 描述 | 选择理由 |
|--------|------|------|----------|
| `frontend-design` | 前端设计 | Anthropic 风格 UI 设计 | 界面设计 |
| `anthropic-frontend-design` | Anthropic前端 | 独特的前端界面设计 | 高质量UI |

---

#### 📊 数据 & 分析 (3个)

| 技能ID | 名称 | 描述 | 选择理由 |
|--------|------|------|----------|
| `openviking` | OpenViking | 语义搜索、文档索引 | 知识库 |
| `openviking-skill` | OpenViking技能 | OpenViking 技能集成 | 知识管理 |
| `mailchannels` | MailChannels | 邮件发送 API | 邮件服务 |

---

#### 🎮 其他 (5个)

| 技能ID | 名称 | 描述 | 选择理由 |
|--------|------|------|----------|
| `weather` | 天气 | wttr.in 天气查询 | 天气信息 |
| `weather-open-meteo` | Open-Meteo天气 | Open-Meteo 天气 API | 天气预报 |
| `healthcheck` | 健康检查 | 安全加固和风险配置 | 安全检查 |
| `evolver` | 演化器 | AI 代理自我演化引擎 | 自我改进 |
| `work-report` | 工作报告 | 基于 git 提交生成日报/周报 | 报告生成 |

---

## 二、安装方法

### 方法1: 从 ClawHub 安装

```bash
# 访问 ClawHub 网站
https://clawhub.com

# 或使用 CLI (如果有)
npx openclaw-skills@latest install <skill-id>
```

### 方法2: 手动安装

```bash
# 1. 克隆技能仓库
git clone https://github.com/openclaw/skills.git

# 2. 复制技能到本地
cp -r skills/<category>/<skill-id> ~/.agents/skills/

# 3. 重启 OpenClaw
```

### 方法3: 从 GitHub 安装

```bash
# 直接安装
npx openclaw-skills@latest install <skill-id>

# 示例
npx openclaw-skills@latest install lark-calendar
```

---

## 三、skill-marketplace 定义技能 (20个精选)

这些技能在 skill-marketplace 中有完整定义，但需要创建实际的 SKILL.md 文件。

### 🔥 热门技能 - 推荐优先实现

| 技能ID | 名称 | 分类 | 评分 | 下载量 | GitHub URL |
|--------|------|------|------|--------|------------|
| `smart-customer-service` | 智能客服 | service | ⭐4.9 | 20000 | [链接](https://github.com/openclaw/skills/tree/main/service/smart-customer-service) |
| `content-creator` | 内容创作助手 | marketing | ⭐4.8 | 22000 | [链接](https://github.com/openclaw/skills/tree/main/marketing/content-creator) |
| `report-generator` | 报表生成器 | data | ⭐4.7 | 18000 | [链接](https://github.com/openclaw/skills/tree/main/data/report-generator) |
| `douyin-ecommerce` | 抖音电商运营 | ecommerce | ⭐4.7 | 13000 | [链接](https://github.com/openclaw/skills/tree/main/ecommerce/douyin-ecommerce) |
| `wechat-mp-manager` | 公众号管理 | marketing | ⭐4.6 | 14000 | [链接](https://github.com/openclaw/skills/tree/main/marketing/wechat-mp-manager) |
| `ai-model-comparison` | AI模型对比 | tech-blogger | ⭐4.8 | 12000 | [链接](https://github.com/openclaw/skills/tree/main/tech-blogger/ai-model-comparison) |
| `ai-tool-review` | AI工具测评 | tech-blogger | ⭐4.7 | 10000 | [链接](https://github.com/openclaw/skills/tree/main/tech-blogger/ai-tool-review) |
| `inventory-manager` | 库存管理系统 | ecommerce | ⭐4.6 | 11000 | [链接](https://github.com/openclaw/skills/tree/main/ecommerce/inventory-manager) |
| `resume-screener` | 简历筛选 | hr | ⭐4.5 | 9000 | [链接](https://github.com/openclaw/skills/tree/main/hr/resume-screener) |
| `invoice-ocr` | 发票识别 | finance | ⭐4.6 | 8500 | [链接](https://github.com/openclaw/skills/tree/main/finance/invoice-ocr) |
| `contract-reviewer` | 合同审查 | legal | ⭐4.4 | 7000 | [链接](https://github.com/openclaw/skills/tree/main/legal/contract-reviewer) |
| `personal-calendar` | 个人日程管理 | personal | ⭐4.7 | 12000 | [链接](https://github.com/openclaw/skills/tree/main/personal/personal-calendar) |
| `translator` | 翻译助手 | personal | ⭐4.6 | 15000 | [链接](https://github.com/openclaw/skills/tree/main/personal/translator) |
| `data-visualization` | 数据可视化 | data | ⭐4.5 | 11000 | [链接](https://github.com/openclaw/skills/tree/main/data/data-visualization) |

---

## 四、推荐优先实现的技能 (Tier 1)

基于以下标准选择:
1. **高频使用** - 日常工作中经常需要
2. **低依赖** - 不需要复杂的外部 API
3. **高价值** - 能显著提升效率
4. **已有基础** - 本地有类似技能可参考

### Tier 1 - 核心技能 (20个)

```
办公协作 (5)
├── lark-calendar      ✅ 已有
├── meeting-notes      🔥 会议纪要 - 高频使用
├── task-tracker       🔥 任务跟踪 - 团队必备
├── email-assistant    🔥 邮件助手 - 每日必用
└── approval-flow      🔥 审批流程 - 企业刚需

数据分析 (3)
├── report-generator   🔥 报表生成 - 核心需求
├── data-visualization 🔥 数据可视化 - 高价值
└── sql-generator      🔥 SQL生成 - 开发者必备

内容创作 (4)
├── content-creator    🔥 内容创作 - 营销核心
├── translator         🔥 翻译助手 - 跨语言
├── social-media       🔥 社媒管理 - 运营必备
└── blog-poster        🔥 博客发布 - 内容分发

开发运维 (4)
├── code-reviewer      🔥 代码审查 - 质量保证
├── github-assistant   🔥 GitHub助手 - 开发协作
├── deployment         🔥 部署助手 - CI/CD
└── monitoring         🔥 监控告警 - 运维核心

客户服务 (4)
├── smart-customer-service  🔥 智能客服 - 高价值
├── faq-generator      🔥 FAQ生成 - 知识沉淀
├── ticket-manager     🔥 工单管理 - 服务流程
└── knowledge-base     🔥 知识库 - 信息管理
```

---

## 五、技能开发模板

### 标准 SKILL.md 结构

```markdown
# <技能名称> Skill

<一句话描述>

## 功能

- 🎯 功能1
- 🎯 功能2
- 🎯 功能3

## 使用场景

### 1. 场景1

**用户**: "<用户输入示例>"

**Agent**:
```
<Agent 响应示例>
```

## 配置

### 环境变量

\`\`\`bash
ENV_VAR_1=xxx
ENV_VAR_2=xxx
\`\`\`

### OpenClaw 配置

\`\`\`json
{
  "option1": "value1",
  "option2": "value2"
}
\`\`\`

## 工具

### tool_name_1

<工具描述>

**参数**:
- `param1` (type): 描述
- `param2` (type, 可选): 描述

**示例**:
\`\`\`json
{
  "param1": "value1",
  "param2": "value2"
}
\`\`\`

## 最佳实践

### 1. 实践1

\`\`\`python
# 代码示例
\`\`\`

## 错误处理

### 常见错误

1. **错误1**
\`\`\`
错误: ERROR_CODE
原因: xxx
解决: xxx
\`\`\`

## API 限制

- 频率限制: xxx
- 数据限制: xxx

## 更新日志

### v1.0.0 (YYYY-MM-DD)
- ✨ 初始版本

## 许可证

MIT License

---

**作者**: Your Name
**版本**: 1.0.0
**最后更新**: YYYY-MM-DD
```

---

## 六、下一步行动

### 立即可做

1. ✅ **使用本地已安装的72个技能** - 无需任何配置
2. 📝 **选择 Tier 1 中的 5-10 个技能** - 优先实现高频使用的
3. 🔧 **基于模板创建 SKILL.md** - 参考 `lark-calendar` 的结构

### 中期规划

1. 完成Tier 1的20个技能
2. 建立技能测试框架
3. 集成到 ClawHub

### 长期目标

1. 完成300+技能的完整实现
2. 建立技能质量评分体系
3. 社区贡献机制

---

## 附录

### 相关链接

- **OpenClaw 官网**: https://openclaw.ai
- **ClawHub 技能市场**: https://clawhub.com
- **OpenClaw GitHub**: https://github.com/openclaw/openclaw
- **Skills 仓库**: https://github.com/openclaw/skills
- **社区 Discord**: https://discord.com/invite/clawd

### 本地路径

- **本地已安装技能**: `~/.agents/skills/`
- **飞书插件技能**: `~/.openclaw/extensions/feishu-openclaw-plugin/skills/`
- **skill-marketplace**: `./skill-marketplace/`

---

**报告生成**: OpenClaw Agent
**生成时间**: 2026-03-10
