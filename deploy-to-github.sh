#!/bin/bash

# OpenClaw Skill Market - GitHub Pages 部署脚本
# 使用方法: ./deploy-to-github.sh

set -e

echo "🚀 OpenClaw Skill Market - GitHub Pages 部署"
echo "=============================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查是否在正确的目录
if [ ! -d "web" ]; then
    echo -e "${RED}❌ 错误: 请在 skill-marketplace 目录下运行此脚本${NC}"
    exit 1
fi

# 1. 检查Git是否安装
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git未安装，请先安装Git${NC}"
    echo "下载地址: https://git-scm.com/downloads"
    exit 1
fi

echo -e "${GREEN}✅ Git已安装${NC}"

# 2. 获取GitHub用户信息
echo ""
echo -e "${BLUE}📝 请输入GitHub信息:${NC}"
read -p "GitHub用户名 (例如: legionxyz): " GITHUB_USER
read -p "仓库名称 (默认: skill-market): " REPO_NAME
REPO_NAME=${REPO_NAME:-skill-market}

echo ""
echo -e "${BLUE}📦 仓库信息:${NC}"
echo "   用户名: $GITHUB_USER"
echo "   仓库名: $REPO_NAME"
echo "   仓库地址: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""

read -p "确认信息正确? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    echo "已取消部署"
    exit 0
fi

# 3. 初始化Git仓库
echo ""
echo -e "${BLUE}🔧 初始化Git仓库...${NC}"

if [ ! -d ".git" ]; then
    git init
    echo -e "${GREEN}✅ Git仓库已初始化${NC}"
else
    echo -e "${GREEN}✅ Git仓库已存在${NC}"
fi

# 4. 配置Git用户信息（如果未配置）
if [ -z "$(git config user.name)" ]; then
    git config user.name "$GITHUB_USER"
    git config user.email "$GITHUB_USER@users.noreply.github.com"
    echo -e "${GREEN}✅ Git用户信息已配置${NC}"
fi

# 5. 创建.gitignore
cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
.venv/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Temp
*.tmp
*.log
EOF

echo -e "${GREEN}✅ .gitignore 已创建${NC}"

# 6. 添加所有文件
echo ""
echo -e "${BLUE}📁 添加文件到Git...${NC}"
git add .
echo -e "${GREEN}✅ 文件已添加${NC}"

# 7. 创建初始提交
echo ""
echo -e "${BLUE}💾 创建初始提交...${NC}"
git commit -m "🚀 Initial commit: OpenClaw Skill Market with 300+ skills"
echo -e "${GREEN}✅ 提交完成${NC}"

# 8. 设置主分支
git branch -M main
echo -e "${GREEN}✅ 主分支已设置为 main${NC}"

# 9. 添加远程仓库
echo ""
echo -e "${BLUE}🔗 配置远程仓库...${NC}"
REPO_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"

# 检查远程仓库是否已存在
if git remote | grep -q "origin"; then
    git remote set-url origin $REPO_URL
    echo -e "${GREEN}✅ 远程仓库地址已更新${NC}"
else
    git remote add origin $REPO_URL
    echo -e "${GREEN}✅ 远程仓库已添加${NC}"
fi

# 10. 推送到GitHub
echo ""
echo -e "${BLUE}📤 推送到GitHub...${NC}"
echo ""
echo -e "${RED}⚠️  重要提示:${NC}"
echo "   1. 请确保已在GitHub上创建仓库: $REPO_NAME"
echo "   2. 如果仓库不存在，请先访问 https://github.com/new 创建"
echo "   3. 创建时请选择 Public（公开）"
echo "   4. 不要勾选 'Add a README file'"
echo ""
read -p "已在GitHub创建好仓库? (y/n): " REPO_EXISTS

if [ "$REPO_EXISTS" != "y" ]; then
    echo ""
    echo -e "${BLUE}请按以下步骤操作:${NC}"
    echo "1. 访问 https://github.com/new"
    echo "2. 仓库名称: $REPO_NAME"
    echo "3. 选择 Public"
    echo "4. 不要勾选任何初始化选项"
    echo "5. 点击 Create repository"
    echo "6. 创建完成后，重新运行此脚本"
    exit 0
fi

# 推送代码
if git push -u origin main; then
    echo ""
    echo -e "${GREEN}✅ 代码已推送到GitHub${NC}"
else
    echo ""
    echo -e "${RED}❌ 推送失败，可能需要认证${NC}"
    echo ""
    echo "请尝试以下方法:"
    echo "1. 使用Personal Access Token:"
    echo "   访问 https://github.com/settings/tokens"
    echo "   生成新token（勾选repo权限）"
    echo "   使用token作为密码"
    echo ""
    echo "2. 或使用SSH:"
    echo "   git remote set-url origin git@github.com:$GITHUB_USER/$REPO_NAME.git"
    echo "   git push -u origin main"
    exit 1
fi

# 11. 启用GitHub Pages
echo ""
echo -e "${BLUE}🌐 启用GitHub Pages...${NC}"
echo ""
echo -e "${BLUE}请按以下步骤手动启用GitHub Pages:${NC}"
echo ""
echo "1. 访问仓库设置页面:"
echo "   https://github.com/$GITHUB_USER/$REPO_NAME/settings/pages"
echo ""
echo "2. 在 'Source' 部分:"
echo "   - 选择 'Deploy from a branch'"
echo "   - Branch: 选择 'main'"
echo "   - Folder: 选择 '/ (root)'"
echo "   - 点击 'Save'"
echo ""
echo "3. 等待1-2分钟部署完成"
echo ""

# 12. 显示访问地址
WEBSITE_URL="https://$GITHUB_USER.github.io/$REPO_NAME/web/"
echo -e "${GREEN}✅ 部署完成！${NC}"
echo ""
echo -e "${GREEN}🎉 你的Skill市场已成功部署！${NC}"
echo ""
echo -e "${BLUE}📍 访问地址:${NC}"
echo "   $WEBSITE_URL"
echo ""
echo -e "${BLUE}📊 项目统计:${NC}"
echo "   - 300+ AI技能"
echo "   - 30个分类"
echo "   - 完整网页版"
echo "   - 支持搜索筛选"
echo ""
echo -e "${BLUE}📚 相关链接:${NC}"
echo "   仓库: https://github.com/$GITHUB_USER/$REPO_NAME"
echo "   设置: https://github.com/$GITHUB_USER/$REPO_NAME/settings/pages"
echo ""
echo -e "${GREEN}💡 提示:${NC}"
echo "   - 首次部署可能需要1-2分钟生效"
echo "   - 如果404，请等待几分钟后刷新"
echo "   - 修改代码后，运行: git add . && git commit -m 'Update' && git push"
echo ""
echo -e "${GREEN}✨ 完成！${NC}"
