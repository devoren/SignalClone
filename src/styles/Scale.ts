import { PixelRatio } from "react-native";
import WINDOW from "./Window";

const guidelineBaseWidth = 375;

const SIZE = (size: number) => {
	const newSize = size * (WINDOW.WIDTH / guidelineBaseWidth);
	return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const SCALE = {
	SS: SIZE(4),
	XS: SIZE(8),
	SM: SIZE(12),
	MM: SIZE(14),
	MD: SIZE(16),
	DD: SIZE(18),
	LG: SIZE(20),
	XL: SIZE(24),
	XX: SIZE(28),
	BL: SIZE(32),
	BB: SIZE(36),

	SIZE: SIZE,
};

export default SCALE;
