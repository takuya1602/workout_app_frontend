import React, { useEffect, useState, useRef } from "react"
import Ionicons from "react-native-vector-icons/Ionicons"
import { ActivityIndicator, ScrollView, Text, View, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { get_workout } from "../../store/actions/workout"
import tw from "twrnc"
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { API_URL } from "@env"

const WorkoutScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const workout = useSelector((state) => state.workout.workout)

    const selectedWorkoutId = useRef()

    useEffect(() => {
        const fn = async () => {
            if (dispatch && dispatch !== null && dispatch !== undefined) {
                await dispatch(get_workout())
            }
        }
        fn()
    }, [dispatch])

    const selectWorkout = (id) => {
        navigation.navigate("WorkoutDetailScreen", {
            workoutId: id,
        })
    }

    const createWorkout = () => {
        navigation.navigate("WorkoutCreateScreen")
    }

    const deleteWorkout = async () => {
        try {
            await fetch(`${API_URL}/workouts/${selectedWorkoutId.current}`, {
                method: "DELETE",
            })
        } catch (err) {
            return err
        }
        await dispatch(get_workout())
        console.log(`deleteWorkout(${selectedWorkoutId.current}) is called.`)
    }

    const RightActions = (progress, dragX) => {
        return (
            <TouchableOpacity
                style={tw`border rounded p-5 border-gray-300 bg-red-600 mb-2`}
                onPress={() => deleteWorkout()}
            >
                <View>
                    <Text>削除</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            {
                workout ? (
                    <View style={tw`flex-1`}>
                        <ScrollView style={tw`bg-gray-100 p-2`}>
                            {workout.map((item) => {
                                return (
                                    <Swipeable
                                        onSwipeableOpen={() => {
                                            selectedWorkoutId.current = item.id
                                        }}
                                        renderRightActions={RightActions}
                                        key={item.id}
                                    >
                                        <TouchableOpacity
                                            style={tw`border rounded p-5 border-gray-300 bg-white mb-2`}
                                            onPress={() => {
                                                selectWorkout(item.id)
                                            }}
                                        >
                                            <Text style={tw`font-bold text-xl mb-2 text-center`}>{item.title}</Text>
                                        </TouchableOpacity>
                                    </Swipeable>
                                )
                            })}
                        </ScrollView>
                        <TouchableOpacity
                            style={tw`absolute bottom-5 right-5`}
                            onPress={() => {
                                createWorkout()
                            }}
                        >
                            <Ionicons name="add-circle-sharp" size={30} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={tw`flex-1 justify-center items-center`}>
                        <ActivityIndicator size="large" color="orange" />
                    </View>
                )
            }
        </>
    )
}

export default WorkoutScreen