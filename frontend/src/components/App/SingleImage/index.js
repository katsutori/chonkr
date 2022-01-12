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

        const deleting = await dispatch(deletedPhoto(single.id))

        history.push('/')

    }

    if (!single) {
        return (
            <p className='nope'>Nope. There's nothing here.</p>
        )
    }

    return (
        <>
            <div className='single-image-container'>
                <img className='single-image' src={single?.url} />
            </div>
            <div className='image-data-container'>
                <div className='image-data'>
                    <h1>{single?.title}</h1>
                    <p><b>Description:</b> {single?.description}</p>
                    <p><b>Date Taken:</b> {single?.dateTaken.slice(0, 10)}</p>
                    <p><b>Taken By:</b> {single?.User?.username}</p>
                    {single?.userId === sessionUser.id ? <button className='your-delete' onClick={handleDelete} type='submit'>Delete</button>:<></>}
                    {single?.userId === sessionUser.id ? <Link to={`/photos/${single.id}/edit`}><button className='your-edit'  type='submit'>Edit</button></Link>:<></>}
                </div>
            </div>
        </>
    )
}

export default PhotoDetail
