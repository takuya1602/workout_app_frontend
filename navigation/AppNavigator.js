import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../screens/home/HomeScreen"
import { ExerciseNavigator } from "./ExerciseNavigator"
import { WorkoutNavigator } from "./WorkoutNavigator"
import Ionicons from "react-native-vector-icons/Ionicons"
import { SafeArea } from "../components/SafeArea"

const BottomTab = createBottomTabNavigator()

const AppNavigator = () => {
    return (
        <SafeArea>
            <NavigationContainer>
                <BottomTab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName
                            if (route.name === "HomeScreen") {
                                iconName = focused ? "home" : "home-outline"
                            } else if (route.name === "WorkoutNavigator") {
                                iconName = focused ? "document-text" : "document-text-outline"
                            } else if (route.name === "ExerciseNavigator") {
                                iconName = focused ? "bar-chart" : "bar-chart-outline"
                            }
                            return <Ionicons name={iconName} size={size} color={color} />
                        },
                        tabBarActiveTintColor: "black",
                        tabBarInactiveTintColor: "black",
                    })}>
                    <BottomTab.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{
                            title: "Home",
                            headerTitle: "Home",
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
                    <BottomTab.Screen
                        name="WorkoutNavigator"
                        component={WorkoutNavigator}
                        options={{
                            title: "Workout",
                            headerShown: false
                        }}
                    />
                    <BottomTab.Screen
                        name="ExerciseNavigator"
                        component={ExerciseNavigator}
                        options={{
                            title: "Report",
                            headerShown: false
                        }}
                    />
                </BottomTab.Navigator>
            </NavigationContainer>
        </SafeArea>
    )
}

export default AppNavigator