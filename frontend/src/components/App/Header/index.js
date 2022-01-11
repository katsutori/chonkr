import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Link, useHistory } from 'react-router-dom'

import * as sessionActions from '../../../store/session'

import logo from '../../../img/logo.png'
import upload from '../../../img/upload.png'
import './Header.css'


function HomeHeader() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [search, setSearch] = useState('')

    const history = useHistory()

    const handleSearch = (e) => {
        e.preventDefault()
        alert('You need to make this work')
    }

    const handleLogout = (e) => {
        e.preventDefault()
        history.push('/')
        return dispatch(sessionActions.logout())

    }

    return (
        <div className='main'>
            <div className='logo'>
                <img className='logo-image' src={logo} />
            </div>
            <div className='nav-bar'>
                <NavLink className='nav-bar-links' to="/" active>Explore</NavLink>
                <NavLink className='nav-bar-links' to='/photostream'>My Photostream</NavLink>
                <NavLink className='nav-bar-links' to='/'>Albums</NavLink>
                <a className='nav-bar-links' href='https://github.com/katsutori/chonkr' target='blank'>GitHub Repo</a>
                <a className='nav-bar-links' href='https://www.linkedin.com/in/thien-dang-ct' target='blank'>My LinkedIn or Not</a>
            </div>
            <div className='splash-navigation'>
                <Link className='login-button' to='/upload'><img alt='Upload' src={upload} /></Link>
                <form onSubmit={handleLogout}>
                <button className='logout-button' type='submit'>Logout</button>
                </form>
            </div>
        </div>
    )
}

export default HomeHeader
