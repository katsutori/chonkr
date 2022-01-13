import { csrfFetch } from "./csrf"

const LOAD_ALBUMS = 'albums/LOAD'
const ADD_ALBUM = 'albums/ADD'
const REMOVE_ALBUM = 'albums/REMOVE'
const UPDATE_ALBUM = 'albums/UPDATE'

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

export const deleteAlbum = removedAlbum => {
    return {
        type: REMOVE_ALBUM,
        removedAlbum
    }
}

export const updateAlbum = updatedAlbum => {
    return {
        type: UPDATE_ALBUM,
        updatedAlbum
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

export const updatingAlbum = album => async dispatch => {
    const response = await csrfFetch(`/api/photos/${album.id}`, {
        method: 'PATCH',
        body: JSON.stringify(album)
    })

    if(response.ok) {
        const updatedAlbum = await response.json()
        dispatch(updateAlbum(updatedAlbum))
        return updatedAlbum
    }

}

export const deletedAlbum = album => async dispatch => {
    const response = await csrfFetch(`/api/albums/${album}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deleted = await response.json()
        dispatch(deleteAlbum(deleted))
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
        case REMOVE_ALBUM:
            newState = { ...state }
            delete newState[action.removedAlbum]
            return newState
        case UPDATE_ALBUM:
            return { ...state, [action.updatedAlbum.id]: action.id}
        default:
            return state
    }
}

export default albumReducer
