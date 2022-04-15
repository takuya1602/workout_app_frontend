import React, { useEffect, useState, useRef } from "react"
import Ionicons from "react-native-vector-icons/Ionicons"
import DialogInput from 'react-native-dialog-input'
import { ActivityIndicator, ScrollView, Text, View, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { get_exercise } from "../../store/actions/exercise"
import { API_URL } from "@env"
import tw from "twrnc"
import Swipeable from 'react-native-gesture-handler/Swipeable'

const ExerciseScreen = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const targetId = route.params.targetId
    const targetName = route.params.targetName
    const exercise = useSelector((state) => state.exercise.exercise)

    const selectedExerciseId = useRef()

    useEffect(() => {
        const fn = async () => {
            if (dispatch && dispatch !== null && dispatch !== undefined) {
                await dispatch(get_exercise())
            }
        }
        fn()
    }, [dispatch])
    const [isDialogVisible, setIsDialogVisible] = useState(false)

    const selectExercise = (id) => {
        navigation.navigate("ExerciseDetailScreen", {
            exerciseId: id
        })
    }

    const postExercise = async (inputExercise) => {
        try {
            const config = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: inputExercise,
                    target: targetId,
                }),
            }
            const postResponse = await fetch(`${API_URL}/exercises/`, config)
            await dispatch(get_exercise())
            return postResponse
        } catch (err) {
            return err
        }
    }

    const deleteExercise = async () => {
        try {
            await fetch(`${API_URL}/exercises/${selectedExerciseId.current}`, {
                method: "DELETE",
            })
        } catch (err) {
            return err
        }
        await dispatch(get_exercise())
        console.log(`deleteExercise(${selectedExerciseId.current}) is called.`)
    }

    const RightActions = (progress, dragX) => {
        return (
            <TouchableOpacity
                style={tw`border rounded p-5 border-gray-300 bg-red-600 mb-2`}
                onPress={() => deleteExercise()}
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
                exercise ? (
                    <View style={tw`flex-1`}>
                        <ScrollView style={tw`bg-gray-100 p-2`}>
                            {exercise
                                .filter((item) => item.target === targetId)
                                .map((item) => {
                                    return (
                                        <Swipeable
                                            onSwipeableOpen={() => {
                                                selectedExerciseId.current = item.id
                                            }}
                                            renderRightActions={RightActions}
                                            key={item.id}
                                        >
                                            <TouchableOpacity
                                                style={tw`border rounded p-5 border-gray-300 bg-white mb-2`}
                                                onPress={() => {
                                                    console.log(`item.id: ${item.id}`)
                                                    selectExercise(item.id)
                                                }}
                                            >
                                                <Text style={tw`font-bold text-xl mb-2 text-center`}>{item.name}</Text>
                                            </TouchableOpacity>
                                        </Swipeable>
                                    )
                                })}
                        </ScrollView>
                        <TouchableOpacity
                            style={tw`absolute bottom-5 right-5`}
                            onPress={() => {
                                //navigation.navigate("ExerciseCreateScreen")
                                //addExercise(targetId)
                                setIsDialogVisible(true)
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
            <DialogInput
                isDialogVisible={isDialogVisible}
                title="種目を追加"
                message={`「${targetName}」の種目を追加して下さい。`}
                cancelText="キャンセル"
                submitText="追加"
                submitInput={(inputText) => {
                    postExercise(inputText)
                    setIsDialogVisible(false)
                }}
                closeDialog={() => setIsDialogVisible(false)}
            >

            </DialogInput>
        </>
    )
}

export default ExerciseScreen