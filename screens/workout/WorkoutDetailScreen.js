import React, { useEffect } from "react"
import { ActivityIndicator, ScrollView, Text, View, Button } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { get_workout_detail } from "../../store/actions/workout"
import { get_exercise } from "../../store/actions/exercise"
import tw from "twrnc"

const WorkoutDetailScreen = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const dispatch2 = useDispatch()
    const workoutId = route.params.workoutId
    const [workoutDetail, exercise] = useSelector((state) => [
        state.workout.workout_detail,
        state.exercise.exercise
    ])

    useEffect(() => {
        const fn = async () => {
            if (dispatch && dispatch !== null && dispatch !== undefined) {
                await dispatch(get_workout_detail(workoutId))
            }
        }
        fn()
    }, [dispatch])

    useEffect(() => {
        const fn = async () => {
            if (dispatch2 && dispatch2 !== null && dispatch2 !== undefined) {
                await dispatch2(get_exercise())
            }
        }
        fn()
    }, [dispatch2])

    const exerciseIdToName = (id) => {
        console.log("exerciseIdToName() is called")
        const exerciseIndex = exercise.findIndex((item) => item.id === id)
        const exerciseObj = exercise[exerciseIndex]
        return exerciseObj.name
    }

    return (
        <>
            {
                (workoutDetail && exercise) ?
                    (
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-center text-2xl font-bold my-5`}>{workoutDetail.title}</Text>
                            <ScrollView style={tw`flex-1 bg-gray-100`}>
                                {workoutDetail.sets.map((set) => {
                                    return (
                                        <View
                                            key={set.id}>
                                            <Text>{`${exerciseIdToName(set.exercise)}`}</Text>
                                            <Text>{`${set.weight}kg    ${set.reps}回`}</Text>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                            <Button
                                title="編集"
                                onPress={() => {
                                    navigation.navigate("WorkoutEditScreen", {
                                        workoutId: workoutId,
                                    })
                                }}
                            />
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

export default WorkoutDetailScreen