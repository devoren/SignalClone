import React, { useLayoutEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { ListItem, Avatar } from "react-native-elements";
const CustomListItem: React.FC<any> = ({ id, chatName, enterChat }) => {
	const [chatMessages, setChatMessages] = useState<any>([]);

	useLayoutEffect(() => {
		const unsubscribe = firestore()
			.collection("chats")
			.doc(id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setChatMessages(
					snapshot.docs.map((doc) => ({
						data: doc.data(),
					}))
				)
			);

		return unsubscribe;
	}, []);
	// console.log(chatMessages?.[0]?.data.message);

	return (
		<ListItem
			key={`key-${id}`}
			hasTVPreferredFocus={undefined}
			tvParallaxProperties={undefined}
			onPress={() => enterChat(id, chatName)}
			bottomDivider
		>
			<Avatar
				rounded
				source={{
					uri:
						chatMessages?.[0]?.photoURL ||
						"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
				}}
			/>

			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: "800" }}>
					{chatName}
				</ListItem.Title>
				<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
					{chatMessages?.[0]?.data.message}
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default CustomListItem;
