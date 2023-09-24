import React from 'react'
import useMovieTrailer from '../hooks/useMovieTrailer'
import { useSelector } from 'react-redux'

const VedioBackground = ({movieId}) => {
  const trailerVedio = useSelector(store => store.movies?.trailerVedios)
  // fetch trailer vedio and updating the store vedio with trailer vedio data
  useMovieTrailer(movieId)

  return (
    <div className=''>
      {/* for autoplay vedio add '?&autoplay=1&mute=1' after trailerVedio.key */}
      <iframe className='w-screen aspect-video' src={"https://www.youtube.com/embed/"+ trailerVedio?.key } title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
    </div>
  )
}

export default VedioBackground
