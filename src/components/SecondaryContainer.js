import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const SecondaryContainer = () => {
    const movies = useSelector(store => store.movies)
  return movies.nowPlayingMovies && (
    <div className='bg-black px-2'>
      <div className='-mt-80 relative z-40'>
      <MovieList title={'Now playing'} movies={movies.nowPlayingMovies}/>
      </div>
      <MovieList title={'Upcoming Movies'} movies={movies.upcomingMovies}/>
      <MovieList title={'Top Rated Movies'} movies={movies.topRatedMovies}/>
      <MovieList title={'Popular'} movies={movies.popularMovies}/>
      <MovieList title={'Now playing'} movies={movies.nowPlayingMovies}/>
      <MovieList title={'Now playing'} movies={movies.nowPlayingMovies}/>
      <MovieList title={'Now playing'} movies={movies.nowPlayingMovies}/>
    </div>
  )
}

export default SecondaryContainer
