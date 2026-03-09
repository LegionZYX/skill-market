# TOOLS.md - 本地工具笔记

## 文档处理

### Word 文档 (.docx/.doc)

**读取工具:** `tools/doc_reader.py`

```powershell
# 读取文档内容
python tools/doc_reader.py "路径/到/文档.docx"
```

**支持格式:**
- `.docx` - 使用 python-docx 库（已安装）
- `.doc` - 需要 Microsoft Word（Windows）

**Python 库:**
- `python-docx` - 处理 .docx 文件
- `mammoth` - 可选，转换为 HTML

**处理能力:**
- 提取段落文本
- 读取表格内容
- 保留基本格式

**示例用法:**
```python
from docx import Document

doc = Document("文件.docx")
for para in doc.paragraphs:
    print(para.text)
```

---

_继续添加其他工具..._
