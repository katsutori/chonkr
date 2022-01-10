import { csrfFetch } from "./csrf"

const LOAD_PHOTOS = 'photos/LOAD'
const UPLOAD_PHOTO = 'photos/UPLOAD'
const REMOVE_PHOTO = 'photos/REMOVE'
const UPDATE_PHOTO = 'photos/UPDATE'


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

export const deletePhoto = removedPhoto => {
    return {
        type: REMOVE_PHOTO,
        removedPhoto
    }
}

export const updatePhoto = updatedPhoto => {
    return {
        type: UPDATE_PHOTO,
        updatedPhoto
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

export const updatingPhoto = photo => async dispatch => {
    console.log('here is your photo', photo)
    const response = await csrfFetch(`/api/photos/${photo.id}`, {
        method: 'PATCH',
        body: JSON.stringify(photo)
    })

    if(response.ok) {
        const updatedPhoto = await response.json()
        dispatch(updatePhoto(updatedPhoto))
        return updatedPhoto
    }
}

export const deletedPhoto = photo => async dispatch => {
    const response = await csrfFetch(`/api/photos/${photo}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deleted = await response.json()
        dispatch(deletePhoto(deleted))
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
        case REMOVE_PHOTO:
            newState = { ...state }
            delete newState[action.removedPhoto]
            return newState
        case UPDATE_PHOTO:
            return { ...state, [action.updatedPhoto.id]: action.id}

        default:
            return state;
    }

}

export default photoReducer
