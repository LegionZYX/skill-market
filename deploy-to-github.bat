@echo off
chcp 65001 >nul
REM OpenClaw Skill Market - GitHub Pages 部署脚本 (Windows)
REM 使用方法: 双击运行 deploy-to-github.bat

echo.
echo 🚀 OpenClaw Skill Market - GitHub Pages 部署
echo ==============================================
echo.

REM 检查是否在正确的目录
if not exist "web" (
    echo ❌ 错误: 请在 skill-marketplace 目录下运行此脚本
    pause
    exit /b 1
)

REM 1. 检查Git是否安装
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Git未安装，请先安装Git
    echo 下载地址: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo ✅ Git已安装
echo.

REM 2. 获取GitHub用户信息
set /p GITHUB_USER="请输入GitHub用户名 (例如: legionxyz): "
if "%GITHUB_USER%"=="" (
    echo ❌ 用户名不能为空
    pause
    exit /b 1
)

set /p REPO_NAME="请输入仓库名称 (默认: skill-market): "
if "%REPO_NAME%"=="" set REPO_NAME=skill-market

echo.
echo 📦 仓库信息:
echo    用户名: %GITHUB_USER%
echo    仓库名: %REPO_NAME%
echo    仓库地址: https://github.com/%GITHUB_USER%/%REPO_NAME%
echo.

set /p CONFIRM="确认信息正确? (y/n): "
if /i not "%CONFIRM%"=="y" (
    echo 已取消部署
    pause
    exit /b 0
)

REM 3. 初始化Git仓库
echo.
echo 🔧 初始化Git仓库...

if not exist ".git" (
    git init
    echo ✅ Git仓库已初始化
) else (
    echo ✅ Git仓库已存在
)

REM 4. 配置Git用户信息
git config user.name >nul 2>nul
if %ERRORLEVEL% neq 0 (
    git config user.name "%GITHUB_USER%"
    git config user.email "%GITHUB_USER%@users.noreply.github.com"
    echo ✅ Git用户信息已配置
)

REM 5. 创建.gitignore
(
echo # Python
echo __pycache__/
echo *.py[cod]
echo.
echo # IDE
echo .vscode/
echo .idea/
echo.
echo # OS
echo .DS_Store
echo Thumbs.db
echo.
echo # Temp
echo *.tmp
echo *.log
) > .gitignore

echo ✅ .gitignore 已创建

REM 6. 添加所有文件
echo.
echo 📁 添加文件到Git...
git add .
echo ✅ 文件已添加

REM 7. 创建初始提交
echo.
echo 💾 创建初始提交...
git commit -m "🚀 Initial commit: OpenClaw Skill Market with 300+ skills"
echo ✅ 提交完成

REM 8. 设置主分支
git branch -M main
echo ✅ 主分支已设置为 main

REM 9. 添加远程仓库
echo.
echo 🔗 配置远程仓库...
set REPO_URL=https://github.com/%GITHUB_USER%/%REPO_NAME%.git

git remote remove origin >nul 2>nul
git remote add origin %REPO_URL%
echo ✅ 远程仓库已添加

REM 10. 提示创建GitHub仓库
echo.
echo ⚠️  重要提示:
echo    1. 请确保已在GitHub上创建仓库: %REPO_NAME%
echo    2. 如果仓库不存在，请先访问 https://github.com/new 创建
echo    3. 创建时请选择 Public（公开）
echo    4. 不要勾选 'Add a README file'
echo.

set /p REPO_EXISTS="已在GitHub创建好仓库? (y/n): "
if /i not "%REPO_EXISTS%"=="y" (
    echo.
    echo 请按以下步骤操作:
    echo 1. 访问 https://github.com/new
    echo 2. 仓库名称: %REPO_NAME%
    echo 3. 选择 Public
    echo 4. 不要勾选任何初始化选项
    echo 5. 点击 Create repository
    echo 6. 创建完成后，重新运行此脚本
    pause
    exit /b 0
)

REM 11. 推送到GitHub
echo.
echo 📤 推送到GitHub...
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ✅ 代码已推送到GitHub
) else (
    echo.
    echo ❌ 推送失败，可能需要认证
    echo.
    echo 请尝试以下方法:
    echo 1. 使用Personal Access Token:
    echo    访问 https://github.com/settings/tokens
    echo    生成新token（勾选repo权限）
    echo    使用token作为密码
    echo.
    echo 2. 或使用GitHub Desktop
    pause
    exit /b 1
)

REM 12. 显示GitHub Pages设置说明
echo.
echo 🌐 启用GitHub Pages
echo.
echo 请按以下步骤手动启用GitHub Pages:
echo.
echo 1. 访问仓库设置页面:
echo    https://github.com/%GITHUB_USER%/%REPO_NAME%/settings/pages
echo.
echo 2. 在 'Source' 部分:
echo    - 选择 'Deploy from a branch'
echo    - Branch: 选择 'main'
echo    - Folder: 选择 '/ (root)'
echo    - 点击 'Save'
echo.
echo 3. 等待1-2分钟部署完成
echo.

REM 13. 显示成功信息
echo ✅ 部署完成！
echo.
echo 🎉 你的Skill市场已成功部署！
echo.
echo 📍 访问地址:
echo    https://%GITHUB_USER%.github.io/%REPO_NAME%/web/
echo.
echo 📊 项目统计:
echo    - 300+ AI技能
echo    - 30个分类
echo    - 完整网页版
echo    - 支持搜索筛选
echo.
echo 📚 相关链接:
echo    仓库: https://github.com/%GITHUB_USER%/%REPO_NAME%
echo    设置: https://github.com/%GITHUB_USER%/%REPO_NAME%/settings/pages
echo.
echo 💡 提示:
echo    - 首次部署可能需要1-2分钟生效
echo    - 如果404，请等待几分钟后刷新
echo    - 修改代码后，运行: git add . ^&^& git commit -m "Update" ^&^& git push
echo.
echo ✨ 完成！
echo.
pause
