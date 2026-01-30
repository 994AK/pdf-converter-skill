import pdfplumber
import pandas as pd
import os
import sys

def convert_pdf_to_excel(pdf_path, output_path=None):
    """
    Extracts tables from a PDF and saves them to an Excel file.
    Each table is saved to a separate sheet, or stacked if they share structure.
    """
    if not output_path:
        output_path = os.path.splitext(pdf_path)[0] + ".xlsx"

    print(f"--- Converting to Excel: {os.path.basename(pdf_path)} ---")
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            with pd.ExcelWriter(output_path, engine='xlsxwriter') as writer:
                has_tables = False
                for i, page in enumerate(pdf.pages):
                    tables = page.extract_tables()
                    if tables:
                        has_tables = True
                        for j, table in enumerate(tables):
                            df = pd.DataFrame(table[1:], columns=table[0]) # Assume first row is header
                            sheet_name = f"Page_{i+1}_Table_{j+1}"
                            # Excel sheet names len limit is 31
                            sheet_name = sheet_name[:31] 
                            df.to_excel(writer, sheet_name=sheet_name, index=False)
                            print(f"  ✓ Extracted table from Page {i+1}")
                
                if not has_tables:
                    print("  ⚠ No tables found in PDF. Creating empty Excel.")
                    pd.DataFrame(["No tables detected"]).to_excel(writer, sheet_name="Info", index=False)

        print(f"✓ Saved to: {output_path}")
        return output_path
    except Exception as e:
        print(f"✗ Failed to convert {pdf_path}: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python pdf_to_excel.py <file.pdf>")
    else:
        convert_pdf_to_excel(sys.argv[1])
