import { csrfFetch } from "./csrf"

const LOAD_ALBUMS = 'albums/LOAD'
const ADD_ALBUM = 'albums/ADD'

export const loadAlbums = albums => {
    return {
        type: LOAD_ALBUMS,
        albums
    }
}

export const addAlbum = album => {
    return {
        type: ADD_ALBUM,
        album
    }
}

export const getUserAlbums = (id) => async dispatch => {
    if(id){
        const response = await csrfFetch(`/api/albums/users/${id}`, {
            method:'GET',
        })

        if (response.ok) {
            const albums = await response.json()
            dispatch(loadAlbums(albums))
        }
    }
}

export const addUserAlbum = (payload) => async dispatch => {

    console.log(payload)
    if(payload.userId) {
        const response = await csrfFetch(`/api/albums`, {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            const newAlbum = await response.json()
            dispatch(addAlbum(newAlbum))
            return newAlbum
        }
    }
}

const initialState = { entries: [] }

const albumReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALBUMS:
            return {...state, entries: [...action.albums]}
        case ADD_ALBUM:
            return {...state, entries: [...state.entries, action.album]}
        default:
            return state
    }
}

export default albumReducer
