# 🚀 快速部署到GitHub Pages

> 3种部署方法，任选一种即可

---

## 方法1: 一键自动部署（最简单）⭐

### Windows用户

```bash
# 1. 双击运行
deploy-to-github.bat

# 2. 按提示输入GitHub用户名
# 3. 在GitHub上创建仓库
# 4. 等待部署完成
# 5. 访问你的网站
```

### Mac/Linux用户

```bash
# 1. 添加执行权限
chmod +x deploy-to-github.sh

# 2. 运行脚本
./deploy-to-github.sh

# 3. 按提示操作
```

---

## 方法2: 手动部署（5步完成）

### 1️⃣ 创建GitHub仓库

```
访问: https://github.com/new
仓库名: skill-market
可见性: ✅ Public
⚠️ 不要勾选任何初始化选项
```

### 2️⃣ 初始化本地仓库

```bash
git init
git add .
git commit -m "🚀 Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/skill-market.git
git push -u origin main
```

### 3️⃣ 启用GitHub Pages

```
访问: https://github.com/你的用户名/skill-market/settings/pages
Source: Deploy from a branch
Branch: main
Folder: / (root)
点击: Save
```

### 4️⃣ 等待部署

```
等待1-2分钟...
```

### 5️⃣ 访问网站

```
https://你的用户名.github.io/skill-market/web/
```

---

## 方法3: GitHub Desktop（图形界面）

### 1️⃣ 下载GitHub Desktop

```
https://desktop.github.com
```

### 2️⃣ 登录GitHub账号

```
File → Options → Accounts → Sign in
```

### 3️⃣ 创建新仓库

```
File → New repository
Name: skill-market
Local path: 选择skill-marketplace文件夹
✅ Public
点击: Create repository
```

### 4️⃣ 提交并推送

```
填写commit信息: "🚀 Initial commit"
点击: Commit to main
点击: Publish repository
等待: Push完成
```

### 5️⃣ 启用GitHub Pages

```
访问: https://github.com/你的用户名/skill-market/settings/pages
按上述方法3配置
```

---

## 📋 部署检查清单

部署前：
- [ ] Git已安装
- [ ] GitHub账号已登录
- [ ] 仓库已创建（Public）

部署后：
- [ ] GitHub Pages已启用
- [ ] Branch设置为main
- [ ] 等待1-2分钟
- [ ] 访问网站成功

---

## ❓ 常见问题

### Q1: 推送需要密码？

**A**: 使用Personal Access Token
```
1. 访问 https://github.com/settings/tokens
2. 生成新token（勾选repo权限）
3. 推送时用token代替密码
```

### Q2: 访问显示404？

**A**: 检查以下几点
```
1. GitHub Pages是否启用
2. 路径是否正确（/web/）
3. 是否等待了1-2分钟
```

### Q3: 如何更新网站？

**A**: 修改后重新推送
```bash
git add .
git commit -m "Update"
git push
```

---

## 📚 完整文档

- **详细部署指南**: `GITHUB_DEPLOYMENT_GUIDE.md`
- **使用说明**: `web/README.md`
- **项目总览**: `PROJECT_OVERVIEW.md`

---

## 🎉 部署成功后

你将获得：

✅ **在线访问地址**
```
https://你的用户名.github.io/skill-market/web/
```

✅ **300+ AI技能展示**

✅ **搜索筛选功能**

✅ **响应式设计**

✅ **免费HTTPS访问**

---

## 💡 提示

- 首次部署需要1-2分钟生效
- 修改代码后，推送即可自动更新
- 推荐使用方法1（一键部署脚本）
- 遇到问题查看 `GITHUB_DEPLOYMENT_GUIDE.md`

---

**🚀 现在就开始部署吧！**

```bash
# Windows
.\deploy-to-github.bat

# Mac/Linux
./deploy-to-github.sh
```
