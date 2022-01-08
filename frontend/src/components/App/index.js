import { useEffect } from 'react'
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
    console.log(photos)

    useEffect(() => {
        dispatch(getAllPhotos())
    }, [dispatch])

    if(!sessionUser) return (
        <Redirect to='/welcome' />
    )
    console.log('hello', photos)

    const handleLogout = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.logout())

    }

    return (
        <div>
            <h1>You are logged in</h1>
            <h2>There are lots of rabbits here.</h2>
            <Masonry columnsCount={3} gutter={4}>
            {photos?.map(({id, url}) => (
                <img className='photo-spread' key={id} src={url} />
                ))}
            </Masonry>
            <form onSubmit={handleLogout}>
                <button type='submit'>Logout</button>
            </form>
        </div>
    )
}

export default HomeApp
