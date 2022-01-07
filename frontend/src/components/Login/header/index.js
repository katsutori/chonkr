import './login-header.css'
import logo from '../../../img/logo.png'

function LogPageHeader() {
    return (
        <div className='main'>
            <div className='logo'>
                <a href='/'><img className='logo-image' src={logo} /></a>
            </div>
        </div>
    )
}

export default LogPageHeader
