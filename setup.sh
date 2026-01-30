#!/bin/bash

# 定义颜色输出
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== 开始安装环境 ===${NC}"

# 1. 检查 Python
if ! command -v python3 &> /dev/null; then
    echo "❌ 未找到 Python3，请先安装 Python。"
    exit 1
fi

# 2. 创建虚拟环境 (venv)
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
else
    echo "Virtual environment already exists."
fi

# 3. 激活环境并安装依赖
echo "Installing dependencies..."
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

echo -e "${GREEN}=== ✅ 安装完成! ===${NC}"
echo ""
echo "👉 请运行以下命令激活环境："
echo "   source venv/bin/activate"
echo ""
echo "🚀 然后开始使用："
echo "   python pdf_to_docx.py <你的PDF文件>"
