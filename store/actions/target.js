import {
    GET_TARGET_SUCCESS,
    GET_TARGET_FAIL,

    SET_TARGET_LOADING,
    REMOVE_TARGET_LOADING,
} from "./types"

import { API_URL } from "@env"

export const get_target = () => async (dispatch) => {
    console.log("get_target() is called.")
    console.log(`${API_URL}`)
    dispatch({
        type: SET_TARGET_LOADING,
    })

    try {
        const res = await fetch(`${API_URL}/targets/`, {
            method: "GET",
        })
        const data = await res.json()
        console.log("fetch target list API")

        if (res.status === 200) {
            dispatch({
                type: GET_TARGET_SUCCESS,
                payload: data,
            })
        } else {
            dispatch({
                type: GET_TARGET_FAIL,
            })
        }
    } catch (err) {
        dispatch({
            type: GET_TARGET_FAIL,
        })
    }
    dispatch({
        type: REMOVE_TARGET_LOADING,
    })
}