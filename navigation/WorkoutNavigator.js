import { createStackNavigator } from "@react-navigation/stack";
import WorkoutScreen from "../screens/workout/WorkoutScreen"
import WorkoutDetailScreen from "../screens/workout/WorkoutDetailScreen"
import WorkoutCreateScreen from "../screens/workout/WorkoutCreateScreen"
import WorkoutEditScreen from "../screens/workout/WorkoutEditScreen";

const Stack = createStackNavigator()

export const WorkoutNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WorkoutScreen"
                component={WorkoutScreen}
                options={{
                    headerTitle: "Workout",
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
                name="WorkoutDetailScreen"
                component={WorkoutDetailScreen}
                options={{
                    headerTitle: "Workout詳細",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#FDE047",
                    },
                    headerTintColor: "black",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }} />
            <Stack.Screen
                name="WorkoutCreateScreen"
                component={WorkoutCreateScreen}
                options={{
                    headerTitle: "新規Workout",
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
                name="WorkoutEditScreen"
                component={WorkoutEditScreen}
                options={{
                    headerTitle: "Workoutを編集",
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
        </Stack.Navigator>
    )
}