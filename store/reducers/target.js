import {
    GET_TARGET_SUCCESS,
    GET_TARGET_FAIL,

    SET_TARGET_LOADING,
    REMOVE_TARGET_LOADING,
} from "../actions/types"

const initialState = {
    loading: false,
    target: null,
}

const targetReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_TARGET_SUCCESS:
            return {
                ...state,
                target: payload,
            }
        case GET_TARGET_FAIL:
            return {
                ...state,
            }
        case SET_TARGET_LOADING:
            return {
                ...state,
                loading: true,
            }
        case REMOVE_TARGET_LOADING:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default targetReducer