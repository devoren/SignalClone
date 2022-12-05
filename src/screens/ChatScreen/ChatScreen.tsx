import "moment/locale/kk";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
	Alert,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Avatar } from "react-native-elements";
import { launchImageLibrary } from "react-native-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FormInput from "src/components/FormInput";
import { COLOR, FONT, SCALE } from "src/styles";

const ChatScreen: React.FC<any> = ({ navigation, route }) => {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<any>([]);
	const [response, setResponse] = React.useState<any>(null);
	const [closed, setClosed] = React.useState(false);
	const openLibrary = () => {
		launchImageLibrary(
			{
				mediaType: "photo",
				includeBase64: false,
				maxHeight: 300,
				maxWidth: 300,
				selectionLimit: 0,
			},
			(response) => {
				console.log(response);
				setResponse(response);
			}
		);
		setClosed(true);
	};
	const uri = response?.assets && response?.assets[0]?.uri;
	const temp_uri = "https://source.unsplash.com/random/200x200";
	const sendImage = () => {
		setResponse(temp_uri);
		setClosed(true);
	};
	useEffect(() => {
		navigation.setOptions({
			title: "Chat",
			headerTintColor: COLOR.WHITE,
			// headerTitleAlign: "center",
			headerTitle: () => {
				return (
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							// backgroundColor: "red",
						}}
					>
						<TouchableOpacity activeOpacity={0.5}>
							<Avatar
								rounded
								source={{
									height: 100,
									width: 100,
									uri: auth()?.currentUser?.photoURL as string,
								}}
							/>
						</TouchableOpacity>
						<Text
							style={{
								color: COLOR.WHITE,
								marginLeft: SCALE.SM,
								fontSize: 16,
								lineHeight: 22,
								...FONT.BOLDER,
							}}
						>
							{route.params.chatName}
						</Text>
					</View>
				);
			},
			headerRight: () => (
				<View
					style={{
						marginRight: 20,
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						width: 80,
						// backgroundColor: "red",
					}}
				>
					<TouchableOpacity activeOpacity={0.5}>
						<FontAwesome name="video-camera" size={24} color={COLOR.WHITE} />
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.5}>
						<Ionicons name="call" size={24} color={COLOR.WHITE} />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	const sendMessage = () => {
		Keyboard.dismiss();

		firestore()
			.collection("chats")
			.doc(route.params.id)
			.collection("messages")
			.add({
				timestamp: new Date().getTime(),
				message: input.length > 0 ? input : "",
				displayName: auth().currentUser?.displayName,
				email: auth().currentUser?.email,
				photoURL: auth().currentUser?.photoURL,
				image: closed ? uri : null,
			})
			.catch((err: string) => Alert.alert(err));

		setInput("");
		setClosed(false);
		setResponse(null);
	};

	useEffect(() => {
		const unsubscribe = firestore()
			.collection("chats")
			.doc(route.params.id)
			.collection("messages")
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) =>
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);

		return unsubscribe;
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
			<KeyboardAvoidingView style={styles.container}>
				<>
					<ScrollView>
						{messages.map(({ id, data }: any) =>
							data.email === auth().currentUser?.email ? (
								<View key={id} style={styles.reciever}>
									{/* <Avatar /> */}
									{data.image === null ? (
										<Text style={styles.recieverText}>{data.message}</Text>
									) : (
										<>
											<Image
												source={{ uri: data.image }}
												style={{
													width: 200,
													height: 200,
													resizeMode: "contain",
												}}
											/>
											{data.message === "" ? null : (
												<Text style={styles.recieverText}>{data.message}</Text>
											)}
										</>
									)}
									<Text style={styles.recieverTime}>
										{moment.unix(data.timestamp).format("LT")}
									</Text>
								</View>
							) : (
								<View key={id} style={styles.sender}>
									{/* <Avatar /> */}
									{data.image === null ? (
										<Text style={styles.senderText}>{data.message}</Text>
									) : (
										<>
											<Image
												source={{ uri: data.image }}
												style={{
													width: 200,
													height: 200,
													resizeMode: "contain",
												}}
											/>
											{data.message === "" ? null : (
												<Text style={styles.senderText}>{data.message}</Text>
											)}
										</>
									)}
									<Text style={styles.senderTime}>
										{moment.unix(data.timestamp).format("LT")}
									</Text>
								</View>
							)
						)}
					</ScrollView>
					<View style={styles.footer}>
						{closed && (
							<View
								style={{
									paddingHorizontal: SCALE.XS,
									paddingTop: SCALE.XS,
								}}
							>
								<View style={{ width: 100, height: 100 }}>
									<Image
										source={{ uri: uri }}
										style={{ width: 100, borderRadius: SCALE.XS, height: 100 }}
									/>
									<TouchableOpacity
										onPress={() => {
											setResponse(null);
											setClosed(false);
										}}
										activeOpacity={0.5}
										style={{
											position: "absolute",
											top: 0,
											right: 0,
										}}
									>
										<MaterialIcons
											name="cancel"
											size={24}
											color={COLOR.LIGHT_GRAY[1]}
										/>
									</TouchableOpacity>
								</View>
							</View>
						)}
						<View style={styles.input}>
							<TouchableOpacity
								onPress={openLibrary}
								activeOpacity={0.5}
								style={{
									// paddingLeft: SCALE.XS,
									width: 60,
									height: 50,
									// marginTop: 30,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<MaterialCommunityIcons
									name="folder-image"
									size={24}
									color={COLOR.THIRD}
								/>
							</TouchableOpacity>
							<FormInput
								value={input}
								containerStyle={{
									// marginLeft: SCALE.MD,
									flex: 1,
									width: "90%",
									bottom: SCALE.SM,
									justifyContent: "center",
									// height: 40,
								}}
								inputContainerStyle={{
									height: 40,
									backgroundColor: "#ececec",
								}}
								onChange={(value: string) => {
									setInput(value);
								}}
								placeholder="Message"
								onSubmitEditing={sendMessage}
							/>
							<TouchableOpacity
								onPress={sendMessage}
								activeOpacity={0.5}
								style={{
									paddingRight: SCALE.XS,
									width: 60,
									height: 50,
									// marginTop: 30,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Ionicons name="send" size={24} color={COLOR.THIRD} />
							</TouchableOpacity>
						</View>
					</View>
				</>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	reciever: {
		padding: SCALE.SM,
		backgroundColor: "#ececec",
		alignSelf: "flex-end",
		borderRadius: SCALE.SM,
		marginTop: SCALE.XS,
		marginRight: 15,
		maxWidth: "70%",
		position: "relative",
	},
	recieverText: {
		paddingTop: SCALE.XS,
		color: COLOR.BLACK,
	},
	recieverTime: {
		fontSize: 8,
		alignSelf: "flex-end",
		bottom: -5,
	},
	sender: {
		padding: SCALE.SM,
		backgroundColor: COLOR.THIRD,
		alignSelf: "flex-start",
		borderRadius: SCALE.SM,
		margin: 15,
		maxWidth: "80%",
		position: "relative",
	},
	senderText: {
		paddingTop: SCALE.SS,
		color: COLOR.WHITE,
	},
	senderTime: {
		color: COLOR.WHITE,
		fontSize: 8,
		alignSelf: "flex-start",
		bottom: -5,
	},
	footer: {
		flexDirection: "column",
		backgroundColor: COLOR.LIGHT_GRAY[2],
		marginTop: 5,
	},
	input: {
		alignItems: "center",
		flexDirection: "row",
		width: "100%",
		backgroundColor: COLOR.LIGHT_GRAY[2],
	},
});

export default ChatScreen;
