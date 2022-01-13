import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { uploadPhoto } from '../../../store/photos'
import { addJoin } from '../../../store/join'
import favicon from '../../../img/favicon.png'
import * as sessionActions from '../../../store/session'

import './AddPhoto.css'

function AddPhoto({albums}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [userId, setUserId] = useState()
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [dateTaken, setDateTaken] = useState('1963-11-22')
    const [albumId, setAlbumId] = useState('')
    const [errors, setErrors] = useState([])


    useEffect(() => {
        if (sessionUser.id) {
            setUserId(sessionUser.id)
        }
        if (sessionUser.user) {
            setUserId(sessionUser.user.id)
        }
    }, [])


    // useEffect(() => {
    //     let errs = [];
    //     if (!title) {
    //         errs.push('You need to provide a title.')
    //     }
    //     if (!url.includes('http')) {
    //         errs.push('You need to provide a valid image url.')
    //     }
    //     if (!description) {
    //         errs.push('You need to provide a description for your Chonkr.')
    //     }
    //     setErrors(errs)
    // }, [title, url, description, dateTaken])

    const handleUpload = async (e) => {
        e.preventDefault()

        let payload = {
            userId,
            title,
            url,
            description,
            dateTaken,
        }

        let errs = []

        const image = await dispatch(uploadPhoto(payload))
        if(image && albumId) {
            let joinPayload = {
                albumId: +albumId,
                photoId: image.id
            }

            const joining = await dispatch(addJoin(joinPayload))
        }
        if(image.errors) {
            const errList = Object.values(image.errors)
            const flat = [...errList]
            flat.map(each => errs.push(each.msg))
            setErrors(errs)
        } else { history.push(`/photos/${image.id}`) }

    }

    return (
        <div className='upload-form-main'>
            <form className='login-form' onSubmit={handleUpload}>
                <div className='login-logo'><img src={favicon}/></div>
                <p className='upload-title'>Upload Your Chonkr</p>
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
                    {albums.length? <div className='label-container'>
                        <select className='album-select' value={albumId} onChange={ e => setAlbumId(e.target.value)}>
                            <option className='upload-label-area album-option' value=''>Choose an album</option>
                            {albums?.map(album => <option className='upload-label-area album-option' key={album.id} value={album.id}>{album.name}</option>)}
                        </select>
                    </div>:<></>}
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
