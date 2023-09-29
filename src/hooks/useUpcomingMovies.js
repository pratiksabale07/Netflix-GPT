import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {addUpcomingMovies } from '../utils/moviesSlice'
import { API_OPTIONS } from '../utils/constants'

const useUpcomingMovies = () => {
    const dispatch = useDispatch()
    const getUpcomingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS)
        const json = await data.json()
        dispatch(addUpcomingMovies(json.results))
    }

    useEffect(() =>{
        getUpcomingMovies()
    },[])
    return (
        <div>

    </div>
)
}

export default useUpcomingMovies