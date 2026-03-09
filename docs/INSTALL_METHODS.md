# 📦 技能安装方式说明

> OpenClaw Skill Market 提供两种安装方式，满足不同需求

---

## 🎯 两种安装方式

### 方式1: 直接安装（推荐）

**文件**: `data/skills-install-direct.json`

**特点**:
- ✅ 显示真实的安装命令
- ✅ 显示GitHub仓库地址
- ✅ 透明度高，用户知道从哪里安装
- ✅ 适合开源项目和公开技能

**安装命令格式**:
```bash
npx openclaw-skills@latest install <skill-id>
```

**示例**:
```bash
# 安装飞书日程管理
npx openclaw-skills@latest install lark-calendar

# 安装智能客服
npx openclaw-skills@latest install smart-customer-service
```

**优点**:
- 用户可以直接看到安装源
- 可以查看GitHub仓库代码
- 社区可以贡献代码
- 完全透明

**缺点**:
- 暴露了真实的GitHub地址
- 无法统计安装次数
- 无法控制访问权限

---

### 方式2: 重定向安装（企业版）

**文件**: `data/skills-install-redirect.json`

**特点**:
- ✅ 隐藏真实的GitHub地址
- ✅ 可以统计安装次数
- ✅ 可以控制访问权限
- ✅ 可以随时更改真实地址

**安装URL格式**:
```
https://legionzyx.github.io/skill-market/install/<skill-id>
```

**示例**:
```
# 安装飞书日程管理
https://legionzyx.github.io/skill-market/install/lark-calendar

# 安装智能客服
https://legionzyx.github.io/skill-market/install/smart-customer-service
```

**工作流程**:
1. 用户点击安装按钮
2. 跳转到内部链接（如 /install/lark-calendar）
3. 服务器记录安装信息
4. 重定向到真实的安装命令
5. 用户复制命令并在终端执行

**优点**:
- 隐藏真实源地址
- 可以统计使用数据
- 可以控制访问权限
- 可以动态更改后端地址

**缺点**:
- 需要额外的重定向服务
- 用户无法直接看到源代码
- 依赖中间服务

---

## 📊 两种方式对比

| 特性 | 直接安装 | 重定向安装 |
|------|---------|-----------|
| 显示真实地址 | ✅ | ❌ |
| 统计安装次数 | ❌ | ✅ |
| 访问控制 | ❌ | ✅ |
| 透明度 | ✅ | ❌ |
| 实现复杂度 | 简单 | 复杂 |
| 适合场景 | 开源项目 | 企业私有 |

---

## 🚀 如何选择

### 使用直接安装的场景
- ✅ 开源项目
- ✅ 公开技能
- ✅ 社区贡献
- ✅ 教育目的
- ✅ 个人项目

### 使用重定向安装的场景
- ✅ 企业私有技能
- ✅ 付费技能
- ✅ 需要统计分析
- ✅ 需要访问控制
- ✅ 商业化项目

---

## 💻 实现细节

### 直接安装实现

**前端代码**:
```javascript
// 显示安装弹窗
function showInstallCode(skillId) {
    const installCode = `npx openclaw-skills@latest install ${skillId}`;
    
    // 显示弹窗
    const modal = `
        <div class="install-modal">
            <h2>安装技能</h2>
            <div class="code-block">
                <code>${installCode}</code>
                <button onclick="copyInstallCode('${installCode}')">复制</button>
            </div>
        </div>
    `;
    
    showModal(modal);
}

// 复制安装代码
function copyInstallCode(code) {
    navigator.clipboard.writeText(code);
    showNotification('已复制到剪贴板');
}
```

**数据文件** (`skills-install-direct.json`):
```json
{
  "skills": [
    {
      "id": "lark-calendar",
      "name": "飞书日程管理",
      "installCommand": "npx openclaw-skills@latest install lark-calendar",
      "githubUrl": "https://github.com/openclaw/skills/tree/main/office/lark-calendar"
    }
  ]
}
```

---

### 重定向安装实现

**前端代码**:
```javascript
// 跳转到安装页面
function redirectToInstall(skillId) {
    const url = `https://legionzyx.github.io/skill-market/install/${skillId}`;
    window.location.href = url;
}
```

**重定向服务** (需要后端支持):
```javascript
// Node.js/Express 示例
app.get('/install/:skillId', (req, res) => {
    const { skillId } = req.params;
    
    // 1. 记录安装信息
    logInstallation(skillId, req.ip, req.headers['user-agent']);
    
    // 2. 获取真实安装命令
    const installCommand = getInstallCommand(skillId);
    
    // 3. 返回安装页面
    res.send(`
        <html>
            <body>
                <h1>安装 ${skillId}</h1>
                <code>${installCommand}</code>
            </body>
        </html>
    `);
});

// 记录安装信息
function logInstallation(skillId, ip, userAgent) {
    // 保存到数据库
    db.installations.create({
        skillId,
        ip,
        userAgent,
        timestamp: new Date()
    });
}
```

**数据文件** (`skills-install-redirect.json`):
```json
{
  "skills": [
    {
      "id": "lark-calendar",
      "name": "飞书日程管理",
      "installUrl": "https://legionzyx.github.io/skill-market/install/lark-calendar",
      "internalCode": "SKILL-001-FC"
    }
  ]
}
```

---

## 📈 统计分析

### 重定向安装可以统计的数据

```javascript
// 安装统计示例
{
  "skillId": "lark-calendar",
  "totalInstallations": 1250,
  "dailyInstallations": [
    { "date": "2026-03-09", "count": 45 },
    { "date": "2026-03-08", "count": 52 }
  ],
  "topCountries": [
    { "country": "China", "count": 800 },
    { "country": "USA", "count": 200 }
  ],
  "topPlatforms": [
    { "platform": "Windows", "count": 600 },
    { "platform": "Mac", "count": 400 }
  ]
}
```

---

## 🔒 访问控制

### 重定向安装可以实现的功能

**1. 基于IP的访问控制**:
```javascript
app.get('/install/:skillId', (req, res) => {
    const ip = req.ip;
    
    // 检查IP是否在白名单
    if (!isWhitelisted(ip)) {
        return res.status(403).send('Access denied');
    }
    
    // 继续处理...
});
```

**2. 基于Token的访问控制**:
```javascript
app.get('/install/:skillId', (req, res) => {
    const token = req.query.token;
    
    // 验证token
    if (!validateToken(token)) {
        return res.status(401).send('Invalid token');
    }
    
    // 继续处理...
});
```

**3. 基于用户的访问控制**:
```javascript
app.get('/install/:skillId', authenticateUser, (req, res) => {
    const userId = req.user.id;
    
    // 检查用户是否有权限
    if (!hasPermission(userId, req.params.skillId)) {
        return res.status(403).send('No permission');
    }
    
    // 继续处理...
});
```

---

## 🎯 推荐方案

### 开源项目（推荐直接安装）
```
✅ 使用 skills-install-direct.json
✅ 透明公开
✅ 社区友好
```

### 企业项目（推荐重定向安装）
```
✅ 使用 skills-install-redirect.json
✅ 统计分析
✅ 访问控制
✅ 保护知识产权
```

### 混合方案
```
✅ 免费技能使用直接安装
✅ 付费技能使用重定向安装
✅ 根据技能类型选择
```

---

## 📞 技术支持

如有问题，请访问：
- **文档**: https://docs.openclaw.ai
- **社区**: https://discord.com/invite/clawd
- **GitHub**: https://github.com/openclaw/openclaw

---

**最后更新**: 2026-03-09  
**维护者**: OpenClaw Community
