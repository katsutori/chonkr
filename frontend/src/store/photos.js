const LOAD_PHOTOS = 'photos/LOAD'

export const loadPhotos = photos => {
    return {
        type: LOAD_PHOTOS,
        photos
    }
}

export const getAllPhotos = () => async dispatch => {
    const response = await fetch(`/api/photos`)

    if (response.ok) {
        const photos = await response.json()
        dispatch(loadPhotos(photos))
    }
}

const initialState = { photos: [] }

const photoReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PHOTOS:
            return {...state, entries: [...action.photos]}
        default:
            return state;
    }

}

export default photoReducer
