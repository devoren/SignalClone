import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AuthLayout from "./AuthLayout";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import TextButton from "src/components/TextButton";
import { COLOR, FONT, SCALE } from "src/styles";

const Otp: React.FC<any> = ({ navigation }) => {
	const [timer, setTimer] = useState(60);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let interval = setInterval(() => {
			setTimer((prevTimer) => {
				if (prevTimer > 0) {
					return prevTimer - 1;
				} else {
					return prevTimer;
				}
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	const goPrevScreen = () => {
		const routes = navigation.getState()?.routes;
		const prevRoute = routes[routes.length - 2];
		console.log(prevRoute.name);

		if (prevRoute.name == "SignUp") {
			navigation.replace("Home");
		} else if (prevRoute.name == "ForgotPassword") {
			navigation.replace("SignIn");
		}
	};
	return (
		<AuthLayout
			title="OTP Authentication"
			subtitle="An authentication code has been sent to EMAIL"
			titleContainerStyle={{
				marginTop: SCALE.XL * 2,
			}}
		>
			{/* OTP inputs  */}
			<View
				style={{
					flex: 1,
					marginTop: SCALE.XL * 2,
				}}
			>
				<OTPInputView
					pinCount={4}
					style={{
						width: "100%",
						height: 65,
						backgroundColor: COLOR.WHITE,
					}}
					codeInputFieldStyle={{
						width: 65,
						height: 65,
						borderRadius: SCALE.SM,
						backgroundColor: COLOR.LIGHT_GRAY[2],
						color: COLOR.BLACK,
						lineHeight: 22,
						fontSize: 16,
						...FONT.BOLD,
					}}
					codeInputHighlightStyle={{
						borderColor: COLOR.THIRD,
					}}
					onCodeFilled={(code) => {
						console.log(code);
						goPrevScreen();
					}}
				/>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						marginTop: SCALE.XL,
					}}
				>
					<Text
						style={{
							color: COLOR.DARK_GRAY[2],
							lineHeight: 22,
							fontSize: 16,
							...FONT.REGULAR,
						}}
					>
						Didn't receive code?
					</Text>
					<TextButton
						label={timer == 0 || timer == 60 ? "Resend" : `Resend (${timer}s)`}
						disabled={timer == 0 ? false : true}
						buttonContainerStyle={{
							marginLeft: SCALE.XS,
							backgroundColor: null,
						}}
						labelStyle={{
							color: COLOR.THIRD,
							lineHeight: 22,
							fontSize: 16,
							...FONT.BOLD,
						}}
						onPress={() => setTimer(60)}
					/>
				</View>
			</View>
			{/* Footer  */}
			<View>
				<TextButton
					label="Continue"
					buttonContainerStyle={{
						height: 50,
						marginBottom: SCALE.SM,
						alignItems: "center",
						borderRadius: SCALE.SM,
					}}
					onPress={() => {
						console.log("Continue");
						setTimeout(() => {
							<ActivityIndicator size={"small"} />;
						}, 3000);
						goPrevScreen();
					}}
				/>
				<View
					style={{
						marginTop: SCALE.XL,
						alignItems: "center",
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
						By signing up, you agree to our.
					</Text>
					<TextButton
						label={"Terms and Conditions"}
						buttonContainerStyle={{
							marginBottom: SCALE.XS,
							backgroundColor: null,
						}}
						labelStyle={{
							color: COLOR.THIRD,
							lineHeight: 22,
							fontSize: 16,
							...FONT.REGULAR,
						}}
						onPress={() => {
							console.log("TnC");
						}}
					/>
				</View>
			</View>
		</AuthLayout>
	);
};

export default Otp;
