import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import * as sessionActions from '../../../store/session'

import { updatingAlbum } from '../../../store/album'
import { getUserAlbums } from '../../../store/album'
import Albums from '../Albums'
import favicon from '../../../img/favicon.png'
import './EditAlbum.css'

function EditAlbum({albums}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const sessionUser = useSelector(state => state.session.user)
    const all = useSelector(state => state.albumState.entries)
    const userId = sessionUser.id
    const workingAlbum = all.find(one => one.id === +id)

    useEffect(() => {
        dispatch(getUserAlbums(id))
        dispatch(sessionActions.restore())
    }, [dispatch])

    useEffect(() => {
        if(!name) {
            setName(workingAlbum?.name)
        }
    }, [workingAlbum])

    const [name, setName] = useState(workingAlbum?.name)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        let errs = []
        if(!name) {
            errs.push('Your album needs a name!')
        }
        setErrors(errs)
    }, [name])

    const handleEdits = async (e) => {
        e.preventDefault()

        const payload = {
            id,
            name
        }

        const updateThisAlbum = await dispatch(updatingAlbum(payload))
        history.push(`/albums/${id}`)
    }

    if(!workingAlbum) {
        return (
            <p className='nope'>Nope. There's nothing here.</p>
        )
    }

    if(userId !== workingAlbum?.userId) {
        return (
            <p className='nope'>This ain't your album, homie.</p>
        )
    }
    return (
        <div className='edit-form-album'>
            <form className='edit-form' onSubmit={handleEdits}>
                <div className='login-logo'><img src={favicon}/></div>
                <p className='edit-title'>Edit Your Album</p>
                <div className='label-container'>
                    <label>
                        <input
                            className='edit-label'
                            type='text'
                            value={name}
                            onChange={ e => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div className='edit-photo'>
                    <button type='submit'>Update</button>
                </div>
                <div className='edit-photo'>
                    <Link className='edit-cancel' to={`/albums/${workingAlbum.id}`}>Cancel</Link>
                </div>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </form>
        </div>
    )
}

export default EditAlbum
