function dimensions(
	top: number,
	right = top,
	bottom = top,
	left = right,
	property: string
) {
	const styles: { [key: string]: number } = {};

	styles[`${property}Top`] = top;
	styles[`${property}Right`] = right;
	styles[`${property}Bottom`] = bottom;
	styles[`${property}Left`] = left;

	return styles;
}

const MIXIN = {
	MARGIN: (top: number, right: number, bottom: number, left: number) =>
		dimensions(top, right, bottom, left, "margin"),
	PADDING: (top: number, right: number, bottom: number, left: number) =>
		dimensions(top, right, bottom, left, "padding"),
	BOX_SHADOW: (
		color: string,
		offset = { height: 2, width: 2 },
		radius = 8,
		opacity = 0.2
	) => ({
		shadowColor: color,
		shadowOffset: offset,
		shadowOpacity: opacity,
		shadowRadius: radius,
		elevation: radius,
	}),
};

export default MIXIN;
