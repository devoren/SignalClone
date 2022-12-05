import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const WINDOW = {
	WIDTH: width,
	HEIGHT: height,
};

export default WINDOW;
