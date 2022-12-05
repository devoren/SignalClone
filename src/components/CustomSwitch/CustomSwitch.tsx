import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { COLOR, FONT, SCALE } from "src/styles";

const CustomSwitch: React.FC<any> = ({ value, onChange }) => {
	return (
		<TouchableWithoutFeedback onPress={() => onChange(!value)}>
			<View
				style={{
					flexDirection: "row",
				}}
			>
				{/* Switch  */}
				<View
					style={value ? styles.switchOnContainer : styles.switchOffContainer}
				>
					<View
						style={{
							...styles.dot,
							backgroundColor: value ? COLOR.WHITE : COLOR.GRAY[10],
						}}
					/>
				</View>

				{/* Text  */}
				<Text
					style={{
						color: value ? COLOR.THIRD : COLOR.GRAY[10],
						marginLeft: SCALE.XS,
						lineHeight: 22,
						fontSize: 14,
						...FONT.REGULAR,
					}}
				>
					Save Me
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	switchOnContainer: {
		width: 40,
		height: 20,
		paddingRight: 2,
		justifyContent: "center",
		alignItems: "flex-end",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLOR.THIRD,
		backgroundColor: COLOR.THIRD,
	},
	switchOffContainer: {
		width: 40,
		height: 20,
		paddingLeft: 2,
		justifyContent: "center",
		borderWidth: 1,
		borderColor: COLOR.GRAY[10],
		borderRadius: 10,
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: 6,
	},
});

export default CustomSwitch;
