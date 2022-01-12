import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
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
    const workingPhoto = all.find(one => one.id === +id)

    useEffect(() => {
        dispatch(getAllPhotos())
        dispatch(sessionActions.restore())
    }, [dispatch])

    let dateTook = '';

    if(workingPhoto?.dateTaken) {
        dateTook = workingPhoto.dateTaken.toString().slice(0, 10)
    }

    const [titleLoading, setTitleLoading] = useState(workingPhoto?.title)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState(workingPhoto?.description)
    const [dateTaken, setDateTaken] = useState(dateTook)

    const [errors, setErrors] = useState([])

    useEffect(() => {
        let errs = []
        if (!title) {
            errs.push('You need a title.')
        }
        if (!description) {
            errs.push('You need to tell us about your chonk.')
        }
        if(!dateTaken) {
            errs.push('You need a valid date.')
        }

        setErrors(errs)

    }, [title, description, dateTaken])

    useEffect(() => {
        if(!title) {
            setTitle(workingPhoto?.title)
        }
        if(!description) {
            setDescription(workingPhoto?.description)
        }
        if(!dateTaken) {
            setDateTaken(dateTook)
        }
    }, [workingPhoto])

    function stringDate(date) {
        return date.slice(0,10)
    }


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

    if (!workingPhoto) {
        return (
            <p className='nope'>Nope. There's nothing here.</p>
        )
    }

    return (
        <div className='edit-form-main'>
            <form className='edit-form' onSubmit={handleEdits}>
                <p className='edit-title'>Edit Your Chonkr</p>
                <div className='label-container'>
                    <label>
                        <input
                            className='edit-label'
                            type='text'
                            value={title}
                            onChange={ e => setTitle(e.target.value)}

                        />
                    </label>
                </div>
                <div className='label-container'>
                    <label>
                        <textarea
                            className='edit-label'
                            type='text'
                            rows='5'
                            value={description}
                            onChange={ e => setDescription(e.target.value)}

                        />
                    </label>
                </div>
                <div className='label-container'>
                    <label className='edit-label-area'> Date Taken
                        <input
                            className='edit-label edit-label-area-input'
                            type='date'
                            value={dateTaken}
                            onChange={ e => setDateTaken(e.target.value)}

                        />
                    </label>
                </div>
                <div className='edit-photo'>
                    <button type='submit'>Update</button>
                </div>
                <div className='edit-photo'>
                    <Link className='edit-cancel' to={`/photos/${workingPhoto.id}`}>Cancel</Link>
                </div>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </form>
        </div>
    )
}

export default EditPhoto
