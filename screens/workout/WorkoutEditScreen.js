import { ActivityIndicator, View, Text, Button } from "react-native"
import React, { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { get_exercise } from "../../store/actions/exercise"
import { get_target } from "../../store/actions/target"
import { get_workout_detail } from "../../store/actions/workout"
import ReactNativePickerModule from 'react-native-picker-module'
import tw from "twrnc"
import { TextInput } from "react-native-gesture-handler"

const WorkoutEditScreen = ({ route }) => {
    const dispatch = useDispatch()
    const dispatch2 = useDispatch()
    const dispatch3 = useDispatch()
    const [targets, exercises, workoutDetail] = useSelector((state) => [
        state.target.target,
        state.exercise.exercise,
        state.workout.workout_detail,
    ])
    const pickerRef = useRef()
    const pickerRef2 = useRef()
    const selectedSetIndex = useRef()
    const [selectedTarget, setSelectedTarget] = useState()
    const [selectedTargetId, setSelectedTargetId] = useState()
    const [editedWorkoutSets, setEditedWorkoutSets] = useState([...workoutDetail.sets])
    const targetButtonTitle = selectedTarget ? `選択中の部位：${selectedTarget}` : "部位を選択"

    useEffect(() => {
        const fn = async () => {
            if (dispatch && dispatch !== null && dispatch !== undefined) {
                await dispatch(get_target())
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

    useEffect(() => {
        const fn = async () => {
            if (dispatch3 && dispatch3 !== null && dispatch3 !== undefined) {
                await dispatch3(get_workout_detail(route.params.workoutId))
            }
        }
        fn()
    }, [dispatch3])

    const exerciseIdToName = (id) => { // 再利用。funcディレクトリにまとめた方が良いかも。
        const exerciseIndex = exercises.findIndex((item) => item.id === id)
        const exerciseObj = exercises[exerciseIndex]
        return exerciseObj.name
    }

    const exerciseNameToId = (exerciseName) => {
        const exerciseIndex = exercises.findIndex((item) => item.name === exerciseName)
        const exerciseObject = exercises[exerciseIndex]
        return exerciseObject.id
    }

    const targetNametoId = (target) => {
        const targetIndex = targets.findIndex((item) => item.name === target)
        const targetObject = targets[targetIndex]
        return targetObject.id
    }

    const saveEditedWorkout = () => {

    }

    return (
        (exercises && targets) ? (
            < View >
                <Text>title</Text>
                <Button
                    title={targetButtonTitle}
                    onPress={() => pickerRef.current.show()}
                />
                {
                    editedWorkoutSets.map((set, index) => {
                        return (
                            <View
                                style={tw`border rounded p-5 border-gray-300 bg-white mb-2 justify-center items-center`}
                                key={set.index}
                            >
                                <Button
                                    title={exerciseIdToName(set.exercise)}
                                    onPress={() => {
                                        console.log("title is rendering")
                                        selectedSetIndex.current = index
                                        pickerRef2.current.show()
                                    }}
                                />
                                <View style={tw`flex flex-row`}>
                                    <TextInput
                                        style={tw`border rounded w-10 text-center`}
                                        keyboardType="number-pad"
                                        defaultValue={`${set.weight}`}
                                        onChangeText={(text) => {
                                            selectedSetIndex.current = index
                                            editedWorkoutSets.map((item, index2) => {
                                                index2 === selectedSetIndex.current ? (
                                                    Object.assign(item, { weight: Number(text) })
                                                ) : item
                                            })
                                        }}
                                    /><Text> kg   </Text>
                                    <TextInput
                                        style={tw`border rounded w-10 text-center`}
                                        keyboardType="number-pad"
                                        defaultValue={`${set.reps}`}
                                        onChangeText={(text) => {
                                            selectedSetIndex.current = index
                                            editedWorkoutSets.map((item, index2) =>
                                                index2 === selectedSetIndex.current ? (
                                                    Object.assign(item, { reps: Number(text) })
                                                ) : item
                                            )
                                        }}
                                    /><Text> 回</Text>
                                </View>
                            </View>

                        )
                    })
                }
                <Button
                    title="保存"
                    onPress={() => saveEditedWorkout()}
                />
                <ReactNativePickerModule
                    pickerRef={pickerRef}
                    value={selectedTarget}
                    title={"部位を選択"}
                    items={targets.map((item) => item.name)}
                    confirmButton={"決定"}
                    cancelButton={"キャンセル"}
                    onValueChange={value => {
                        setSelectedTarget(value)
                        setSelectedTargetId(targetNametoId(value))
                    }}
                />
                <ReactNativePickerModule
                    pickerRef={pickerRef2}
                    title={"種目を選択"}
                    items={exercises
                        .filter((item) => item.target === selectedTargetId)
                        .map((item) => item.name)}
                    confirmButton={"決定"}
                    cancelButton={"キャンセル"}
                    onValueChange={(value) => {
                        const newWorkoutSets = [...editedWorkoutSets]
                        newWorkoutSets.map((item, index) =>
                            index === selectedSetIndex.current ? (
                                Object.assign(item, { exercise: exerciseNameToId(value) })
                            ) : item
                        )
                        console.log("Object.is() is called")
                        console.log(Object.is(editedWorkoutSets, newWorkoutSets))
                        setEditedWorkoutSets(newWorkoutSets)
                    }}
                />
            </View >
        ) : (
            <View style={tw`flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" color="orange" />
            </View>
        )
    )
}

export default WorkoutEditScreen