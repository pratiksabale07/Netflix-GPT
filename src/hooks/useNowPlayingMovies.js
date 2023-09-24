import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addNowPlayingMovies } from '../utils/moviesSlice'
import { API_OPTIONS } from '../utils/constants'

const useNowPlayingMovies = () => {
    const dispatch = useDispatch()
    // fetch movies and updating the store movies data
    const getNowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)
        const json = await data.json()
        dispatch(addNowPlayingMovies({ movies: json.results }))
    }

    useEffect(() => {
        getNowPlayingMovies()
    }, [])
    return (
        <div>

        </div>
    )
}

export default useNowPlayingMovies;
