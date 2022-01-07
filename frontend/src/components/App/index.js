import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as sessionActions from '../../store/session'

function HomeApp() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    if(!sessionUser) return (
        <Redirect to='/welcome' />
    )

    const handleLogout = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.logout())

    }

    return (
        <div>
            <h1>You are logged in</h1>
            <form onSubmit={handleLogout}>
                <button type='submit'>Logout</button>
            </form>
        </div>
    )
}

export default HomeApp
