import React from 'react'
import lang from '../utils/languageConstant'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {
    const selectedLang = useSelector(store => store.config.lang)
  return (
    <div className='pt-[10%] flex justify-center'>
      <form action="" className='w-1/2 bg-black grid grid-cols-12'>
        <input type="text" className='p-4 m-4 col-span-9' placeholder={lang[selectedLang].gptPlaceholder}/>
        <button className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3'>{lang[selectedLang].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
