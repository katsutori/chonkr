import { csrfFetch } from './csrf'

const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'
const ADD_USER = 'session/addUser'

const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

// const addUser = (payload) => {
//     return {
//         type: ADD_USER,
//         payload
//     }
// }

export const login = (user) => async (dispatch) => {
    const { credential, password } = user
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })
    const data = await response.json()
    dispatch(setUser(data))
    return response
}

export const signup = (payload) => async (dispatch) => {
    const { email, password, username } = payload
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            username
        })
    })
    const newUser = await response.json()
    dispatch(setUser(newUser))
    return response
}

export const restore = () => async (dispatch) => {
    const response = await csrfFetch('/api/session')

    const retrieved = await response.json()
    dispatch(setUser(retrieved.user))
    return response
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    })

    dispatch(removeUser())
    return response
}

const initialState = { user: null}

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state)
            newState.user = action.user
            return newState
        case REMOVE_USER:
            newState = Object.assign({}, state)
            newState.user = null
            return newState
        default:
            return state
    }
}

export default sessionReducer
