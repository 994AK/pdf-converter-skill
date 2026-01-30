# PDF Converter Technical Reference & User Guide

This document provides detailed information about the libraries and methodologies used in the PDF Converter skill.

## Library Overview

| Format | Primary Library | Methodology |
| :--- | :--- | :--- |
| **Word (.docx)** | `pdf2docx` | Reconstructs the document flow by analyzing text blocks, images, and shapes. |
| **Excel (.xlsx)** | `pdfplumber` | Identifies graphical lines (lattice) or text alignment (stream) to detect tables. |
| **PowerPoint (.pptx)** | `pdf2image` + `python-pptx` | Renders PDF pages to JPG/PNG images to ensure 1:1 visual fidelity on slides. |

## Detailed Capabilities & Limitations

### 1. Word Conversion (.docx)
- **Strengths:** Excellent at preserving multi-column layouts and inline images.
- **Limitations:** Does not handle OCR. If the PDF is a scan (just a big image), the Word doc will also just contain that image.

### 2. Excel Extraction (.xlsx)
- **Strengths:** Can extract multiple tables from a single page and save them to different sheets.
- **Limitations:** Depends on clear table borders or alignment. Performance varies with "borderless" tables. Use `pandas` for further data cleaning.

### 3. PowerPoint Creation (.pptx)
- **Strengths:** Zero formatting issues. What you see in the PDF is exactly what you get on the slide.
- **Limitations:** Text on slides is NOT selectable/editable because it is rendered as an image. This is a deliberate choice to ensure "no-mess" presentations.

## Troubleshooting

### Common Errors

1.  **"Poppler not found"**:
    - This occurs during PPT conversion. `pdf2image` is a wrapper around the `pdftoppm` command line tool from the Poppler suite.
    - **Fix:** Install Poppler via your system package manager (`brew`, `apt`, etc.).

2.  **"ModuleNotFoundError"**:
    - Occurs if Python dependencies are missing.
    - **Fix:** Run `pip install -r requirements.txt` (or manually install the missing module).

3.  **"Empty Excel File"**:
    - Occurs if `pdfplumber` cannot find any table structures.
    - **Check:** Is the PDF a scanned image? Or does the table have no borders?

## Best Practices
- **For complex layouts:** Always try the Word module first.
- **For data-heavy reports:** Use the Excel module.
- **For quick presentations:** Use the PPT module.
