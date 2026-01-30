import sys
import os
from pdf2docx import Converter

def convert_single_file(pdf_path):
    """Converts a single PDF file to DOCX."""
    if not pdf_path.lower().endswith(".pdf"):
        return

    docx_path = os.path.splitext(pdf_path)[0] + ".docx"
    print(f"--- Converting: {os.path.basename(pdf_path)} ---")
    
    try:
        cv = Converter(pdf_path)
        cv.convert(docx_path)
        cv.close()
        print(f"✓ Saved to: {docx_path}")
    except Exception as e:
        print(f"✗ Failed to convert {pdf_path}: {e}")

def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python pdf_to_docx.py <file_path.pdf>   # Convert single file")
        print("  python pdf_to_docx.py <folder_path>     # Convert all PDFs in folder")
        return

    target = sys.argv[1]

    if os.path.isfile(target):
        convert_single_file(target)
    elif os.path.isdir(target):
        print(f"Scanning folder: {target}")
        files = [os.path.join(target, f) for f in os.listdir(target) if f.lower().endswith(".pdf")]
        if not files:
            print("No PDF files found in the directory.")
            return
        
        print(f"Found {len(files)} PDF(s). Starting batch conversion...")
        for f in files:
            convert_single_file(f)
    else:
        print(f"Error: '{target}' is not a valid file or directory.")

if __name__ == "__main__":
    main()