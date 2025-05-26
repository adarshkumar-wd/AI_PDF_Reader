import React, { useState } from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { VscSend } from "react-icons/vsc";
import axios from "axios"
""

function App() {

  const [isImageUpload, setIsImageUpload] = useState(false);
  const [question, setQuestion] = useState("");
  const [fileName, setFileName] = useState("");
  const [chats, setChats] = useState([{}]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:8000/api/ask-question", { question: question });
    console.log(response.data.answer)
    setQuestion("");
  }

  const handlePDF = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name)

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/api/upload-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className='h-screen'>

      <nav className='w-full h-[10%] flex py-3 px-2 justify-between items-center shadow-lg'>

        {/* logo */}

        <div className='w-[20%]'>
          <img className='' src="https://static.swapcard.com/public/images/c5314c79a3d74b5eb0672dd534babac5.png" alt="" />
        </div>

        <div className='flex gap-4 items-center'>
          {/* upload Immage option */}

          <p className='font-semibold text-[.7rem] text-green-500'>{fileName}</p>
          <label className='font-bold text-3xl' htmlFor="file"><CiSquarePlus /></label>

          <div>
            <input onChange={handlePDF} type="file" id='file' className={`${isImageUpload ? "" : "hidden"}`} />
          </div>

        </div>
      </nav>

      <section className='w-full min-h-[80%] bg--100'>

      </section>

      <footer className='w-full bg-white shadow-[0_-10px_6px_-1px_rgba(0,0,0,0.1)] h-[10%] flex items-center justify-center'>

        <div className='flex bg-gray-100 items-center w-[90%]  border-1 border-gray-200 px-3 py-1 rounded-md'>



          <input
            type="text"
            placeholder='Enter a message...'
            className='w-full outline-none px-2 py-1 font-light'
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button onClick={handleSubmit}>
            <VscSend className='' />
          </button>


        </div>

      </footer>


    </div>
  )
}

export default App