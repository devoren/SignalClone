import React from "react";
import { View, Text, TextInput } from "react-native";
import { COLOR, FONT, SCALE } from "src/styles";

const FormInput: React.FC<any> = ({
	containerStyle,
	inputContainerStyle,
	label,
	placeholder,
	inputStyle,
	value,
	prependComponent,
	appendComponent,
	onChange,
	secureTextEntry,
	keyboardType = "default",
	autoCompleteType = "off",
	autoCapitalize = "none",
	errorMsg = "",
	maxLength,
	onSubmitEditing,
}) => {
	return (
		<View style={{ ...containerStyle }}>
			{/* Label & Error msg  */}
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Text
					style={{
						color: COLOR.GRAY[10],
						lineHeight: 22,
						fontSize: 14,
						...FONT.REGULAR,
					}}
				>
					{label}
				</Text>
				<Text
					style={{
						color: COLOR.RED[3],
						lineHeight: 22,
						fontSize: 14,
						...FONT.REGULAR,
					}}
				>
					{errorMsg}
				</Text>
			</View>

			{/* Text Input  */}
			<View
				style={{
					flexDirection: "row",
					height: 55,
					paddingHorizontal: SCALE.LG,
					marginTop: SCALE.XS,
					borderRadius: SCALE.SM,
					backgroundColor: COLOR.LIGHT_GRAY[2],
					...inputContainerStyle,
				}}
			>
				{prependComponent}
				<TextInput
					style={{
						flex: 1,
						...inputStyle,
					}}
					value={value}
					placeholder={placeholder}
					placeholderTextColor={COLOR.GRAY[10]}
					secureTextEntry={secureTextEntry}
					keyboardType={keyboardType}
					autoComplete={autoCompleteType}
					autoCapitalize={autoCapitalize}
					maxLength={maxLength}
					onChangeText={(text) => onChange(text)}
					onSubmitEditing={onSubmitEditing}
				/>
				{appendComponent}
			</View>
		</View>
	);
};

export default FormInput;
