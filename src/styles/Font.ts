import { Platform, TextStyle } from "react-native";

const FAMILY: { [key: string]: string | undefined } = {
	REGULAR: "Roboto-Regular",
	BOLD: "Roboto-Bold",
};

const FONT: {
	[key: string]: TextStyle;
} = {
	REGULAR: {
		fontFamily: FAMILY.REGULAR,
		fontWeight: "400",
	},
	BOLD: {
		fontFamily: FAMILY.BOLD,
		fontWeight: Platform.OS == "ios" ? "500" : "bold",
	},
	BOLDER: {
		fontFamily: FAMILY.BOLD,
		fontWeight: Platform.OS == "ios" ? "700" : "bold",
	},
};

export default FONT;
