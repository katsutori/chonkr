import { csrfFetch } from "./csrf"

const LOAD_PHOTOS = 'photos/LOAD'
const UPLOAD_PHOTO = 'photos/UPLOAD'


export const loadPhotos = photos => {
    return {
        type: LOAD_PHOTOS,
        photos
    }
}

export const uploadPhotos = payload => {
    return {
        type: UPLOAD_PHOTO,
        payload
    }
}

export const getAllPhotos = () => async dispatch => {
    const response = await csrfFetch(`/api/photos`, {
        method: 'GET'
    })

    if (response.ok) {
        const photos = await response.json()
        dispatch(loadPhotos(photos))
    }
}

export const uploadPhoto = newPhoto => async dispatch => {
    console.log(newPhoto)
    const response = await csrfFetch(`/api/photos`, {
        method: 'POST',
        body: JSON.stringify(newPhoto)
    })

    if(response.ok) {
        const newUpload = await response.json()
        dispatch(uploadPhotos(newUpload))
        return newUpload
    }
}

const initialState = { entries: [] }

const photoReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PHOTOS:
            return {...state, entries: [...action.photos]}
        case UPLOAD_PHOTO:
            return {...state, entries: [...state.entries, action.payload]}
        default:
            return state;
    }

}

export default photoReducer
