import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Route, Switch, NavLink, Link } from 'react-router-dom'
import * as sessionActions from '../../store/session'

import { getAllPhotos } from '../../store/photos'
import { getUserAlbums } from '../../store/album'
import HomeHeader from './Header'
import Explore from './Explore'
import Albums from './Albums'
import LoginFormPage from '../LoginFormPage'
import Footer from '../Footer'

import './HomeApp.css'


function HomeApp({way}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const photos = useSelector(state => state.photoState.entries)
    const albums = useSelector(state => state.albumState.entries)
    const id = sessionUser.id

    useEffect(() => {
        dispatch(sessionActions.restore())
        dispatch(getAllPhotos())

    }, [dispatch])


    useEffect(() => {
        dispatch(getUserAlbums(id))
    }, [photos])


    // if(!sessionUser) return (
    //     <Redirect to='/welcome' />
    // )

    const handleLogout = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.logout())

    }

    const choices = photos?.filter(photo => photo.userId === sessionUser.id)
    console.log(choices)

    if (way === 'explore') {
        return (
            <div className='logged-home'>
                <div className='title-container'>
                    <h1 className='explore-title'>Explore</h1>
                </div>
                <Explore photos={photos} style='explore-caption' />


            </div>
        )
    }

    if (way === 'photostream') {
        return (
            <div className='logged-home'>
                <div className='title-container'>
                    <h1 className='explore-title'>My Photostream</h1>
                </div>
                <Explore photos={choices} style='photostream-caption'/>
            </div>
        )
    }

    if (way === 'albums') {
        return (
            <div className='logged-home'>
                <div className='title-container'>
                    <h1 className='explore-title'>My Albums</h1>
                </div>
                <Albums albums={albums} />
            </div>
        )
    }
}

export default HomeApp
