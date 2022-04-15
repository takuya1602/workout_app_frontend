import React, { useState, useRef } from "react"
import { Text, View, TextInput, Button } from "react-native"
import { API_URL } from "@env"
import ReactNativePickerModule from 'react-native-picker-module'
import tw from "twrnc"

const WorkoutCreateScreen = ({ navigation }) => {

    const pickerRef = useRef()
    const pickerRef2 = useRef()
    const selectedIndex = useRef(0)
    const [selectedTarget, setSelectedTarget] = useState()
    const [targetId, setTargetId] = useState()
    const [targetList, setTargetList] = useState([])
    const [exerciseList, setExerciseList] = useState([])
    console.log("top level re-rendering")
    const targetButtonTitle = selectedTarget ? `選択中の部位：${selectedTarget}` : "部位を選択"
    const initialState =
    {
        exercise: "種目を選択",
        weight: null,
        reps: null,
    }
    const [workoutSets, setWorkoutSets] = useState([initialState])
    console.log("declare workoutSets as state")
    const workoutSetsUp = () => {
        const newWorkoutSets = [...workoutSets, initialState]
        setWorkoutSets(newWorkoutSets)
    }
    const getTargetList = async () => {
        try {
            const res = await fetch(`${API_URL}/targets/`, {
                method: "GET",
            })
            const data = await res.json()
            setTargetList(data)
        } catch (err) {
            return err
        }
    }

    const getExerciseList = async () => {
        try {
            const res = await fetch(`${API_URL}/exercises/`, {
                method: "GET",
            })
            const data = await res.json()
            setExerciseList(data)
        } catch (err) {
            return err
        }
    }

    const exerciseToId = (value) => {
        const exerciseIndex = exerciseList.findIndex((item) => item.name === value)
        const selectedExerciseObject = exerciseList[exerciseIndex]
        return selectedExerciseObject.id
    }

    const postWorkout = async (obj) => {
        try {
            const config = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),
            }
            console.log(JSON.stringify(obj))
            const postResponse = await fetch(`${API_URL}/api/v1/workouts/`, config)
            //await dispatch(get_workout)
            navigation.navigate("WorkoutScreen")
            return postResponse
        } catch {

        }
    }

    return (
        <View>
            <Button title={targetButtonTitle} onPress={() => {
                getTargetList()
                console.log(targetList)
                pickerRef.current.show()
            }} />
            {workoutSets.map((item, index) => {
                return (
                    <View
                        style={tw`border rounded p-5 border-gray-300 bg-white mb-2 justify-center items-center`}
                        key={index}
                    >
                        <Button title={`${item.exercise}`} onPress={() => {
                            getExerciseList()
                            console.log(exerciseList)
                            selectedIndex.current = index
                            pickerRef2.current.show()
                        }} />
                        <View style={tw`flex flex-row`}>
                            <TextInput
                                style={tw`border rounded w-10 text-center`}
                                keyboardType="number-pad"
                                onChangeText={(text) => {
                                    selectedIndex.current = index
                                    workoutSets.map((set, index2) => {
                                        index2 === selectedIndex.current ? Object.assign(set, { weight: Number(text) }) : set
                                    })
                                }}
                            /><Text> kg   </Text>
                            <TextInput
                                style={tw`border rounded w-10 text-center`}
                                keyboardType="number-pad"
                                onChangeText={(text) => {
                                    selectedIndex.current = index
                                    workoutSets.map((set, index2) => {
                                        index2 === selectedIndex.current ? Object.assign(set, { reps: Number(text) }) : set
                                    })
                                }}
                            /><Text> 回</Text>
                            <Button title="削除" onPress={() => {
                                selectedIndex.current = index
                                console.log(selectedIndex.current)
                                const newWorkoutSets = [...workoutSets]
                                newWorkoutSets.splice(selectedIndex.current, 1)
                                setWorkoutSets(newWorkoutSets)
                                console.log(`remove ${selectedIndex.current}th workout set`)
                            }}
                            />
                        </View>
                    </View>
                )
            })}
            <Button title="追加" onPress={() => workoutSetsUp()}
            />
            <Button title="保存" onPress={() => {
                const postObj = {
                    title: "postAPITest",
                }
                const setObj = [...workoutSets]
                setObj.map((item) => {
                    Object.assign(item, { exercise: exerciseToId(item.exercise) })
                })
                postObj.sets = setObj
                postWorkout(postObj)
                console.log("postObj")
                console.log(JSON.stringify(postObj))
            }}
            />
            <ReactNativePickerModule
                pickerRef={pickerRef}
                value={selectedTarget}
                title={"部位を選択"}
                items={targetList.map((item) => item.name)}
                confirmButton={"決定"}
                cancelButton={"キャンセル"}
                onCancel={() => {
                    console.log("Cancelled")
                }}
                onValueChange={value => {
                    console.log("target: ", value)
                    setSelectedTarget(value)
                    const targetIndex = targetList.findIndex((item) => item.name === value)
                    const selectedTargetObject = targetList[targetIndex]
                    setTargetId(selectedTargetObject.id)
                }}
            />
            <ReactNativePickerModule
                pickerRef={pickerRef2}
                title={"種目を選択"}
                items={exerciseList
                    .filter((item) => item.target === targetId)
                    .map((item) => item.name)}
                confirmButton={"決定"}
                cancelButton={"キャンセル"}
                onCancel={() => {
                }}
                onValueChange={(value) => {
                    setWorkoutSets(
                        workoutSets.map((set, index2) => (
                            index2 === selectedIndex.current ? Object.assign(set, { exercise: value }) : set
                        ))
                    )
                }}
            />
        </View>
    )
}

export default WorkoutCreateScreen