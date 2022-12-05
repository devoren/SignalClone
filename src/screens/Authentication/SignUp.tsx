import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import CustomSwitch from "src/components/CustomSwitch";
import FormInput from "src/components/FormInput";
import TextButton from "src/components/TextButton";
import TextIconButton from "src/components/TextIconButton";
import { utils } from "src/utils/";
import AuthLayout from "./AuthLayout";
import axios from "axios";
import icons from "src/assets/icons";
import { COLOR, FONT, SCALE } from "src/styles";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const SignUp: React.FC<any> = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [emailError, setEmailError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	// const [imageUrl, setImageUrl] = useState("");
	const db = firestore();
	const [showPass, setShowPass] = useState(false);

	const isEnableSignUp = () => {
		return (
			email != "" &&
			username != "" &&
			password != "" &&
			emailError == "" &&
			usernameError == "" &&
			passwordError == ""
		);
	};
	const SignUp = () => {
		auth()
			.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				res.user.updateProfile({
					displayName: username,
					photoURL:
						"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
				});
				db.collection("users").doc(res.user.uid).set({
					username: username,
					photoURL:
						"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
				});
				console.log("User account created & signed in!");
				navigation.navigate("SignIn");
			})
			.catch((error: { code: string }) => {
				if (error.code === "auth/email-already-in-use") {
					console.log("That email address is already in use!");
				}

				if (error.code === "auth/invalid-email") {
					console.log("That email address is invalid!");
				}

				console.error(error);
			});
	};
	// const send = () => {
	// 	axios
	// 		.post("http://192.168.1.9:8000/register", {
	// 			// username: username,
	// 			email: email,
	// 			password: password,
	// 		})
	// 		.then((data) => {
	// 			if (data.data.message) {
	// 				// enqueueSnackbar(lang.LogInError.emailError, { variant: "error", key: "snack" });
	// 				Alert.alert("OMG");
	// 			} else {
	// 				Dispatch(
	// 					setUser({
	// 						...data.data,
	// 					})
	// 				);
	// 				navigation.replace("Home");
	// 			}
	// 		})
	// 		.catch(function (err) {
	// 			console.log("Got an error logging in, here's the message: ", err);
	// 		});
	// };
	return (
		<AuthLayout
			title="Getting Started"
			subtitle="Create an account to continue!"
		>
			<View
				style={{
					flex: 1,
					marginTop: SCALE.XL,
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
					label="Username"
					autoCompleteType="username"
					containerStyle={{
						marginTop: SCALE.SM,
					}}
					onChange={(value: string) => {
						utils.validateUsername(value, setUsernameError);
						setUsername(value);
					}}
					errorMsg={usernameError}
					appendComponent={
						<View
							style={{
								justifyContent: "center",
							}}
						>
							<Image
								source={
									username == "" || (username != "" && usernameError == "")
										? icons.correct
										: icons.cancel
								}
								style={{
									height: 20,
									width: 20,
									tintColor:
										username == ""
											? COLOR.GRAY[10]
											: username != "" && usernameError == ""
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
					onChange={(value: string) => {
						utils.validatePassword(value, setPasswordError);
						setPassword(value);
					}}
					errorMsg={passwordError}
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

				{/* Sign Up  */}
				<TextButton
					label="Sign Up"
					disabled={isEnableSignUp() ? false : true}
					buttonContainerStyle={{
						height: 55,
						alignItems: "center",
						marginTop: SCALE.XL,
						borderRadius: SCALE.SM,
						backgroundColor: isEnableSignUp()
							? COLOR.THIRD
							: COLOR.TRANSPARENT_THIRD,
					}}
					onPress={() => {
						// navigation.navigate("Otp");
						SignUp();
					}}
				/>
				{/* Sign In  */}
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
						Already have an account?
					</Text>
					<TextButton
						label="Sign In"
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
						onPress={() => navigation.goBack()}
					/>
				</View>
				{/* Footer  */}
				<TextIconButton
					containerStyle={{
						height: 50,
						alignItems: "center",
						marginTop: 35,
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

export default SignUp;
