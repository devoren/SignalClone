function isValidEmail(value: any) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(value).toLowerCase());
}

function isValidPassword(value: any) {
	const re = /^(?=.*[A-Z]).{8,}$/;
	return re.test(String(value));
}

function validateEmail(value: string, setEmailError: (arg0: string) => void) {
	if (value == "") {
		setEmailError("");
	} else if (isValidEmail(value)) {
		setEmailError("");
	} else {
		setEmailError("Invalid Email");
	}
}
function validateUsername(
	value: string | any[],
	setUsernameError: (arg0: string) => void
) {
	if (value.length < 2) {
		setUsernameError("Username is too short");
	} else {
		setUsernameError("");
	}
}

function validatePassword(
	value: string,
	setPasswordError: (arg0: string) => void
) {
	const num = /(?=.*?[0-9])/;

	if (value.length < 8) {
		setPasswordError("Password must be atleast 8 characters");
	} else if (!isValidPassword(value)) {
		setPasswordError("Must contain upper case character");
	} else if (!num.test(String(value))) {
		setPasswordError("Must contain numeric character");
	} else {
		setPasswordError("");
	}
}
function validateInput(
	value: string | any[],
	minLength: number,
	setError: (arg0: string) => void
) {
	if (value.length < minLength) {
		setError("Invalid Input");
	} else {
		setError("");
	}
}

function calculateAngle(coordinates: { [x: string]: any }[]) {
	let startLat = coordinates[0]["latitude"];
	let startLng = coordinates[0]["longitude"];
	let endLat = coordinates[1]["latitude"];
	let endLng = coordinates[1]["longitude"];
	let dx = endLat - startLat;
	let dy = endLng - startLng;

	return (Math.atan2(dy, dx) * 180) / Math.PI;
}
const utils = {
	isValidEmail,
	validateUsername,
	validateEmail,
	validatePassword,
	validateInput,
	calculateAngle,
};

export default utils;
