import React, { useLayoutEffect, useState } from "react";
import {
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import CustomListItem from "src/components/CustomListItem";
import { COLOR } from "src/styles";
import { Avatar } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Home: React.FC<any> = ({ navigation }) => {
	const [chats, setChats] = useState<any>([]);

	useLayoutEffect(() => {
		const unsubscribe = firestore()
			.collection("chats")
			.onSnapshot((snapshot) =>
				setChats(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);
		return unsubscribe;
	}, [navigation]);

	// let photoURL: string;
	// db.collection("users")
	// 	.get()
	// 	.then((querySnapshot) => {
	// 		if (querySnapshot.size) {
	// 			const items: { id: any; data: any }[] = [];
	// 			querySnapshot.forEach((documentSnapshot) => {
	// 				const chats_data = documentSnapshot.data();
	// 				items.push({
	// 					id: chats_data.id,
	// 					data: chats_data,
	// 				});
	// 			});

	// 			setChats(items);
	// 		}
	// 	});
	const signOutUser = () => {
		// auth()
		// 	.signOut()
		// 	.then(() => {
		navigation.replace("SignIn");
		// });
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Signal",
			headerStyle: {
				backgroundColor: COLOR.WHITE,
			},
			headerTitleStyle: {
				color: COLOR.BLACK,
			},
			headerTitleAlign: "center",
			headerTintColor: COLOR.THIRD,
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
						<Avatar
							rounded
							source={{
								height: 100,
								width: 100,
								uri: auth()?.currentUser?.photoURL as string,
							}}
						/>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
						<MaterialIcons name="logout" size={24} color={COLOR.THIRD} />
					</TouchableOpacity>
				</View>
			),
			headerLeft: () => (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: 70,
						marginLeft: 20,
						// backgroundColor: "red",
					}}
				>
					<TouchableOpacity activeOpacity={0.5}>
						<AntDesign name="camerao" size={24} color={COLOR.THIRD} />
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => navigation.navigate("AddChat")}
					>
						<FontAwesome name="pencil" size={24} color={COLOR.THIRD} />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	const enterChat = (id: any, chatName: any) => {
		navigation.navigate("Chat", {
			id,
			chatName,
		});
	};

	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				{chats.map(({ id, data: { chatName } }: any) => (
					<CustomListItem
						key={id}
						id={id}
						chatName={chatName}
						enterChat={enterChat}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});
export default Home;
