import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Alert,
	StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import CustomSwitch from "src/components/CustomSwitch";
import FormInput from "src/components/FormInput";
import TextButton from "src/components/TextButton";
import TextIconButton from "src/components/TextIconButton";
import { utils } from "src/utils/";
import AuthLayout from "./AuthLayout";
import axios from "axios";
import { COLOR, FONT, SCALE } from "src/styles";
import icons from "src/assets/icons";
import auth from "@react-native-firebase/auth";

const SignIn: React.FC<any> = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");

	const [showPass, setShowPass] = useState(false);
	const [saveMe, setSaveMe] = useState(false);
	const dispatch = useDispatch();

	const isEnableSignIn = () => {
		return email != "" && password != "" && emailError == "";
	};

	// useEffect(() => {
	// 	const unsubscribe = auth().onAuthStateChanged((authUser) => {
	// 		console.log(authUser);

	// 		if (authUser) {
	// 			navigation.replace("Home");
	// 		}
	// 	});
	// 	return unsubscribe;
	// }, []);

	const SignIn = () => {
		auth()
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				// console.log("User account signed in!", res);
				// Alert.alert("User account signed in!");
				navigation.replace("Home");
			})
			.catch((error: { code: string }) => {
				if (error.code === "auth/email-already-in-use") {
					console.log("That email address is already in use!");
					Alert.alert("That email address is already in use!");
				}

				if (error.code === "auth/invalid-email") {
					console.log("That email address is invalid!");
					Alert.alert("That email address is invalid!");
				}

				console.error(error);
			});
	};

	// const send = () => {
	// 	Http.POST(
	// 		ENDPOINTS.ACCOUNTS.LOGIN,
	// 		{ email: email, password: password },
	// 		(data) => {
	// 			if (data.message) {
	// 				Notice.Error(data.message);
	// 			} else {
	// 				dispatch(setUser(data));

	// 				navigation.replace("Home");
	// 				Notice.Success(data.message);
	// 			}
	// 		}
	// 	);
	// 	// axios
	// 	// 	.post("http://192.168.1.9:8000/login", {
	// 	// 		email: email,
	// 	// 		password: password,
	// 	// 	})
	// 	// 	.then((data) => {
	// 	// 		if (data.data.message) {
	// 	// 			// enqueueSnackbar(lang.LogInError.emailError, { variant: "error", key: "snack" });
	// 	// 			Alert.alert("OMG");
	// 	// 		} else {
	// 	// 			dispatch(
	// 	// 				setUser({
	// 	// 					...data.data,
	// 	// 				})
	// 	// 			);
	// 	// 			navigation.replace("Home");
	// 	// 		}
	// 	// 		console.log(data);
	// 	// 	})
	// 	// 	.catch(function (err) {
	// 	// 		console.log(
	// 	// 			"Got an error logging in, here's the message: ",
	// 	// 			err
	// 	// 		);
	// 	// 	});
	// };

	return (
		<AuthLayout
			title="Let's Sign You In"
			subtitle="Welcome back, you've been missed!"
		>
			<View
				style={{
					flex: 1,
					marginTop: SCALE.XL * 2,
				}}
			>
				{/* Form Inputs  */}
				<FormInput
					label="Email"
					keyboardType="email-address"
					autoCompleteType="email"
					onChange={(value: string) => {
						utils.validateEmail(value, setEmailError);

						setEmail(value);
					}}
					errorMsg={emailError}
					appendComponent={
						<View
							style={{
								justifyContent: "center",
							}}
						>
							<Image
								source={
									email == "" || (email != "" && emailError == "")
										? icons.correct
										: icons.cancel
								}
								style={{
									height: 20,
									width: 20,
									tintColor:
										email == ""
											? COLOR.GRAY[10]
											: email != "" && emailError == ""
											? COLOR.GREEN[2]
											: COLOR.RED[3],
								}}
							/>
						</View>
					}
				/>

				<FormInput
					label="Password"
					secureTextEntry={!showPass}
					autoCompleteType="password"
					containerStyle={{
						marginTop: SCALE.SM,
					}}
					onChange={(value: string) => setPassword(value)}
					appendComponent={
						<TouchableOpacity
							style={{
								width: 40,
								alignItems: "flex-end",
								justifyContent: "center",
							}}
							onPress={() => setShowPass(!showPass)}
						>
							<Image
								source={showPass ? icons.eye_close : icons.eye}
								style={{
									height: 20,
									width: 20,
									tintColor: COLOR.GRAY[10],
								}}
							/>
						</TouchableOpacity>
					}
				/>
				{/* Save me & Forgot Password  */}
				<View
					style={{
						flexDirection: "row",
						marginTop: SCALE.SM,
						justifyContent: "space-between",
					}}
				>
					<CustomSwitch
						value={saveMe}
						onChange={(value: boolean) => setSaveMe(value)}
					/>

					<TextButton
						label="Forgot Password?"
						buttonContainerStyle={{
							backgroundColor: null,
						}}
						labelStyle={{
							color: COLOR.GRAY[10],
							lineHeight: 22,
							fontSize: 14,
							...FONT.REGULAR,
						}}
						onPress={() => navigation.navigate("ForgotPassword")}
					/>
				</View>

				{/* Sign In  */}
				<TextButton
					label="Sign In"
					disabled={isEnableSignIn() ? false : true}
					buttonContainerStyle={{
						height: 55,
						alignItems: "center",
						marginTop: SCALE.XL,
						borderRadius: SCALE.SM,
						backgroundColor: isEnableSignIn()
							? COLOR.THIRD
							: COLOR.TRANSPARENT_THIRD,
					}}
					onPress={() => {
						SignIn();
					}}
				/>
				{/* Sign Up  */}
				<View
					style={{
						flexDirection: "row",
						marginTop: SCALE.SM,
						justifyContent: "center",
					}}
				>
					<Text
						style={{
							color: COLOR.DARK_GRAY[1],
							lineHeight: 22,
							fontSize: 16,
							...FONT.REGULAR,
						}}
					>
						Don't have an account?
					</Text>
					<TextButton
						label="Sign Up"
						buttonContainerStyle={{
							marginLeft: 3,
							backgroundColor: null,
						}}
						labelStyle={{
							color: COLOR.THIRD,
							lineHeight: 22,
							fontSize: 16,
							...FONT.BOLD,
						}}
						onPress={() => navigation.navigate("SignUp")}
					/>
				</View>

				{/* Footer  */}
				<TextIconButton
					containerStyle={{
						height: 50,
						alignItems: "center",
						marginTop: 50,
						borderRadius: SCALE.SM,
						backgroundColor: COLOR.BLUE[2],
					}}
					label="Continue With Facebook"
					labelStyle={{
						marginLeft: SCALE.SM,
						color: COLOR.WHITE,
					}}
					icon={icons.fb}
					iconStyle={{
						tintColor: COLOR.WHITE,
					}}
					iconPosition="LEFT"
					onPress={() => console.log("FB")}
				/>

				<TextIconButton
					containerStyle={{
						height: 50,
						alignItems: "center",
						marginVertical: SCALE.SM,
						borderRadius: SCALE.SM,
						backgroundColor: COLOR.LIGHT_GRAY[2],
					}}
					label="Continue With Google"
					labelStyle={{
						marginLeft: SCALE.SM,
					}}
					icon={icons.google}
					iconStyle={{
						tintColor: null,
					}}
					iconPosition="LEFT"
					onPress={() => console.log("Google")}
				/>
			</View>
		</AuthLayout>
	);
};

export default SignIn;
