# Skill 分类体系

## 分类原则

1. **业务导向** - 按照企业实际业务部门划分
2. **场景驱动** - 每个分类对应具体业务场景
3. **平台适配** - 考虑中国主流平台特性
4. **复用优先** - 优先使用可跨平台复用的技能

## 一级分类

### 1. 办公协作 (office)

**目标用户**: 全员

**核心场景**:
- 即时通讯集成 (飞书/钉钉/企业微信)
- 日程管理
- 会议组织
- 文档协作
- 任务跟踪

**平台支持**:
- 飞书 (Lark)
- 钉钉 (DingTalk)
- 企业微信 (WeCom)
- 腾讯文档
- 石墨文档

**示例 Skills**:
- `lark-calendar` - 飞书日程管理
- `dingtalk-attendance` - 钉钉考勤统计
- `wecom-contacts` - 企业微信通讯录
- `doc-collaboration` - 文档协作助手

---

### 2. 电商运营 (ecommerce)

**目标用户**: 电商运营、市场、客服

**核心场景**:
- 商品上架/下架
- 库存管理
- 订单处理
- 客户评价分析
- 竞品监控
- 活动策划

**平台支持**:
- 淘宝/天猫
- 京东
- 拼多多
- 抖音电商
- 快手电商
- 小红书

**示例 Skills**:
- `taobao-product-manager` - 淘宝商品管理
- `jd-order-processor` - 京东订单处理
- `ecommerce-analytics` - 电商数据分析
- `review-sentiment` - 评价情感分析

---

### 3. 客户服务 (service)

**目标用户**: 客服、售后、技术支持

**核心场景**:
- 智能问答
- 工单管理
- FAQ维护
- 投诉处理
- 满意度调查
- 知识库管理

**平台支持**:
- 七鱼客服
- 网易七鱼
- 容联七陌
- 自建客服系统

**示例 Skills**:
- `smart-customer-service` - 智能客服
- `ticket-manager` - 工单管理
- `faq-generator` - FAQ自动生成
- `satisfaction-survey` - 满意度调查

---

### 4. 数据分析 (data)

**目标用户**: 数据分析师、运营、管理层

**核心场景**:
- 数据采集
- 数据清洗
- 报表生成
- 可视化展示
- 预测分析
- BI集成

**平台支持**:
- 阿里云 DataWorks
- 腾讯云 BI
- FineReport
- 自建数据平台

**示例 Skills**:
- `report-generator` - 报表生成器
- `data-visualization` - 数据可视化
- `sales-forecast` - 销售预测
- `user-behavior-analysis` - 用户行为分析

---

### 5. 营销推广 (marketing)

**目标用户**: 市场部、品牌部、运营

**核心场景**:
- 内容创作
- 社交媒体管理
- 广告投放
- SEO/SEM
- 活动策划
- KOL合作

**平台支持**:
- 微信公众号
- 微博
- 抖音
- 小红书
- B站
- 知乎

**示例 Skills**:
- `wechat-mp-manager` - 公众号管理
- `content-creator` - 内容创作助手
- `ad-optimizer` - 广告优化
- `seo-auditor` - SEO审计

---

### 6. 人力资源 (hr)

**目标用户**: HR、人事

**核心场景**:
- 招聘管理
- 简历筛选
- 面试安排
- 考勤统计
- 薪资计算
- 培训管理

**平台支持**:
- 北森
- Moka
- 拉勾
- BOSS直聘

**示例 Skills**:
- `resume-screener` - 简历筛选
- `interview-scheduler` - 面试安排
- `attendance-tracker` - 考勤跟踪
- `payroll-calculator` - 薪资计算

---

### 7. 财务管理 (finance)

**目标用户**: 财务、会计

**核心场景**:
- 发票识别
- 费用报销
- 预算管理
- 税务计算
- 对账
- 财务报表

**平台支持**:
- 金蝶
- 用友
- SAP
- Oracle

**示例 Skills**:
- `invoice-ocr` - 发票识别
- `expense-approval` - 费用审批
- `budget-tracker` - 预算跟踪
- `tax-calculator` - 税务计算

---

### 8. 开发运维 (devops)

**目标用户**: 研发、运维

**核心场景**:
- 代码审查
- CI/CD
- 监控告警
- 日志分析
- 容器管理
- 云资源管理

**平台支持**:
- 阿里云
- 腾讯云
- 华为云
- K8s
- Jenkins

**示例 Skills**:
- `code-reviewer` - 代码审查
- `ci-pipeline` - CI流水线
- `alert-manager` - 告警管理
- `log-analyzer` - 日志分析

---

### 9. 法务合规 (legal)

**目标用户**: 法务、合规

**核心场景**:
- 合同审查
- 合规检查
- 知识产权管理
- 风险评估
- 法律咨询
- 证据收集

**平台支持**:
- 法大大
- 上上签
- 自建法务系统

**示例 Skills**:
- `contract-reviewer` - 合同审查
- `compliance-checker` - 合规检查
- `trademark-monitor` - 商标监控
- `risk-assessor` - 风险评估

---

## 二级分类

每个一级分类下可细分:

- **core** - 核心功能
- **integration** - 第三方集成
- **automation** - 自动化流程
- **analytics** - 数据分析
- **assistant** - 智能助手

## Skill 标签

每个 skill 可打标签:

- `#热门` - 高频使用
- `#新手友好` - 易上手
- `#企业版` - 需要企业账号
- `#付费` - 需要付费 API
- `#本地化` - 针对中国市场

## 优先级

- P0: 核心场景,必备
- P1: 常用场景,推荐
- P2: 特定场景,可选
- P3: 实验性,慎用

---

**维护者**: OpenClaw 社区
**更新时间**: 2026-03-09
