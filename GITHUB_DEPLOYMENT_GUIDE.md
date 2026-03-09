# GitHub Pages 部署完整指南

> 5分钟将你的Skill市场部署到GitHub Pages

---

## 🎯 部署后效果

部署成功后，你将获得：

- ✅ **在线访问地址**: `https://你的用户名.github.io/skill-market/web/`
- ✅ **300+ AI技能展示**
- ✅ **搜索筛选功能**
- ✅ **响应式设计**
- ✅ **免费HTTPS访问**

---

## 📋 前置要求

### 1. Git安装

**Windows:**
```bash
# 下载安装
https://git-scm.com/download/win

# 验证安装
git --version
```

**Mac:**
```bash
# 使用Homebrew安装
brew install git

# 验证安装
git --version
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install git

# CentOS/RHEL
sudo yum install git

# 验证安装
git --version
```

### 2. GitHub账号

- 访问 https://github.com 注册账号
- 验证邮箱

---

## 🚀 方法1: 一键部署脚本（推荐）

### Windows用户

1. **进入项目目录**
```bash
cd skill-marketplace
```

2. **运行部署脚本**
```bash
# 双击运行
deploy-to-github.bat

# 或命令行运行
.\deploy-to-github.bat
```

3. **按提示操作**
   - 输入GitHub用户名
   - 输入仓库名称（默认skill-market）
   - 在GitHub上创建仓库
   - 等待推送完成

### Mac/Linux用户

1. **进入项目目录**
```bash
cd skill-marketplace
```

2. **添加执行权限**
```bash
chmod +x deploy-to-github.sh
```

3. **运行部署脚本**
```bash
./deploy-to-github.sh
```

4. **按提示操作**
   - 输入GitHub用户名
   - 输入仓库名称
   - 在GitHub上创建仓库
   - 等待推送完成

---

## 🛠️ 方法2: 手动部署（详细步骤）

### 步骤1: 创建GitHub仓库

1. **登录GitHub**
   - 访问 https://github.com
   - 点击右上角 "Sign in"

2. **创建新仓库**
   - 点击 "+" → "New repository"
   - 或直接访问 https://github.com/new

3. **填写仓库信息**
```
Repository name: skill-market
Description: OpenClaw Skill Market - 300+ AI Skills
Visibility: ✅ Public（必须公开才能使用GitHub Pages）

⚠️ 重要：不要勾选以下选项（空仓库）：
[ ] Add a README file
[ ] Add .gitignore
[ ] Choose a license
```

4. **点击 "Create repository"**

### 步骤2: 初始化本地仓库

```bash
# 1. 进入项目目录
cd skill-marketplace

# 2. 初始化Git
git init

# 3. 配置Git用户信息（如果未配置）
git config user.name "你的GitHub用户名"
git config user.email "你的邮箱"

# 4. 添加所有文件
git add .

# 5. 创建初始提交
git commit -m "🚀 Initial commit: OpenClaw Skill Market"

# 6. 设置主分支
git branch -M main

# 7. 添加远程仓库
git remote add origin https://github.com/你的用户名/skill-market.git

# 8. 推送到GitHub
git push -u origin main
```

### 步骤3: 启用GitHub Pages

1. **访问仓库设置**
```
https://github.com/你的用户名/skill-market/settings/pages
```

2. **配置Pages**
```
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

3. **点击 "Save"**

4. **等待部署**（1-2分钟）

### 步骤4: 访问网站

```
https://你的用户名.github.io/skill-market/web/
```

---

## 🔐 认证问题解决

### 问题1: 推送时需要密码

**原因**: GitHub已不支持密码认证

**解决方案**: 使用Personal Access Token

1. **生成Token**
```
访问: https://github.com/settings/tokens
点击: Generate new token (classic)
勾选: repo（所有repo相关权限）
点击: Generate token
复制: 生成的token（只显示一次）
```

2. **推送时使用Token**
```bash
git push -u origin main
# Username: 你的GitHub用户名
# Password: 粘贴刚才的token
```

### 问题2: 使用SSH认证（推荐）

1. **生成SSH密钥**
```bash
ssh-keygen -t ed25519 -C "你的邮箱"
# 按三次回车（使用默认设置）
```

2. **查看公钥**
```bash
cat ~/.ssh/id_ed25519.pub
# 复制输出的内容
```

3. **添加到GitHub**
```
访问: https://github.com/settings/keys
点击: New SSH key
Title: My Computer
Key: 粘贴刚才的公钥
点击: Add SSH key
```

4. **修改仓库地址**
```bash
git remote set-url origin git@github.com:你的用户名/skill-market.git
git push -u origin main
```

---

## 🌐 自定义域名（可选）

### 1. 购买域名

推荐域名注册商：
- Namecheap: https://namecheap.com
- Google Domains: https://domains.google
- 阿里云: https://wanwang.aliyun.com

### 2. 配置DNS

在域名管理后台添加CNAME记录：

```
类型: CNAME
名称: www (或 @)
值: 你的用户名.github.io
TTL: 600
```

### 3. 在GitHub设置域名

1. **访问仓库设置**
```
https://github.com/你的用户名/skill-market/settings/pages
```

2. **设置自定义域名**
```
Custom domain: 你的域名.com
✅ Enforce HTTPS
```

3. **创建CNAME文件**
```bash
echo "你的域名.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### 4. 等待DNS生效

- 通常需要10-30分钟
- 最多等待48小时
- 访问 `https://你的域名.com/web/`

---

## 🔄 更新网站

### 修改代码后更新

```bash
# 1. 修改文件
# 例如: 编辑 web/index.html

# 2. 提交更改
git add .
git commit -m "Update: 修改说明"

# 3. 推送到GitHub
git push

# 4. 自动部署
# GitHub Pages会自动重新部署（1-2分钟）
```

### 强制刷新

如果更新后看不到变化：

1. **清除浏览器缓存**
   - Chrome: Ctrl+Shift+Delete
   - Mac: Command+Shift+Delete

2. **硬刷新**
   - Windows: Ctrl+F5
   - Mac: Command+Shift+R

3. **等待CDN更新**
   - GitHub Pages使用CDN
   - 最多等待10分钟

---

## ❓ 常见问题

### Q1: 访问显示404？

**A**: 检查以下几点：

1. **GitHub Pages是否启用**
```
Settings → Pages → Source: main → Save
```

2. **路径是否正确**
```
正确: https://用户名.github.io/仓库名/web/
错误: https://用户名.github.io/仓库名/
```

3. **等待时间不够**
```
首次部署需要1-2分钟
稍等片刻再刷新
```

### Q2: 样式不加载？

**A**: 检查文件路径：

1. **确认所有文件都已推送**
```bash
git ls-files web/
# 应该看到 index.html, style.css, app.js 等
```

2. **检查控制台错误**
   - 按F12打开开发者工具
   - 查看Console标签
   - 查看Network标签

### Q3: 搜索不工作？

**A**: 确认JavaScript文件加载：

1. **检查文件顺序**
```html
<!-- index.html 底部应该是这个顺序 -->
<script src="skills-data.js"></script>
<script src="app.js"></script>
```

2. **清除缓存**
   - Ctrl+Shift+Delete 清除缓存
   - Ctrl+F5 硬刷新

### Q4: 移动端布局错乱？

**A**: 检查viewport设置：

1. **确认meta标签**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

2. **清除手机浏览器缓存**

### Q5: 如何查看部署日志？

**A**: 查看Actions标签：

```
https://github.com/你的用户名/skill-market/actions
```

可以看到：
- 部署状态
- 部署日志
- 错误信息

---

## 📊 部署检查清单

部署前检查：

- [ ] Git已安装
- [ ] GitHub账号已创建
- [ ] 仓库已创建（Public）
- [ ] 所有文件都已提交
- [ ] 代码已推送到GitHub
- [ ] GitHub Pages已启用
- [ ] Source设置为main分支
- [ ] 等待1-2分钟

部署后检查：

- [ ] 能访问 https://用户名.github.io/仓库名/web/
- [ ] 首页正常显示
- [ ] 搜索功能正常
- [ ] 分类切换正常
- [ ] 技能详情弹窗正常
- [ ] 移动端布局正常

---

## 🎓 进阶技巧

### 1. 自动部署

使用GitHub Actions自动部署：

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./web
```

### 2. 性能优化

1. **启用压缩**
```bash
# 压缩CSS
cssnano web/style.css web/style.min.css

# 压缩JS
uglifyjs web/app.js -o web/app.min.js
```

2. **使用CDN**
```html
<!-- 将本地库替换为CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

### 3. SEO优化

1. **添加sitemap**
```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://用户名.github.io/skill-market/web/</loc>
    <changefreq>weekly</changefreq>
  </url>
</urlset>
```

2. **添加robots.txt**
```
User-agent: *
Allow: /
```

---

## 📞 获取帮助

### 文档
- GitHub Pages官方文档: https://docs.github.com/pages
- Git官方文档: https://git-scm.com/doc

### 社区
- OpenClaw社区: https://discord.com/invite/clawd
- GitHub社区: https://github.community

### 联系方式
- 邮箱: support@openclaw.ai
- GitHub Issues: https://github.com/openclaw/openclaw/issues

---

**🎉 恭喜！你已经掌握了GitHub Pages部署的所有技能！**

**最后更新**: 2026-03-09
