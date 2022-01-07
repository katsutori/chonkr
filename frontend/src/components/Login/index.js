import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, StaticRouter } from "react-router-dom";
import LogPageHeader from "./header";
import SplashNavigation from "../SplashPageNavigation";
import LoginFormPage from '../LoginFormPage'
import SignUpFormPage from '../SignupFormPage'
import Footer from "../Footer";
import './Login.css'

function LoginPage({page}) {
    const [form, setForm] = useState(page)
    const sessionUser = useSelector(state => state.session.user)

    if(sessionUser) return (
        <Redirect to='/' />
    )

    if (page === 'login') {
        return (
            <div className='login-container'>
                <LogPageHeader />
                <LoginFormPage />
                <Footer />
            </div>
        )
    }

    else if (page === 'signup') {
        return (
            <div className='login-container'>
                <LogPageHeader />
                <SignUpFormPage />
                <Footer />
            </div>
        )
    }
}


export default LoginPage
