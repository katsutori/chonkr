import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { uploadPhoto } from '../../../store/photos'
import * as sessionActions from '../../../store/session'

import './AddPhoto.css'

function AddPhoto() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [userId, setUserId] = useState(sessionUser.user.id)
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [dateTaken, setDateTaken] = useState(new Date())
    const [errors, setErrors] = useState([])


    const handleUpload = async (e) => {
        e.preventDefault()
        console.log(sessionUser.user.id)
        setErrors([])

        let payload = {
            userId,
            title,
            url,
            description,
            dateTaken
        }

        console.log(payload)

        const image = await dispatch(uploadPhoto(payload))
        console.log('hiiii', image)
        history.push(`/photos/${image.id}`)

    }

    return (
        <form onSubmit={handleUpload}>
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
            <div className='label-container'>
                <label>
                    <input
                        className='upload-label'
                        type='text'
                        value={title}
                        onChange={ e => setTitle(e.target.value)}
                        required
                        placeholder='Title'
                    />
                </label>
            </div>
            <div className='label-container'>
                <label>
                    <input
                        className='upload-label'
                        type='text'
                        value={url}
                        onChange={ e => setUrl(e.target.value)}
                        required
                        placeholder='Photo URL'
                    />
                </label>
            </div>
            <div className='label-container'>
                <label>
                    <input
                        className='upload-label'
                        type='text'
                        value={description}
                        onChange={ e => setDescription(e.target.value)}
                        required
                        placeholder='Photo description'
                    />
                </label>
            </div>
            <div className='label-container'>
                <label> Date Taken
                    <input
                        className='upload-label'
                        type='date'
                        value={dateTaken}
                        onChange={ e => setDateTaken(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type='submit'>Upload</button>
            <Link to='/'>Cancel</Link>
        </form>
    )
}

export default AddPhoto
