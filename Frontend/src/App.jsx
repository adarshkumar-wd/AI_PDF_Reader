import React, { useState } from 'react'
import { CiSquarePlus } from "react-icons/ci";
""

function App() {

  const [isImageUpload, setIsImageUpload] = useState(false);

  return (
    <>
      <nav className='w-full h-20% flex py-3 px-2 justify-between items-center shadow-lg'>

        {/* logo */}

        <div className='w-[20%]'>
          <img className='' src="https://static.swapcard.com/public/images/c5314c79a3d74b5eb0672dd534babac5.png" alt="" />
        </div>

        <div className='flex gap-4'>
          {/* upload Immage option */}

          <label className='font-bold text-2xl' for="file"><CiSquarePlus /></label>

          <div>
            <input onChange={() => setIsImageUpload(!isImageUpload)} type="file" id='file' className={`${isImageUpload ? "" : "hidden"}`} />
          </div>

        </div>
      </nav>
    </>
  )
}

export default App