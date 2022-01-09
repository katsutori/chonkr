import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'

import * as sessionActions from '../../../store/session'

import logo from '../../../img/logo.png'
import upload from '../../../img/upload.png'
import './Header.css'


function HomeHeader() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        alert('You need to make this work')
    }

    const handleLogout = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.logout())

    }

    return (
        <div className='main'>
            <div className='logo'>
                <a href='/'><img className='logo-image' src={logo} /></a>
            </div>
            <div className='splash-search'>
                <form onSubmit={handleSearch}>
                    <input
                        type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search for photos or chonky animal picture takerers'
                    />
                    <button type='submit'></button>
                </form>
            </div>
            <div className='splash-navigation'>
                <Link className='login-button' to='/users/:id/photos'><img alt='Upload' src={upload} /></Link>
                <form onSubmit={handleLogout}>
                <button className='logout-button' type='submit'>Logout</button>
                </form>
            </div>
        </div>
    )
}

export default HomeHeader
