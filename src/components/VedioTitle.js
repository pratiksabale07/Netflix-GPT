import React from 'react'

const VedioTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[15%] p-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/4'>{overview}</p>
      <div className=''>
        <button className='bg-white text-black p-4 px-12 text-xl rounded-lg mx-2 hover:bg-opacity-80'>▶️ Play</button>
        <button className='bg-gray-500 text-white p-4 px-8 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80'>ℹ️ More Info</button>
      </div>
    </div>
  )
}

export default VedioTitle
