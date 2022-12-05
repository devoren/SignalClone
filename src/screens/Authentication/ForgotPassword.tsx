import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import AuthLayout from "./AuthLayout";
import TextButton from "src/components/TextButton";
import FormInput from "src/components/FormInput";
import { utils } from "src/utils/";
import { COLOR, SCALE } from "src/styles";
import icons from "src/assets/icons";
import auth from "@react-native-firebase/auth";

const ForgotPassword: React.FC<any> = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");

	const isEnableSendEmail = () => {
		return email != "" && emailError == "";
	};
	const forgotPassword = () => {
		auth()
			.sendPasswordResetEmail(email)
			.then((user) => {
				Alert.alert("Please check your email...");
				navigation.navigate("SignIn");
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<AuthLayout
			title="Password Recovery"
			subtitle="Please enter your email address to recover your password"
			titleContainerStyle={{
				marginTop: SCALE.XL * 2,
			}}
		>
			<View
				style={{
					flex: 1,
					marginTop: SCALE.XL * 2,
				}}
			>
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
											: COLOR.RED[1],
								}}
							/>
						</View>
					}
				/>
			</View>
			<TextButton
				label="Send Email"
				disabled={isEnableSendEmail() ? false : true}
				buttonContainerStyle={{
					height: 55,
					alignItems: "center",
					marginVertical: SCALE.XL,
					borderRadius: SCALE.SM,
					backgroundColor: isEnableSendEmail()
						? COLOR.THIRD
						: COLOR.TRANSPARENT_THIRD,
				}}
				onPress={() => {
					console.log("Sended");
					forgotPassword();
				}}
			/>
		</AuthLayout>
	);
};

export default ForgotPassword;
