# OpenClaw Skill Market - 完整部署指南

## 🚀 5分钟快速部署

### 方法1: 本地预览（最快）

```bash
# 1. 进入web目录
cd skill-marketplace/web

# 2. 直接打开浏览器
# Windows
start index.html

# Mac
open index.html

# Linux
xdg-open index.html
```

### 方法2: 本地服务器

```bash
# Python 3
cd skill-marketplace/web
python -m http.server 8000

# 访问 http://localhost:8000
```

---

## 🌐 线上部署（3种方式）

### 方式1: GitHub Pages（免费）

1. **创建GitHub仓库**
```bash
git init
git add web/
git commit -m "Add skill market"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/skill-market.git
git push -u origin main
```

2. **启用GitHub Pages**
   - 进入仓库Settings
   - 点击Pages
   - Source选择main分支
   - 点击Save

3. **访问网站**
   ```
   https://YOUR_USERNAME.github.io/skill-market/web/
   ```

### 方式2: Vercel（推荐，自动部署）

1. **安装Vercel CLI**
```bash
npm install -g vercel
```

2. **部署**
```bash
cd skill-marketplace/web
vercel

# 首次会要求登录，按提示操作即可
```

3. **获得地址**
   - 自动生成：`https://skill-market-xxx.vercel.app`
   - 可绑定自定义域名

### 方式3: Netlify（拖拽部署）

1. **访问** https://app.netlify.com
2. **拖拽部署**
   - 直接拖拽 `web` 文件夹到页面
   - 自动部署完成
3. **获得地址**
   - 自动生成：`https://random-name.netlify.app`

---

## 🔧 后端集成（可选）

### 1. Node.js + Express

```javascript
// server.js
const express = require('express');
const app = express();

app.use(express.static('web'));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

```bash
node server.js
```

### 2. Nginx配置

```nginx
server {
    listen 80;
    server_name skillmarket.yourdomain.com;
    
    root /path/to/skill-marketplace/web;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 💳 支付集成指南

### 支付宝集成

1. **引入支付宝SDK**
```html
<script src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js"></script>
```

2. **修改购买函数**
```javascript
function buySkill(skillId) {
    const skill = skillsDatabase.skills.find(s => s.id === skillId);
    
    // 调用后端API创建订单
    fetch('/api/create-order', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            skillId: skillId,
            amount: skill.price
        })
    })
    .then(res => res.json())
    .then(data => {
        // 跳转支付宝支付页面
        window.location.href = data.payUrl;
    });
}
```

### 微信支付集成

1. **引入微信JS-SDK**
```html
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
```

2. **调用微信支付**
```javascript
function buySkill(skillId) {
    fetch('/api/wechat-pay', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({skillId: skillId})
    })
    .then(res => res.json())
    .then(data => {
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId": data.appId,
            "timeStamp": data.timeStamp,
            "nonceStr": data.nonceStr,
            "package": data.package,
            "signType": "MD5",
            "paySign": data.paySign
        }, function(res) {
            if(res.err_msg == "get_brand_wcpay_request:ok") {
                alert('支付成功！');
            }
        });
    });
}
```

---

## 📊 数据库集成

### MongoDB集成

```javascript
// 连接MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/skillmarket');

// 定义技能模型
const SkillSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    category: String,
    rating: Number,
    downloads: Number,
    price: Number
});

const Skill = mongoose.model('Skill', SkillSchema);

// API: 获取所有技能
app.get('/api/skills', async (req, res) => {
    const skills = await Skill.find();
    res.json(skills);
});

// API: 搜索技能
app.get('/api/skills/search', async (req, res) => {
    const query = req.query.q;
    const skills = await Skill.find({
        $or: [
            {name: {$regex: query, $options: 'i'}},
            {description: {$regex: query, $options: 'i'}}
        ]
    });
    res.json(skills);
});
```

---

## 🔐 用户认证

### JWT认证示例

```javascript
// 用户登录
app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    
    // 验证用户
    const user = await User.findOne({username, password});
    if (!user) {
        return res.status(401).json({error: '用户名或密码错误'});
    }
    
    // 生成JWT
    const token = jwt.sign({userId: user._id}, 'your-secret-key', {
        expiresIn: '7d'
    });
    
    res.json({token, user});
});

// 验证中间件
function auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({error: '未登录'});
    }
    
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.userId;
        next();
    } catch(err) {
        res.status(401).json({error: 'token无效'});
    }
}

// 受保护的API
app.get('/api/my-skills', auth, async (req, res) => {
    const skills = await UserSkill.find({userId: req.userId});
    res.json(skills);
});
```

---

## 📱 PWA支持（离线可用）

### 1. 创建manifest.json

```json
{
  "name": "OpenClaw Skill Market",
  "short_name": "Skill Market",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#4F46E5",
  "theme_color": "#4F46E5",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. 创建Service Worker

```javascript
// sw.js
const CACHE_NAME = 'skill-market-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/skills-data.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

### 3. 注册Service Worker

```javascript
// 在index.html中添加
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered'))
    .catch(err => console.log('SW failed', err));
}
</script>
```

---

## 📈 SEO优化

### Meta标签

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>OpenClaw Skill Market - 300+ AI技能市场</title>
    <meta name="description" content="发现最优质的AI技能，300+精选技能，30个分类，助力企业数字化转型">
    <meta name="keywords" content="AI技能,AI工具,人工智能,自动化,效率工具">
    
    <!-- Open Graph -->
    <meta property="og:title" content="OpenClaw Skill Market">
    <meta property="og:description" content="300+ AI技能市场">
    <meta property="og:image" content="/og-image.png">
    <meta property="og:url" content="https://skillmarket.openclaw.ai">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="OpenClaw Skill Market">
    <meta name="twitter:description" content="300+ AI技能市场">
</head>
```

---

## 🎯 性能优化清单

- ✅ 压缩CSS/JS文件
- ✅ 图片懒加载
- ✅ 启用Gzip压缩
- ✅ 使用CDN加速
- ✅ 减少HTTP请求
- ✅ 异步加载脚本

---

## 🐛 常见部署问题

### Q1: 跨域问题？

**A**: 使用相同域名，或配置CORS

```javascript
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
```

### Q2: 路由404？

**A**: 配置服务器支持SPA

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Q3: 支付回调失败？

**A**: 确保回调地址可公网访问，使用内网穿透工具测试

---

## 📞 技术支持

- **文档**: https://docs.openclaw.ai
- **社区**: https://discord.com/invite/clawd
- **Issues**: https://github.com/openclaw/openclaw/issues

---

**部署成功后，你将拥有一个完整的AI技能市场！** 🎉
