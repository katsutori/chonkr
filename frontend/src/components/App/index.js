import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Route, Switch, NavLink, Link } from 'react-router-dom'
import * as sessionActions from '../../store/session'

import { getAllPhotos } from '../../store/photos'
import HomeHeader from './Header'
import Explore from './Explore'
import LoginFormPage from '../LoginFormPage'
import Footer from '../Footer'

import './HomeApp.css'


function HomeApp() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const photos = useSelector(state => state.photoState.entries)

    useEffect(() => {
        dispatch(getAllPhotos())
    }, [dispatch])


    // if(!sessionUser) return (
    //     <Redirect to='/welcome' />
    // )

    const handleLogout = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.logout())

    }

    return (
        <div className='logged-home'>

            <Explore photos={photos} />


        </div>
    )
}

export default HomeApp
