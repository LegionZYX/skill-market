#!/bin/bash
# Skill Market 快速启动脚本

set -e

echo "🦞 OpenClaw Skill Market"
echo "========================"
echo ""

# 检查 Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 未安装"
    exit 1
fi

echo "✅ Python3 已安装"

# 检查依赖
if [ ! -d "venv" ]; then
    echo "📦 创建虚拟环境..."
    python3 -m venv venv
fi

echo "🔧 激活虚拟环境..."
source venv/bin/activate

echo "📥 安装依赖..."
pip install -q -r requirements.txt

echo ""
echo "📋 可用命令:"
echo "  1. 验证数据:     python scripts/validate.py"
echo "  2. 生成 CSV:     python scripts/json_csv_converter.py --to-csv"
echo "  3. 生成统计:     python scripts/generate_stats.py"
echo "  4. 查看技能:     cat data/skills.json"
echo "  5. 查看统计:     cat data/stats.md"
echo ""

# 运行验证
echo "🔍 运行数据验证..."
python scripts/validate.py

echo ""
echo "✅ 初始化完成!"
echo "📖 查看 README.md 了解更多"
