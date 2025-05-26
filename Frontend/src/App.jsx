import React, { useState } from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { VscSend } from "react-icons/vsc";
""

function App() {

  const [isImageUpload, setIsImageUpload] = useState(false);

  return (
    <div className='h-screen'>

      <nav className='w-full h-[10%] flex py-3 px-2 justify-between items-center shadow-lg'>

        {/* logo */}

        <div className='w-[20%]'>
          <img className='' src="https://static.swapcard.com/public/images/c5314c79a3d74b5eb0672dd534babac5.png" alt="" />
        </div>

        <div className='flex gap-4'>
          {/* upload Immage option */}

          <label className='font-bold text-3xl' htmlFor="file"><CiSquarePlus /></label>

          <div>
            <input onChange={() => setIsImageUpload(!isImageUpload)} type="file" id='file' className={`${isImageUpload ? "" : "hidden"}`} />
          </div>

        </div>
      </nav>

      <section className='w-full min-h-[80%] bg--100'>

      </section>

      <footer className='w-full bg-white shadow-[0_-10px_6px_-1px_rgba(0,0,0,0.1)] h-[10%] flex items-center justify-center'>

        <div className='flex bg-gray-100 items-center w-[90%]  border-1 border-gray-200 px-3 py-1 rounded-md'>

          <input type="text" placeholder='Enter a message...' className='w-full outline-none px-2 py-1 font-light'/>
          <VscSend className=''/>

        </div>

      </footer>
      

    </div>
  )
}

export default App