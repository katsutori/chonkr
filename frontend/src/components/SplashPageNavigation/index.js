import React from 'react'
import { useState } from 'react'
import './SplashPageNavigation.css'



function SplashNavigation() {
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        alert('You need to make this work')
    }

    return (
        <div className='main'>
            <div className='logo'>
                <a href='/'><img className='logo-image' src='https://sept21aa.games/img/logo.png' /></a>
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
                <a className='login-button' href='/login'>Log In</a>
                <a className='signup-button' href='/signup'>Sign Up</a>
            </div>
        </div>
    )
}

export default SplashNavigation
