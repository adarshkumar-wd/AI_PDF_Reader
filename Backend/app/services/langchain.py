from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.schema import Document
from langchain.embeddings import HuggingFaceEmbeddings

def process_and_store_text(text: str, vectorstore_path: str = "faiss_index"):
    # Initialize HuggingFace Embeddings (free, no API key)
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # Convert text into list of Document
    docs = [Document(page_content=text)]

    # Split text into chunks
    splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    splitted_docs = splitter.split_documents(docs)

    # Create vector store
    vector_store = FAISS.from_documents(splitted_docs, embeddings)

    # Save it locally
    vector_store.save_local(vectorstore_path)

    print("✅ Successfully stored text using HuggingFace embeddings.")
