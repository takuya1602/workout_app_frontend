import {
  GET_EXERCISE_SUCCESS,
  GET_EXERCISE_FAIL,

  SET_EXERCISE_LOADING,
  REMOVE_EXERCISE_LOADING,
} from "./types"

import { API_URL } from "@env"

export const get_exercise = () => async (dispatch) => {
  console.log("get_exercise() is called.")
  dispatch({
    type: SET_EXERCISE_LOADING,
  })

  try {
    const res = await fetch(`${API_URL}/exercises/`, {
      method: "GET",
    })
    const data = await res.json()

    if (res.status === 200) {
      dispatch({
        type: GET_EXERCISE_SUCCESS,
        payload: data
      })
    } else {
      dispatch({
        type: GET_EXERCISE_FAIL,
      })
    }
  } catch (err) {
    dispatch({
      type: GET_EXERCISE_FAIL,
    })
  }
  dispatch({
    type: REMOVE_EXERCISE_LOADING,
  })
}