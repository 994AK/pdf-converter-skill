import streamlit as st
import os
from pdf2docx import Converter
import tempfile

st.set_page_config(page_title="PDF to DOCX Converter", page_icon="📄")

st.title("📄 PDF to DOCX Converter")
st.write("Upload a PDF file and convert it to editable DOCX format.")

uploaded_file = st.file_uploader("Choose a PDF file", type="pdf")

if uploaded_file is not None:
    # Save the uploaded file to a temporary location
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_pdf:
        tmp_pdf.write(uploaded_file.getvalue())
        tmp_pdf_path = tmp_pdf.name

    docx_path = tmp_pdf_path.replace(".pdf", ".docx")

    if st.button("Convert to DOCX"):
        with st.spinner("Converting... Please wait."):
            try:
                # Perform conversion
                cv = Converter(tmp_pdf_path)
                cv.convert(docx_path)
                cv.close()

                # Read the converted file
                with open(docx_path, "rb") as f:
                    docx_data = f.read()

                st.success("Conversion successful!")
                st.download_button(
                    label="📥 Download DOCX",
                    data=docx_data,
                    file_name=uploaded_file.name.replace(".pdf", ".docx"),
                    mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                )

            except Exception as e:
                st.error(f"An error occurred: {e}")
            finally:
                # Cleanup
                if os.path.exists(tmp_pdf_path):
                    os.remove(tmp_pdf_path)
                if os.path.exists(docx_path):
                    os.remove(docx_path)

st.divider()
st.caption("Powered by pdf2docx and Streamlit")
