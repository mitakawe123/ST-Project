import { SessionStorageKeys } from "@/constants/Enumerations";
import { User } from "@/interfaces/user.interface";

export function formatSocialMediaDate(date: Date) {
	const now = new Date();
	const givenDate = new Date(date);

	const diffTime = now.getTime() - givenDate.getTime();
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	function isSameWeek(d1: Date, d2: Date) {
		const startOfWeek = (date: Date) => {
			const day = date.getDay();
			const diff = date.getDate() - day;
			return new Date(date.setDate(diff));
		};

		const startOfWeek1 = startOfWeek(new Date(d1));
		const startOfWeek2 = startOfWeek(new Date(d2));

		return startOfWeek1.toDateString() === startOfWeek2.toDateString();
	}

	if (diffDays === 0) {
		return "Today";
	} else if (diffDays === 1) {
		return "Yesterday";
	} else if (isSameWeek(givenDate, now)) {
		console.log("sdad");
		return "This week";
	} else if (diffDays <= 14) {
		return "Last week";
	} else {
		return givenDate.toLocaleDateString();
	}
}

export function getUser(): User {
	const token =
		sessionStorage.getItem(SessionStorageKeys.AUTH_TOKEN.toString()) ?? "";

	// Split the token into parts
	const parts = token.split(".");
	if (parts.length !== 3) {
		throw new Error("Invalid JWT");
	}

	// Decode the payload (Base64URL -> JSON)
	const payload = parts[1];
	const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));

	// Parse the JSON
	return JSON.parse(decodedPayload);
}
