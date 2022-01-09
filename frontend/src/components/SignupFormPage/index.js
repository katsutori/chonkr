import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import favicon from '../../img/favicon.png'
import './SignupForm.css'

function SignupFormPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password === confirmPassword) {
            setErrors([])

            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors);
                })

        }

        return setErrors(['Confirm Password field must be the same as the Password field.'])
    }

    return (
        <div className='form-main-signup'>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='login-logo'><img src={favicon}/></div>
                <div className='title'>Sign up for Chonkr</div>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <div className='label-container'>
                    <label>
                        <input
                            className='login-label'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Email'
                        />
                    </label>
                </div>
                <div className='label-container'>
                    <label>
                        <input
                            className='login-label'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder='Username'
                        />
                    </label>
                </div>
                <div className='label-container'>
                    <label>
                        <input
                            className='login-label'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password'
                        />
                    </label>
                </div>
                <div className='label-container'>
                    <label>
                        <input
                            className='login-label'
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder='Confirm Password'
                        />
                    </label>
                </div>
                <div className='button-container'>
                    <button type='submit'>Sign Up</button>
                </div>
                {/* <div className='sign-up'><div className='i-need-a-damn-space'>Already a Chonkr member?</div> <a className='sign-up-link' href='/signup'> Log in here.</a></div> */}
                <div className='sign-up'><div className='i-need-a-damn-space'>Already a Chonkr member?</div> <Link className='sign-up-link' to='/login'> Log in here.</Link></div>
            </form>
        </div>
    )
}


export default SignupFormPage
