import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import * as sessionActions from '../../store/session'

import { getAllPhotos } from '../../store/photos'
import HomeHeader from './Header'
import Explore from './Explore'
import Footer from '../Footer'

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
            <HomeHeader />
            <h1>You are logged in</h1>
            <h2>There are lots of rabbits here.</h2>
            <Explore photos={photos} />
            <Footer />
        </div>
    )
}

export default HomeApp
