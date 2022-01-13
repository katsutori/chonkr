import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { addUserAlbum } from '../../../store/album'
import * as sessionActions from '../../../store/session'

import favicon from '../../../img/favicon.png'
import './AddAlbum.css'

function AddAlbum() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(sessionActions.restore())
    }, [dispatch])

    useEffect(() => {
        let errs = []

        if(!name) {
            errs.push('You need an album name!')
        }

        setErrors(errs)
    }, [name])

    const handleNewAlbum = async (e) => {
        e.preventDefault()

        let userId;

        let payload = {
            name,
            userId: sessionUser.id
        }

        const album = await dispatch(addUserAlbum(payload))
        if(album) {
            history.push('/albums')
        }
    }

    return (
        <div className='album-form-main'>
            <form className='login-form' onSubmit={handleNewAlbum}>
                <div className='login-logo'><img src={favicon}/></div>
                <p className='upload-title'>Create an Album</p>
                    <div className='label-container'>
                        <label>
                            <input
                                className='upload-label'
                                type='text'
                                value={name}
                                onChange={ e => setName(e.target.value)}
                                required
                                placeholder='Album Name'
                            />
                        </label>
                    </div>
                    <div className='upload-photo'>
                        <button type='submit'>Create Album</button>
                    </div>
                    <div className='upload-photo'>
                        <Link className='upload-cancel' to='/albums'>Cancel</Link>
                    </div>
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
            </form>
        </div>
    )
}

export default AddAlbum
