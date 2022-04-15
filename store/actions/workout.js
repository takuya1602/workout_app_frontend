import {
    // Workout一覧取得
    GET_WORKOUT_SUCCESS,
    GET_WORKOUT_FAIL,

    // Workout詳細取得
    GET_WORKOUT_DETAIL_SUCCESS,
    GET_WORKOUT_DETAIL_FAIL,

    // 読み込み中
    SET_WORKOUT_LOADING,
    REMOVE_WORKOUT_LOADING,
} from "./types"

import { API_URL } from "@env"

// workout一覧取得
export const get_workout = () => async (dispatch) => {
    console.log("get_workout() is called.")
    dispatch({
        type: SET_WORKOUT_LOADING,
    })

    try {
        const res = await fetch(`${API_URL}/workouts/`, {
            method: "GET",
        })

        const data = await res.json()

        if (res.status === 200) {
            dispatch({
                type: GET_WORKOUT_SUCCESS,
                payload: data
            })
        } else {
            dispatch({
                type: GET_WORKOUT_FAIL,
            })
        }
    } catch (err) {
        dispatch({
            type: GET_WORKOUT_FAIL,
        })
    }

    dispatch({
        type: REMOVE_WORKOUT_LOADING,
    })
}

export const get_workout_detail = (id) => async (dispatch) => {
    console.log("get_workout_detail() is called.")
    dispatch({
        type: SET_WORKOUT_LOADING,
    })

    try {
        const res = await fetch(`${API_URL}/workouts/${id}/`, {
            method: "GET",
        })

        const data = await res.json()

        if (res.status === 200) {
            dispatch({
                type: GET_WORKOUT_DETAIL_SUCCESS,
                payload: data,
            })
        } else {
            dispatch({
                type: GET_WORKOUT_DETAIL_FAIL,
            })
        }
    } catch (err) {
        dispatch({
            type: GET_WORKOUT_DETAIL_FAIL
        })
    }

    dispatch({
        type: REMOVE_WORKOUT_LOADING,
    })
} 