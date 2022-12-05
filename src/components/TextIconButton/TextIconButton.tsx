import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { COLOR, FONT } from "src/styles";

const TextIconButton: React.FC<any> = ({
	containerStyle,
	label,
	labelStyle,
	icon,
	iconStyle,
	iconPosition,
	onPress,
	disabled,
}) => {
	return (
		<TouchableOpacity
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				...containerStyle,
			}}
			onPress={onPress}
			disabled={disabled}
		>
			{iconPosition == "LEFT" && (
				<Image
					source={icon}
					style={{
						marginLeft: 5,
						width: 20,
						height: 20,
						tintColor: COLOR.BLACK,
						...iconStyle,
					}}
				/>
			)}
			<Text
				style={{ lineHeight: 22, fontSize: 16, ...FONT.REGULAR, ...labelStyle }}
			>
				{label}
			</Text>
			{iconPosition == "RIGHT" && (
				<Image
					source={icon}
					style={{
						marginLeft: 5,
						width: 20,
						height: 20,
						tintColor: COLOR.BLACK,
						...iconStyle,
					}}
				/>
			)}
		</TouchableOpacity>
	);
};

export default TextIconButton;
