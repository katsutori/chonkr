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
    console.log(photos)
    const [load, setLoad] = useState(false)
    const [first, setFirst] = useState([])
    const [second, setSecond] = useState([])
    const [third, setThird] = useState([])



    useEffect(() => {
        dispatch(getAllPhotos())
    }, [dispatch])

    // if (photos.length > 1) {
    //     const firstThird = []
    //     if(photos){
    //         for (let i = 0; i < photos.length; i += 3) {
    //             firstThird.push(photos[i])

    //         }
    //         setFirst(firstThird)
    //     }
    //     const secondThird = []
    //     if(photos){
    //         for (let i = 1; i < photos.length; i += 3) {
    //             secondThird.push(photos[i])

    //         }
    //         setSecond(secondThird)
    //     }
    //     const lastThird = []
    //     if(photos){
    //         for (let i = 2; i < photos.length; i += 3) {
    //             lastThird.push(photos[i])

    //         }
    //         setThird(lastThird)
    //     }
    // }
    // const firstThird = []

    // useEffect(() => {
    //     if(load){
    //     for (let i = 0; i < photos.length; i += 3) {
    //         firstThird.push(photos[i])
    //     }
    // }
    //     setFirst(firstThird)
    // }, [])



    if(!sessionUser) return (
        <Redirect to='/welcome' />
    )
    console.log('hello', photos)

    const handleLogout = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.logout())

    }



    // const secondThird = []
    // for (let i = 1; i < photos.length; i += 3) {
    //     secondThird.push(photos[i])
    // }

    // const lastThird = []
    // for (let i = 2; i < photos.length; i += 3) {
    //     lastThird.push(photos[i])
    // }
    let firstThird;
    let secondThird;
    return (
        <div className='logged-home'>
            <h1>You are logged in</h1>
            <h2>There are lots of rabbits here.</h2>
            <div className='outside-grid'>
                {photos?.map((photo, idx) => (

                    <figure>
                        <img className='photo-spread' key={idx} src={photo.url} />
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
