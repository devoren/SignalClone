import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { COLOR, FONT } from "src/styles";

const TextButton: React.FC<any> = ({
	label,
	labelStyle,
	label2 = "",
	label2Style,
	disabled,
	buttonContainerStyle,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={{
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: COLOR.THIRD,
				...buttonContainerStyle,
			}}
			disabled={disabled}
			onPress={onPress}
		>
			<Text
				style={{
					color: COLOR.WHITE,
					lineHeight: 22,
					fontSize: 16,
					...FONT.BOLD,
					...labelStyle,
				}}
			>
				{label}
			</Text>
			{label2 != "" && (
				<Text
					style={{
						flex: 1,
						textAlign: "right",
						color: COLOR.WHITE,
						lineHeight: 22,
						fontSize: 16,
						...FONT.BOLD,
						...label2Style,
					}}
				>
					{label2}
				</Text>
			)}
		</TouchableOpacity>
	);
};

export default TextButton;
