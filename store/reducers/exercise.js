import {
    // Exercise一覧取得
    GET_EXERCISE_SUCCESS,
    GET_EXERCISE_FAIL,

    // Exercise読み込み中
    SET_EXERCISE_LOADING,
    REMOVE_EXERCISE_LOADING,
} from "../actions/types"

const initialState = {
    loading: false,
    exercise: null,
}

const exerciseReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_EXERCISE_SUCCESS:
            console.log("exercise: payload")
            return {
                ...state,
                exercise: payload, // 初回はここでnullからpayloadへ
            }
        case GET_EXERCISE_FAIL:
            return {
                ...state,
            }
        case SET_EXERCISE_LOADING:
            return {
                ...state,
                loading: true,
            }
        case REMOVE_EXERCISE_LOADING:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default exerciseReducer