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
    const [userId, setUserId] = useState()
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [dateTaken, setDateTaken] = useState(new Date())
    const [errors, setErrors] = useState([])


    useEffect(() => {
        if (sessionUser.id) {
            setUserId(sessionUser.id)
        }
        if (sessionUser.user) {
            setUserId(sessionUser.user.id)
        }
    }, [])

    useEffect(() => {
        let errs = [];
        if (!title) {
            errs.push('You need to provide a title.')
        }
        if (!url.includes('http')) {
            errs.push('You need to provide a valid image url.')
        }
        if (!description) {
            errs.push('You need to provide a description for your Chonkr.')
        }
        setErrors(errs)
    }, [title, url, description, dateTaken])

    const handleUpload = async (e) => {
        e.preventDefault()

        let payload = {
            userId,
            title,
            url,
            description,
            dateTaken
        }

        console.log(payload)

        const image = await dispatch(uploadPhoto(payload))

        history.push(`/photos/${image.id}`)

    }

    return (
        <div className='upload-form-main'>
            <form className='login-form' onSubmit={handleUpload}>

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
                    <label className='upload-label-area'> Date Taken
                        <input
                            className='upload-label upload-label-area-input'
                            type='date'
                            value={dateTaken}
                            onChange={ e => setDateTaken(e.target.value)}
                        />
                    </label>
                </div>
                <div className='upload-photo'>
                    <button type='submit'>Upload</button>
                </div>
                <div className='upload-photo'>
                    <Link className='upload-cancel' to='/'>Cancel</Link>
                </div>

                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </form>
        </div>
    )
}

export default AddPhoto
