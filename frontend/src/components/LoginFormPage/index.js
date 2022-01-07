import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './LoginForm.css'

function LoginFormPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    if (sessionUser) return (
        <Redirect to='/' />
    )

    const handleLogin = (e) =>{
        e.preventDefault()
        setErrors([])
       return dispatch(sessionActions.login({ credential, password }))
        .catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
        })
    }

    return (
        <div className='form-main'>

            <form className='login-form' onSubmit={handleLogin}>
                <div className='logo'></div>
                <div className='title'>Log in to Chonkr</div>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <div className='label-container'>
                    <label>
                        <input
                            className='login-label'
                            type='text'
                            value={credential}
                            onChange={ e => setCredential(e.target.value)}
                            required
                            placeholder='Email address or Username'
                        />
                    </label>
                </div>
                <div className='label-container'>
                    <label>
                        <input
                            className='login-label'
                            type='password'
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                            required
                            placeholder='Password'
                        />
                    </label>
                </div>
                <div className='button-container'>
                    <button type='submit'>Sign In</button>
                </div>
            </form>
        </div>
    )

}

export default LoginFormPage
