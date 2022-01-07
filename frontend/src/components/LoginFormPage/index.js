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
        <form onSubmit={handleLogin}>
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
            <div>
                <label>
                    Enter your Username or Email
                    <input
                        type='text'
                        value={credential}
                        onChange={ e => setCredential(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Enter your Password
                    <input
                        type='password'
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type='submit'>Login</button>
        </form>
    )

}

export default LoginFormPage
