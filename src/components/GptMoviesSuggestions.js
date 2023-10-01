import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMoviesSuggestions = () => {

  const { movieResults, movieNames } = useSelector(store => store.gpt)
  if (!movieNames) return null;

  return (
    <div className='p-4 m-4 bg-black text-white'>
      <div>
        {movieNames.map((movieName, i) => <MovieList key={movieName} title={movieName} movies={movieResults[i]} />)}
      </div>
    </div>
  )
}

export default GptMoviesSuggestions
