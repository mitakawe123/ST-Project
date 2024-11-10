import {
	auth,
	githubProvider,
	googleProvider,
} from "@/configurations/Firebase";
import { signInWithPopup, UserCredential } from "firebase/auth";
import { SyntheticEvent } from "react";

async function signInWithGoogle(
	event: SyntheticEvent,
	navigate: (path: string) => void
) {
	event.preventDefault();

	try {
		const result: UserCredential = await signInWithPopup(auth, googleProvider);

		const token = await result.user.getIdToken();

		if (token) {
			sessionStorage.setItem("authToken", token);
			navigate("/");
		}
	} catch (error) {
		throw new Error(
			"Cannot login with google right now please try again later"
		);
	}
}

async function signInWithGithub(
	event: SyntheticEvent,
	navigate: (path: string) => void
) {
	event.preventDefault();

	try {
		const result: UserCredential = await signInWithPopup(auth, githubProvider);

		const token = await result.user.getIdToken();

		if (token) {
			sessionStorage.setItem("authToken", token);
			navigate("/");
		}
	} catch (error) {
		throw new Error(
			"Cannot login with github right now please try again later"
		);
	}
}

export { signInWithGithub, signInWithGoogle };
