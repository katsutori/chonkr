import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link, Redirect } from 'react-router-dom'
import * as sessionActions from '../../../store/session'

import { getAllPhotos } from '../../../store/photos'
import { deletedPhoto } from '../../../store/photos'
import './SingleImage.css'

const PhotoDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [photoId, setPhotoId] = useState()
    const [loggedUser, setLoggedUser] = useState()
    const { id } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const all = useSelector(state => state.photoState.entries)
    const single = all.find(one => one.id === +id)

    useEffect(() => {
        dispatch(getAllPhotos())
        dispatch(sessionActions.restore())
    }, [dispatch])


    const handleDelete = async (e) => {
        e.preventDefault()
        console.log(single.id)
        const deleting = await dispatch(deletedPhoto(single.id))

        history.push('/')

    }

    if (!single) {
        console.log('hi')
        return (
            <Redirect to='/garbage' />
        )
    }

    return (
        <div className='single-image-container'>
            <img src={single?.url} />
            <h1>{single?.title}</h1>
            <p>{single?.description}</p>
            <p>{single?.dateTaken}</p>
            {single?.userId === sessionUser.id ? <button onClick={handleDelete} type='submit'>Delete</button>:<></>}
            {single?.userId === sessionUser.id ? <Link to={`/photos/${single.id}/edit`}><button type='submit'>Edit</button></Link>:<></>}
        </div>
    )
}

export default PhotoDetail
