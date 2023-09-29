import React, { useEffect } from 'react'
import { addPopularMovies } from '../utils/moviesSlice'
import { useDispatch } from 'react-redux'
import { API_OPTIONS } from '../utils/constants'

const usePopularMovies = () => {
    const dispatch = useDispatch()
    // fetch movies and updating the store movies data
    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS)
        const json = await data.json()
        debugger
        dispatch(addPopularMovies(json.results))
    }

    useEffect(() => {
        getPopularMovies()
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default usePopularMovies
