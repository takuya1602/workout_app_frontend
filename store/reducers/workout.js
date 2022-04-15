import {
    // workout一覧取得
    GET_WORKOUT_SUCCESS,
    GET_WORKOUT_FAIL,

    // Workout詳細取得
    GET_WORKOUT_DETAIL_SUCCESS,
    GET_WORKOUT_DETAIL_FAIL,

    // 読み込み中
    SET_WORKOUT_LOADING,
    REMOVE_WORKOUT_LOADING,
} from "../actions/types"

const initialState = {
    loading: false,
    workout: null,
    workout_detail: null,
}

const workoutReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        // workout一覧取得
        case GET_WORKOUT_SUCCESS:
            console.log("workout: payload")
            return {
                ...state,
                workout: payload,
            }
        case GET_WORKOUT_FAIL:
            return {
                ...state,
            }

        // workout詳細取得
        case GET_WORKOUT_DETAIL_SUCCESS:
            console.log("workout_detail: payload")
            return {
                ...state,
                workout_detail: payload,
            }
        case GET_WORKOUT_DETAIL_FAIL:
            return {
                ...state,
            }

        // 読み込み中
        case SET_WORKOUT_LOADING:
            return {
                ...state,
                loading: true,
            }
        case REMOVE_WORKOUT_LOADING:
            return {
                ...state,
                loading: false,
            }

        default:
            return state
    }
}

export default workoutReducer