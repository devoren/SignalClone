import React, { useLayoutEffect, useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	Alert,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import CustomListItem from "src/components/CustomListItem";
import { COLOR, FONT, SCALE } from "src/styles";
import { Avatar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FormInput from "src/components/FormInput";
import TextButton from "src/components/TextButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddChatScreen: React.FC<any> = ({ navigation }) => {
	const db = firestore();
	const [input, setInput] = useState("");
	const createChat = () => {
		input.length > 0 &&
			db
				.collection("chats")
				.add({
					chatName: input,
				})
				.then(() => {
					navigation.goBack();
				})
				.catch((err: string) => Alert.alert(err));
	};
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Add a new Chat",
			headerBackTitle: "Chats",
			headerTintColor: COLOR.WHITE,
			headerTitleAlign: "center",
		});
	}, [navigation]);

	return (
		<KeyboardAwareScrollView keyboardDismissMode="on-drag">
			<FormInput
				containerStyle={{
					paddingHorizontal: SCALE.XL,
					marginTop: SCALE.XL,
				}}
				label="Chat name"
				placeholder="Enter a chat name"
				onChange={(value: string) => {
					setInput(value);
				}}
				prependComponent={
					<View
						style={{
							justifyContent: "center",
							marginRight: 5,
						}}
					>
						<FontAwesome name="wechat" size={24} color={COLOR.THIRD} />
					</View>
				}
			/>
			<TextButton
				label="Create Chat"
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
				onPress={() => createChat()}
			/>
		</KeyboardAwareScrollView>
	);
};

export default AddChatScreen;
