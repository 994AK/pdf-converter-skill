---
name: pdf-converter
description: A universal PDF conversion toolkit. Converts PDF documents to Word (.docx), Excel (.xlsx), or PowerPoint (.pptx). Handles single files or batch processing.
---

# PDF Converter Skill

This skill provides a comprehensive toolkit for converting PDF documents into editable Office formats. It is organized into three distinct modules based on the desired output format.

## When to Use This Skill

Use this skill when the user wants to:
- "Convert this PDF to Word/Excel/PPT".
- "Extract tables from this PDF".
- "Turn this PDF into a presentation".
- "Make this PDF editable".

## References

For detailed technical information, library comparisons, and troubleshooting tips, refer to:
- `references/user_guide.md`

## Prerequisites

Before using any module, ensure the system dependencies and Python libraries are installed.

1.  **System Tool (Required for PPT Module):**
    *   **macOS:** `brew install poppler`
    *   **Linux:** `sudo apt-get install poppler-utils`
2.  **Python Libraries:**
    ```bash
    pip install pdf2docx pdfplumber pandas openpyxl xlsxwriter python-pptx pdf2image
    ```

---

## Module 1: PDF to Word (.docx)

**Use Case:** General document editing, text extraction while preserving layout.

**Script Location:** `scripts/pdf_to_docx.py`

**Usage:**
```bash
# Single file
python3 <path_to_skill_script>/pdf_to_docx.py "/path/to/source.pdf"

# Entire Directory (Batch)
python3 <path_to_skill_script>/pdf_to_docx.py "/path/to/directory/"
```

---

## Module 2: PDF to Excel (.xlsx)

**Use Case:** Extracting data tables, financial reports, or structured lists.
*Note: If the PDF contains no detected tables, an empty Excel file with an info sheet will be created.*

**Script Location:** `scripts/pdf_to_excel.py`

**Usage:**
```bash
# Single file
python3 <path_to_skill_script>/pdf_to_excel.py "/path/to/source.pdf"
```

---

## Module 3: PDF to PowerPoint (.pptx)

**Use Case:** creating presentation slides.
*Technique: Renders each PDF page as a high-resolution image and places it on a slide to ensure perfect visual fidelity.*

**Script Location:** `scripts/pdf_to_pptx.py`

**Usage:**
```bash
# Single file
python3 <path_to_skill_script>/pdf_to_pptx.py "/path/to/source.pdf"
```

---

## Troubleshooting

-   **PPT Conversion Fails:** Check if `poppler` is installed (`pdf2image` requires it).
-   **Excel is Empty:** The PDF might be a scanned image without recognizable table structures. `pdfplumber` works best on native text-based PDFs.
-   **Word Formatting Issues:** Complex multicolumn layouts or heavily styled PDFs might have minor displacement.
