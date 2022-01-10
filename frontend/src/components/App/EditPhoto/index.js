import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'


import * as sessionActions from '../../../store/session'

import { getAllPhotos } from '../../../store/photos'
import { updatingPhoto } from '../../../store/photos'
import './EditPhoto.css'

function EditPhoto() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const sessionUser = useSelector(state => state.session.user)
    const all = useSelector(state => state.photoState.entries)

    useEffect(() => {
        dispatch(getAllPhotos())
        dispatch(sessionActions.restore())
    }, [dispatch])

    const workingPhoto = all.find(one => one.id === +id)
    const [title, setTitle] = useState(workingPhoto.title)
    const [description, setDescription] = useState(workingPhoto.description)
    const [dateTaken, setDateTaken] = useState(workingPhoto.dateTaken)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        let errs = []
        if (!title) {
            errs.push('You need a title.')
        }
        if (!description) {
            errs.push('You need to tell us about your chonk.')
        }

        setErrors(errs)

    }, [title, description])

    const handleEdits = async (e) => {
        e.preventDefault()

        const payload = {
            id: workingPhoto.id,
            title,
            description,
            dateTaken
        }

        const updateThisPhoto = await dispatch(updatingPhoto(payload))
        history.push(`/photos/${id}`)

    }

    return (
        <>
            <form onSubmit={handleEdits}>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <div className='label-container'>
                    <label>
                        <input
                            type='text'
                            value={title}
                            onChange={ e => setTitle(e.target.value)}
                        />
                    </label>
                </div>
                <div className='label-container'>
                    <label>
                        <textarea
                            type='text'
                            rows='5'
                            value={description}
                            onChange={ e => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div className='label-container'>
                    <label>
                        <input
                            type='date'
                            value={dateTaken}
                            onChange={ e => setDateTaken(e.target.value)}
                        />
                    </label>
                </div>
                <button type='submit'>Update</button>
            </form>
        </>
    )
}

export default EditPhoto
