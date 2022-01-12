import { csrfFetch } from "./csrf"

const CREATE_JOIN = '/join/ADD'

export const createJoin = join => {
    return {
        type: CREATE_JOIN,
        join
    }
}

export const addJoin = (payload) => async dispatch => {
    if(payload.photoId) {
        const response = await csrfFetch(`/api/join`, {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            const joined = await response.json()
            dispatch(createJoin(joined))
        }
    }
}

const initialSate = { entries: [] }

const joinReducer = ( state = initialSate, action) => {
    let newState;
    switch (action.type) {
        case CREATE_JOIN:
            return {...state, entries: [...state.entries, action.join]}
        default:
            return state
    }
}

export default joinReducer
