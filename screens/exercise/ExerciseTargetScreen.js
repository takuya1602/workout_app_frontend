import React, { useEffect } from "react"
import { ActivityIndicator, ScrollView, Text, View, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { get_target } from "../../store/actions/target"
import tw from "twrnc"

const ExerciseTargetScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const target = useSelector((state) => state.target.target)

    useEffect(() => {
        const fn = async () => {
            if (dispatch && dispatch !== null && dispatch !== undefined) {
                console.log("call get_target function")
                await dispatch(get_target())
            }
        }
        fn()
    }, [dispatch])
    console.log(target)

    const selectTarget = (id, name) => {
        navigation.navigate("ExerciseScreen", {
            targetId: id,
            targetName: name,
        })
    }

    return (
        <>
            {
                target ? (
                    <View style={tw`flex-1`}>
                        <ScrollView style={tw`bg-gray-100 p-2`}>
                            {target.map((item) => {
                                return (
                                    <TouchableOpacity
                                        style={tw`border rounded p-5 border-gray-300 bg-white mb-2`}
                                        onPress={() => {
                                            console.log(item.id)
                                            selectTarget(item.id, item.name)
                                        }}
                                        key={item.id}
                                    >
                                        <Text style={tw`font-bold text-xl mb-2 text-center`}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
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

export default ExerciseTargetScreen