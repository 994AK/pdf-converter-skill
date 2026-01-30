import streamlit as st
import os
import tempfile
# Converters
from pdf2docx import Converter
from pdf_to_excel import convert_pdf_to_excel
from pdf_to_pptx import convert_pdf_to_pptx

st.set_page_config(page_title="Universal PDF Converter", page_icon="📂")

st.title("📂 Universal PDF Converter")
st.write("Convert PDF files to Word, Excel, or PowerPoint.")

# Upload
uploaded_file = st.file_uploader("Choose a PDF file", type="pdf")

# Format Selection
format_option = st.selectbox(
    "Select Output Format",
    ("Word (.docx)", "Excel (.xlsx)", "PowerPoint (.pptx)")
)

if uploaded_file is not None:
    # Save temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_pdf:
        tmp_pdf.write(uploaded_file.getvalue())
        tmp_pdf_path = tmp_pdf.name

    # Determine output extension and mime type
    if format_option == "Word (.docx)":
        output_ext = ".docx"
        mime_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    elif format_option == "Excel (.xlsx)":
        output_ext = ".xlsx"
        mime_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    else:
        output_ext = ".pptx"
        mime_type = "application/vnd.openxmlformats-officedocument.presentationml.presentation"

    output_path = tmp_pdf_path.replace(".pdf", output_ext)

    if st.button(f"Convert to {format_option}"):
        with st.spinner("Converting... Please wait."):
            try:
                success = False
                
                # ROUTING LOGIC
                if format_option == "Word (.docx)":
                    cv = Converter(tmp_pdf_path)
                    cv.convert(output_path)
                    cv.close()
                    success = True
                    
                elif format_option == "Excel (.xlsx)":
                    result = convert_pdf_to_excel(tmp_pdf_path, output_path)
                    if result: success = True
                    
                elif format_option == "PowerPoint (.pptx)":
                    result = convert_pdf_to_pptx(tmp_pdf_path, output_path)
                    if result: success = True

                # DOWNLOAD
                if success and os.path.exists(output_path):
                    with open(output_path, "rb") as f:
                        file_data = f.read()

                    st.success("Conversion successful!")
                    st.download_button(
                        label=f"📥 Download {output_ext}",
                        data=file_data,
                        file_name=uploaded_file.name.replace(".pdf", output_ext),
                        mime=mime_type
                    )
                else:
                    st.error("Conversion failed. Please check the logs.")

            except Exception as e:
                st.error(f"An error occurred: {e}")
            finally:
                # Cleanup
                if os.path.exists(tmp_pdf_path):
                    os.remove(tmp_pdf_path)
                if os.path.exists(output_path):
                    os.remove(output_path)

st.divider()
st.caption("Supports: PDF to DOCX, XLSX (Tables), PPTX (Images)")