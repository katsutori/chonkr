import { csrfFetch } from "./csrf"
import photoReducer from "./photos"

const LOAD_ALBUMS = 'albums/LOAD'

export const loadAlbums = albums => {
    return {
        type: LOAD_ALBUMS,
        albums
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

const initialState = { entries: [] }

const albumReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALBUMS:
            return {...state, entries: [...action.albums]}
        default:
            return state
    }
}

export default albumReducer
