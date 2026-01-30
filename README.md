# PDF to DOCX Converter

这是一个轻量级的 Python 工具，用于将 PDF 文件转换为可编辑的 Word (.docx) 文档。
它支持 **命令行 (CLI)** 批量处理和 **网页界面 (Web UI)** 交互操作。

## 🛠 安装指南

### 前置要求
- macOS / Linux / Windows
- Python 3.8+

### 快速安装
只需运行根目录下的安装脚本，即可自动配置虚拟环境并安装依赖：

```bash
# macOS / Linux
./setup.sh
```

> **注意**: 安装完成后，请根据脚本提示运行 `source venv/bin/activate` 激活环境。

---

## 🚀 使用方法

确保你已经激活了虚拟环境 (`source venv/bin/activate`)。

### 方式一：命令行 (推荐开发人员)

**1. 转换单个文件**
```bash
python pdf_to_docx.py /path/to/your/file.pdf
```
*生成的 .docx 文件将保存在原 PDF 同级目录下。*

**2. 批量转换文件夹**
将整个文件夹内的所有 PDF 转换为 Word：
```bash
python pdf_to_docx.py /path/to/folder/
```

### 方式二：网页界面 (推荐普通用户)

启动图形化界面，支持拖拽上传：
```bash
streamlit run app.py
```
启动后，浏览器会自动打开转换页面。

---

## 🤖 Agent 技能包 (AI 助手专用)

本项目包含一个完整的 **Gemini Agent Skill** 源码，位于 `skill/pdf-converter/` 文件夹。
如果你使用 Gemini CLI 或其他支持 Skill 协议的 AI 助手，可以直接导入此文件夹。

**使用方式：**
1. 将 `skill/pdf-converter/` 文件夹复制或链接到你的技能目录（例如 `~/.gemini/skills/`）。
2. 只要对 AI 说：“用 pdf-converter 技能帮我转一下这个文件”，它就会自动调用。

---

## 📂 项目结构

```text
.
├── pdf_to_docx.py    # 核心转换脚本
├── app.py            # 网页界面脚本
├── requirements.txt  # 依赖列表
├── setup.sh          # 一键安装脚本
└── README.md         # 说明文档
```
