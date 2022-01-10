import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as sessionActions from '../../../store/session'

import { getAllPhotos } from '../../../store/photos'
import './SingleImage.css'

const PhotoDetail = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const all = useSelector(state => state.photoState.entries)
    const single = all.find(one => one.id === +id)

    useEffect(() => {
        dispatch(getAllPhotos())
    }, [dispatch])

    return (
        <div className='single-image-container'>
            <img src={single?.url} />
            <h1>{single?.title}</h1>
            <p>{single?.description}</p>
            <p>{single?.dateTaken}</p>

        </div>
    )
}

export default PhotoDetail
