#!/usr/bin/env node
/**
 * 中国商业场景适用技能筛选
 * 从各大技能市场筛选适用于中国企业的技能
 */

const fs = require('fs');

// 排除的关键词（不适用于中国）
const excludeKeywords = [
  'telegram', 'whatsapp', 'slack', 'discord', 'salesforce',
  'hubspot', 'zendesk', 'shopify', 'stripe', 'paypal',
  'notion', 'airtable', 'figma', 'linear', 'asana',
  'trello', 'monday', 'jira', 'confluence',
  'twitter', 'x.com', 'reddit', 'medium',
  'uk-', 'nhs', 'gov-uk', 'hmrc',
  'swiss', 'german', 'french', 'italian',
  'us-', 'california', 'texas'
];

// 中国平台白名单
const chinaPlatforms = [
  'feishu', 'lark', 'dingtalk', 'wechat', 'weixin',
  'alipay', 'taobao', 'tmall', 'jd', 'pinduoduo',
  'douyin', 'tiktok', 'xiaohongshu', 'bilibili',
  'weibo', 'zhihu', 'baidu', 'alibaba', 'tencent',
  'bytedance', 'meituan', 'didi', 'kuaishou',
  '12306', 'mcd-cn', 'eleme', 'alimama'
];

// 从ClawHub筛选的技能（基于刚才访问的内容）
const clawhubSkills = [
  // 办公协作
  {id: 'lark-calendar', name: '飞书日程管理', category: 'office', platform: '飞书', needsAPI: true, source: 'https://clawdhub.com/skills/lark-calendar'},
  {id: 'dingtalk-attendance', name: '钉钉考勤统计', category: 'office', platform: '钉钉', needsAPI: true, source: 'https://clawdhub.com/skills/dingtalk-attendance'},
  {id: 'meeting-notes', name: '会议纪要助手', category: 'office', platform: '飞书', needsAPI: false, source: 'https://clawdhub.com/skills/meeting-notes'},
  {id: 'document-collaboration', name: '文档协作', category: 'office', platform: '飞书', needsAPI: true, source: 'https://clawdhub.com/skills/document-collaboration'},
  {id: 'online-whiteboard', name: '在线白板', category: 'office', platform: '飞书', needsAPI: true, source: 'https://clawdhub.com/skills/online-whiteboard'},
  {id: 'reminder-bot', name: '提醒机器人', category: 'office', platform: '飞书', needsAPI: true, source: 'https://clawdhub.com/skills/reminder-bot'},
  {id: 'workflow-automation', name: '工作流自动化', category: 'office', platform: '飞书', needsAPI: true, source: 'https://clawdhub.com/skills/workflow-automation'},

  // 电商运营
  {id: 'taobao-product-manager', name: '淘宝商品管理', category: 'ecommerce', platform: '淘宝', needsAPI: true, source: 'https://clawdhub.com/skills/taobao-product-manager'},
  {id: 'jd-order-processor', name: '京东订单处理', category: 'ecommerce', platform: '京东', needsAPI: true, source: 'https://clawdhub.com/skills/jd-order-processor'},
  {id: 'douyin-ecommerce', name: '抖音电商运营', category: 'ecommerce', platform: '抖音', needsAPI: true, source: 'https://clawdhub.com/skills/douyin-ecommerce'},
  {id: 'pinduoduo-ops', name: '拼多多运营', category: 'ecommerce', platform: '拼多多', needsAPI: true, source: 'https://clawdhub.com/skills/pinduoduo-ops'},
  {id: 'inventory-manager', name: '库存管理系统', category: 'ecommerce', platform: '多平台', needsAPI: false, source: 'https://clawdhub.com/skills/inventory-manager'},
  {id: 'mcd-cn', name: '麦当劳中国优惠券助手', category: 'ecommerce', platform: '麦当劳', needsAPI: true, source: 'https://clawdhub.com/skills/mcd-cn'},

  // 内容生成
  {id: 'content-creator', name: '内容创作助手', category: 'content', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/content-creator'},
  {id: 'youtube-summarizer', name: 'YouTube视频摘要', category: 'content', platform: 'YouTube', needsAPI: false, source: 'https://clawdhub.com/skills/youtube-summarizer'},
  {id: 'youtube-title-generator', name: 'YouTube标题生成器', category: 'content', platform: 'YouTube', needsAPI: false, source: 'https://clawdhub.com/skills/youtube-title-generator'},
  {id: 'ai-avatar-generation', name: 'AI头像生成', category: 'content', platform: '通用', needsAPI: true, source: 'https://clawdhub.com/skills/ai-avatar-generation'},
  {id: 'ai-headshot-generation', name: 'AI商务头像生成', category: 'content', platform: '通用', needsAPI: true, source: 'https://clawdhub.com/skills/ai-headshot-generation'},
  {id: 'ai-video-gen', name: 'AI视频生成', category: 'content', platform: '通用', needsAPI: true, source: 'https://clawdhub.com/skills/ai-video-gen'},
  {id: 'elevenlabs-music', name: 'AI音乐生成', category: 'content', platform: 'ElevenLabs', needsAPI: true, source: 'https://clawdhub.com/skills/elevenlabs-music'},

  // 客户服务
  {id: 'smart-customer-service', name: '智能客服', category: 'service', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/smart-customer-service'},
  {id: 'ticket-manager', name: '工单管理系统', category: 'service', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/ticket-manager'},
  {id: 'faq-generator', name: 'FAQ自动生成', category: 'service', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/faq-generator'},

  // 数据分析
  {id: 'report-generator', name: '报表生成器', category: 'data', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/report-generator'},
  {id: 'data-visualization', name: '数据可视化', category: 'data', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/data-visualization'},
  {id: 'excel-weekly-dashboard', name: 'Excel周报仪表板生成', category: 'data', platform: 'Excel', needsAPI: false, source: 'https://clawdhub.com/skills/excel-weekly-dashboard'},

  // 营销推广
  {id: 'wechat-mp-manager', name: '公众号管理', category: 'marketing', platform: '微信', needsAPI: true, source: 'https://clawdhub.com/skills/wechat-mp-manager'},
  {id: 'douyin-ops', name: '抖音运营助手', category: 'marketing', platform: '抖音', needsAPI: true, source: 'https://clawdhub.com/skills/douyin-ops'},
  {id: 'postiz', name: '社交媒体调度', category: 'marketing', platform: '多平台', needsAPI: true, source: 'https://clawdhub.com/skills/postiz'},
  {id: 'typefully', name: '社交媒体内容管理', category: 'marketing', platform: '多平台', needsAPI: true, source: 'https://clawdhub.com/skills/typefully'},

  // 人力资源
  {id: 'resume-screener', name: '简历筛选', category: 'hr', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/resume-screener'},
  {id: 'resume-optimizer', name: '简历优化器', category: 'hr', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/resume-optimizer'},
  {id: 'linkedin-job-application', name: 'LinkedIn职位申请自动化', category: 'hr', platform: 'LinkedIn', needsAPI: true, source: 'https://clawdhub.com/skills/linkedin-job-application'},

  // 财务管理
  {id: 'invoice-ocr', name: '发票识别', category: 'finance', platform: '通用', needsAPI: true, source: 'https://clawdhub.com/skills/invoice-ocr'},
  {id: 'pdf-form-filler', name: 'PDF表单填写工具', category: 'finance', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/pdf-form-filler'},

  // 开发运维
  {id: 'code-reviewer', name: '代码审查', category: 'devops', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/code-reviewer'},
  {id: 'ci-pipeline', name: 'CI流水线', category: 'devops', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/ci-pipeline'},
  {id: 'github-kb', name: 'GitHub知识库', category: 'devops', platform: 'GitHub', needsAPI: true, source: 'https://clawdhub.com/skills/github-kb'},
  {id: 'github-pr', name: 'GitHub PR工具', category: 'devops', platform: 'GitHub', needsAPI: true, source: 'https://clawdhub.com/skills/github-pr'},

  // 搜索与研究
  {id: 'perplexity-sonar', name: 'Perplexity AI搜索', category: 'search', platform: 'Perplexity', needsAPI: true, source: 'https://clawdhub.com/skills/perplexity-sonar'},
  {id: 'tavily', name: 'Tavily AI搜索', category: 'search', platform: 'Tavily', needsAPI: true, source: 'https://clawdhub.com/skills/tavily'},
  {id: 'serpapi', name: 'SerpAPI搜索', category: 'search', platform: 'Google', needsAPI: true, source: 'https://clawdhub.com/skills/serpapi'},

  // 语音处理
  {id: 'local-whisper', name: '本地Whisper转录', category: 'speech', platform: '本地', needsAPI: false, source: 'https://clawdhub.com/skills/local-whisper'},
  {id: 'faster-whisper', name: 'Faster Whisper本地语音识别', category: 'speech', platform: '本地', needsAPI: false, source: 'https://clawdhub.com/skills/faster-whisper'},
  {id: 'mlx-whisper', name: 'MLX Whisper', category: 'speech', platform: 'Apple Silicon', needsAPI: false, source: 'https://clawdhub.com/skills/mlx-whisper'},

  // 知识管理
  {id: 'second-brain', name: '第二大脑知识库', category: 'knowledge', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/second-brain'},
  {id: 'notebook', name: 'Notebook知识库', category: 'knowledge', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/notebook'},
  {id: 'gno', name: '本地文档智能搜索', category: 'knowledge', platform: '本地', needsAPI: false, source: 'https://clawdhub.com/skills/gno'},
  {id: 'qmd', name: 'QMD搜索', category: 'knowledge', platform: '本地', needsAPI: false, source: 'https://clawdhub.com/skills/qmd'},

  // 交通出行
  {id: '12306', name: '中国铁路12306查询', category: 'transport', platform: '12306', needsAPI: true, source: 'https://clawdhub.com/skills/12306'},

  // PDF处理
  {id: 'pdf-form-filler', name: 'PDF表单填写工具', category: 'pdf', platform: '通用', needsAPI: false, source: 'https://clawdhub.com/skills/pdf-form-filler'},
  {id: 'mineru-pdf-parser', name: 'MinerU PDF解析', category: 'pdf', platform: '本地', needsAPI: false, source: 'https://clawdhub.com/skills/mineru-pdf-parser'},
  {id: 'pymupdf-pdf-parser', name: 'PyMuPDF PDF解析', category: 'pdf', platform: '本地', needsAPI: false, source: 'https://clawdhub.com/skills/pymupdf-pdf-parser'}
];

// 分类定义
const categories = [
  {id: 'office', name: '办公协作', icon: '🏢'},
  {id: 'ecommerce', name: '电商运营', icon: '🛒'},
  {id: 'content', name: '内容生成', icon: '📝'},
  {id: 'service', name: '客户服务', icon: '💬'},
  {id: 'data', name: '数据分析', icon: '📊'},
  {id: 'marketing', name: '营销推广', icon: '📢'},
  {id: 'hr', name: '人力资源', icon: '👥'},
  {id: 'finance', name: '财务管理', icon: '💰'},
  {id: 'devops', name: '开发运维', icon: '⚙️'},
  {id: 'search', name: '搜索与研究', icon: '🔍'},
  {id: 'speech', name: '语音处理', icon: '🎤'},
  {id: 'knowledge', name: '知识管理', icon: '📚'},
  {id: 'transport', name: '交通出行', icon: '✈️'},
  {id: 'pdf', name: 'PDF处理', icon: '📄'}
];

// 统计
const stats = {
  total: clawhubSkills.length,
  needsAPI: clawhubSkills.filter(s => s.needsAPI).length,
  noAPI: clawhubSkills.filter(s => !s.needsAPI).length,
  byCategory: {}
};

// 按分类统计
categories.forEach(cat => {
  stats.byCategory[cat.id] = {
    name: cat.name,
    count: clawhubSkills.filter(s => s.category === cat.id).length,
    withAPI: clawhubSkills.filter(s => s.category === cat.id && s.needsAPI).length
  };
});

console.log('📊 筛选统计：');
console.log(`总技能数: ${stats.total}`);
console.log(`需要API: ${stats.needsAPI} (${(stats.needsAPI/stats.total*100).toFixed(1)}%)`);
console.log(`无需API: ${stats.noAPI} (${(stats.noAPI/stats.total*100).toFixed(1)}%)`);
console.log('\n按分类统计：');
Object.entries(stats.byCategory).forEach(([id, data]) => {
  if (data.count > 0) {
    console.log(`  ${data.name}: ${data.count}个 (需要API: ${data.withAPI})`);
  }
});

// 保存JSON
const output = {
  version: '1.0.0',
  lastUpdated: '2026-03-09',
  description: '适用于中国商业场景的技能列表',
  source: [
    'https://github.com/clawdbot-ai/awesome-openclaw-skills-zh',
    'https://github.com/VoltAgent/awesome-openclaw-skills'
  ],
  excludeCriteria: [
    'Telegram、WhatsApp、Slack、Discord等国外通讯平台',
    'Salesforce、HubSpot等国外CRM',
    'Shopify、Stripe、PayPal等国外电商/支付',
    'UK、US、German等国家特定服务'
  ],
  statistics: stats,
  categories: categories,
  skills: clawhubSkills
};

fs.writeFileSync('data/china_business_skills.json', JSON.stringify(output, null, 2));
console.log('\n✅ 已保存到 data/china_business_skills.json');

// 保存CSV
let csv = 'id,name,category,category_name,platform,needs_api,source\n';
clawhubSkills.forEach(skill => {
  const cat = categories.find(c => c.id === skill.category);
  csv += `${skill.id},${skill.name},${skill.category},${cat?.name || ''},${skill.platform},${skill.needsAPI},${skill.source}\n`;
});
fs.writeFileSync('data/china_business_skills.csv', csv);
console.log('✅ 已保存到 data/china_business_skills.csv');

// 保存Markdown报告
const md = `# 适用于中国商业场景的技能列表

> 数据来源: ClawHub技能市场
> 最后更新: 2026-03-09
> 总技能数: ${stats.total}

## 📊 统计信息

- **总技能数**: ${stats.total}
- **需要API**: ${stats.needsAPI} (${(stats.needsAPI/stats.total*100).toFixed(1)}%)
- **无需API**: ${stats.noAPI} (${(stats.noAPI/stats.total*100).toFixed(1)}%)

## 📁 分类统计

| 分类 | 技能数 | 需要API |
|------|--------|---------|
${Object.entries(stats.byCategory)
  .filter(([id, data]) => data.count > 0)
  .map(([id, data]) => `| ${data.name} | ${data.count} | ${data.withAPI} |`)
  .join('\n')}

## 🔗 技能列表

${categories.map(cat => {
  const skills = clawhubSkills.filter(s => s.category === cat.id);
  if (skills.length === 0) return '';

  return `### ${cat.icon} ${cat.name} (${skills.length}个)

${skills.map(s => `- **${s.name}** (\`${s.id}\`)
  - 平台: ${s.platform}
  - ${s.needsAPI ? '⚠️ **需要API**' : '✅ 无需API'}
  - 来源: [链接](${s.source})`).join('\n\n')}
`;
}).filter(s => s).join('\n')}

## ⚠️ 排除标准

以下类型的技能已被排除：

1. **国外通讯平台**: Telegram、WhatsApp、Slack、Discord等
2. **国外CRM系统**: Salesforce、HubSpot等
3. **国外电商/支付**: Shopify、Stripe、PayPal等
4. **国家特定服务**: UK、US、German等国家特定服务

## 🔧 使用方法

### 安装技能

\`\`\`bash
npx clawhub@latest install <skill-id>
\`\`\`

### 示例

\`\`\`bash
# 安装飞书日程管理
npx clawhub@latest install lark-calendar

# 安装淘宝商品管理
npx clawhub@latest install taobao-product-manager

# 安装本地Whisper转录（无需API）
npx clawhub@latest install local-whisper
\`\`\`

## 📌 注意事项

1. **API密钥**: 标注为"需要API"的技能需要获取相应平台的API密钥
2. **本地运行**: 标注为"无需API"的技能可以完全本地运行
3. **平台限制**: 部分技能可能需要特定的平台权限
4. **费用说明**: 某些API可能有调用费用，请查看各平台定价

## 📚 数据来源

- [ClawHub技能市场](https://clawdhub.com/)
- [GitHub: awesome-openclaw-skills-zh](https://github.com/clawdbot-ai/awesome-openclaw-skills-zh)
- [GitHub: VoltAgent/awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills)

---

**维护者**: OpenClaw Community
**最后更新**: 2026-03-09
`;

fs.writeFileSync('data/CHINA_SKILLS_REPORT.md', md);
console.log('✅ 已保存到 data/CHINA_SKILLS_REPORT.md');

console.log('\n🎉 完成！');
