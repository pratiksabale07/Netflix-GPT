import React, { useRef } from 'react'
import lang from '../utils/languageConstant'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openAi'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/GptSlice'

const GptSearchBar = () => {
    const selectedLang = useSelector(store => store.config.lang)
    const dispatch = useDispatch()
    const searchText = useRef(null)

    const handleGptSearchClick = async() => {
      // make an api call to GPT API and get the movie results
      const getQuery = "Act as a Movie Recommendation system and suggest some movies for the query :"+ searchText.current.value + ", only give me name of 5 movies, comma seperated like the example reuslt given ahead, Example Result: Jawan, Don, Phir Hera Pheri, Koi Mil Gaya"
      const getResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: getQuery }],
        model: 'gpt-3.5-turbo',
      });
      const gptMovies = getResults.choices?.[0]?.message?.content.split(',')
      const promiseArray = gptMovies.map((movie) => fetchMovieTMDB(movie))
      const tmbdbResults = await Promise.all(promiseArray)
      dispatch(addGptMovieResult({movieNames: gptMovies, movieReusults: tmbdbResults}))
    }

    const fetchMovieTMDB = async(movie) => {
      const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1',API_OPTIONS)
      const json = await data.json();
      return json.results
    }
  return (
    <div className='pt-[10%] flex justify-center' onSubmit={(e)=> e.preventDefault()}>
      <form action="" className='w-1/2 bg-black grid grid-cols-12'>
        <input ref={searchText} type="text" className='p-4 m-4 col-span-9' placeholder={lang[selectedLang].gptPlaceholder}/>
        <button onClick={handleGptSearchClick} className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3'>{lang[selectedLang].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
