import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import { Provider } from "react-redux"
import AppNavigator from "./navigation/AppNavigator"
import workoutReducer from "./store/reducers/workout"
import exerciseReducer from "./store/reducers/exercise"
import targetReducer from "./store/reducers/target"
import thunk from "redux-thunk"



const rootReducer = combineReducers({
  workout: workoutReducer,
  target: targetReducer,
  exercise: exerciseReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}