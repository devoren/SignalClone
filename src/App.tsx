import { NavigationContainer } from "@react-navigation/native";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import ForgotPassword from "./screens/Authentication/ForgotPassword";
import Otp from "./screens/Authentication/Otp";
import SignIn from "./screens/Authentication/SignIn";
import SignUp from "./screens/Authentication/SignUp";
import { Provider } from "react-redux";
import RootReducer from "src/reducers";
import { COLOR } from "./styles";
import Home from "./screens/Home/Home";
import AddChatScreen from "./screens/AddChatScreen/AddChatScreen";
import ChatScreen from "./screens/ChatScreen/ChatScreen";

const Stack = createStackNavigator();

const App = () => {
	const globalScreenOptions = {
		headerStyle: {
			backgroundColor: COLOR.THIRD,
		},

		headerTitleStyle: { color: "white" },
		headerTintColor: "white",
		gestureEnabled: true,
		...TransitionPresets.SlideFromRightIOS,
	};

	return (
		<Provider store={RootReducer}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="SignIn"
					screenOptions={globalScreenOptions}
				>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen
						name="SignIn"
						component={SignIn}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="SignUp"
						component={SignUp}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="ForgotPassword"
						component={ForgotPassword}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Otp"
						component={Otp}
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="AddChat" component={AddChatScreen} />
					<Stack.Screen name="Chat" component={ChatScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

export default App;
