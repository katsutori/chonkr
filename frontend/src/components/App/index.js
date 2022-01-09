import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Masonry from 'react-responsive-masonry'
import { Redirect, Route, Switch } from 'react-router-dom'
import * as sessionActions from '../../store/session'

import { getAllPhotos } from '../../store/photos'

import './HomeApp.css'

function HomeApp() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const photos = useSelector(state => state.photoState.entries)

    useEffect(() => {
        dispatch(getAllPhotos())
    }, [dispatch])


    if(!sessionUser) return (
        <Redirect to='/welcome' />
    )

    const handleLogout = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.logout())

    }

    return (
        <div className='logged-home'>
            <h1>You are logged in</h1>
            <h2>There are lots of rabbits here.</h2>
            <div className='outside-grid'>
                {photos?.map((photo, idx) => (

                    <figure  key={idx}>
                        <img className='photo-spread' src={photo.url} />
                    </figure>

                ))}
            </div>
            <form onSubmit={handleLogout}>
                <button type='submit'>Logout</button>
            </form>
        </div>
    )
}

export default HomeApp
