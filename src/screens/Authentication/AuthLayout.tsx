import React from "react";
import { View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import images from "src/assets/images";
import { COLOR, FONT, SCALE } from "src/styles";

const Authlayout: React.FC<any> = ({
	title,
	subtitle,
	titleContainerStyle,
	children,
}) => {
	return (
		<View
			style={{
				flex: 1,
				// paddingVertical: SCALE.XL,
				backgroundColor: COLOR.WHITE,
			}}
		>
			<KeyboardAwareScrollView
				keyboardDismissMode="on-drag"
				contentContainerStyle={{
					flex: 1,
					paddingHorizontal: SCALE.XL,
				}}
			>
				{/* App Icon  */}
				<View
					style={{
						alignItems: "center",
						marginTop: SCALE.SM,
					}}
				>
					<Image
						source={images.logo}
						resizeMode="contain"
						style={{
							height: 110,
							width: 220,
						}}
					/>
				</View>
				{/* Title & Subtitle  */}
				<View
					style={{
						marginTop: SCALE.XS,
						...titleContainerStyle,
					}}
				>
					<Text
						style={{
							textAlign: "center",
							lineHeight: 30,
							fontSize: 22,
							...FONT.BOLDER,
						}}
					>
						{title}
					</Text>
					<Text
						style={{
							textAlign: "center",
							color: COLOR.GRAY[8],
							marginTop: SCALE.XS,
							lineHeight: 22,
							fontSize: 16,
							...FONT.REGULAR,
						}}
					>
						{subtitle}
					</Text>
				</View>
				{/* Content / Children  */}
				{children}
			</KeyboardAwareScrollView>
		</View>
	);
};

export default Authlayout;
