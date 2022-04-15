import { createStackNavigator } from "@react-navigation/stack";
import ExerciseScreen from "../screens/exercise/ExerciseScreen";
import ExerciseDetailScreen from "../screens/exercise/ExerciseDetailScreen";
import ExerciseTargetScreen from "../screens/exercise/ExerciseTargetScreen";

const Stack = createStackNavigator()

export const ExerciseNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ExerciseTargetScreen"
                component={ExerciseTargetScreen}
                options={{
                    headerTitle: "部位一覧",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#FDE047",
                    },
                    headerTintColor: "black",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
            <Stack.Screen
                name="ExerciseScreen"
                component={ExerciseScreen}
                options={{
                    headerTitle: "種目一覧",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#FDE047",
                    },
                    headerTintColor: "black",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
            <Stack.Screen
                name="ExerciseDetailScreen"
                component={ExerciseDetailScreen}
                options={{
                    headerTitle: "種目詳細",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#FDE047"
                    },
                    headerTintColor: "black",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    },
                }}
            />
        </Stack.Navigator>
    )
}