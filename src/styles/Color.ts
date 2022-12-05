const COLOR = {
	TRANSPARENT: "transparent",
	PRIMARY: "#2196f3",
	SECONDARY: "#767676",
	THIRD: "#2C68ED",
	TRANSPARENT_THIRD: "rgba(75, 146, 227, 0.4)",
	WHITE: "#ffffff",
	BLACK: "#000000",

	RGBA: (hex: any, alpha = 1) => {
		const [r, g, b] = hex.match(/\w\w/g).map((x: any) => parseInt(x, 16));

		return `rgba(${r},${g},${b},${alpha})`;
	},

	// ACTIONS
	SUCCESS: "#3adb76",
	WARNING: "#ffae00",
	ALERT: "#cc4b37",

	// BASESCALE
	BASE: {
		1: "#2f4a65",
		3: "#6e6e94",
	},

	// GRAYSCALE
	GRAY: {
		1: "#333333",
		2: "#4f4f4f",
		3: "#828282",
		4: "#bdbdbd",
		5: "#e0e0e0",
		6: "#f2f2f2",
		7: "#f9f9f9",
		8: "#525C67",
		9: "#757D85",
		10: "#898B9A",
	},

	LIGHT_GRAY: {
		1: "#DDDDDD",
		2: "#F5F5F8",
	},

	DARK_GRAY: {
		1: "#525C67",
		2: "#757D85",
	},

	GREEN: {
		1: "#44b700",
		2: "#27AE60",
	},

	RED: {
		1: "#d41e1e",
		2: "#ff235d",
		3: "#FF1717",
	},

	// BLUESCALE
	BLUE: {
		1: "#edf2f6",
		2: "#0064C0",
	},
};

export default COLOR;
