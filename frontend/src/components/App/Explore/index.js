import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as sessionActions from '../../../store/session'

import { getAllPhotos } from '../../../store/photos'

import './Explore.css'

function Explore ({photos}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const all = useSelector(state => state.photoState.entries)

    useEffect(() => {
        dispatch(getAllPhotos())
        dispatch(sessionActions.restore())
    }, [dispatch])
    return (
        <>
            <div className='title-container'>
                <h1 className='explore-title'>Explore</h1>
            </div>
            <div className='outside-grid'>
                    {photos?.map((photo, idx) => (

                        <figure  key={idx}>
                            <Link to={`/photos/${photo.id}`}>
                                <img className='photo-spread' src={photo.url} />
                            </Link>
                        </figure>

                    ))}
            </div>
        </>
    )
}

export default Explore
