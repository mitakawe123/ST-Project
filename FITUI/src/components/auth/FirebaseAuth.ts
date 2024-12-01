import {
	auth,
	githubProvider,
	googleProvider,
} from "@/configurations/Firebase";
import { FirebaseErrorAlreadyHaveAnAccount } from "@/constants/Constants";
import { AuthenticationError } from "@/errors/AuthenticationError";
import { signInWithPopup, UserCredential } from "firebase/auth";

interface FirebaseError extends Error {
	code: string;
	customData?: { [key: string]: any };
}

async function getGoogleIdToken(): Promise<string> {
	try {
		const result: UserCredential = await signInWithPopup(auth, googleProvider);
		return await result.user.getIdToken();
	} catch (error) {
		if (
			(error as FirebaseError).message.includes(
				FirebaseErrorAlreadyHaveAnAccount
			)
		) {
			const err = error as FirebaseError;
			const email = err.customData?.email;

			throw new AuthenticationError(
				`You have already used this account (${email}) with another provider. Please log in using the original provider.`,
				err.code,
				err.customData
			);
		} else {
			throw new Error(`Login failed: ${error}`);
		}
	}
}

async function getGithubIdToken(): Promise<string> {
	try {
		const result: UserCredential = await signInWithPopup(auth, githubProvider);
		return await result.user.getIdToken();
	} catch (error) {
		if (
			(error as FirebaseError).message.includes(
				FirebaseErrorAlreadyHaveAnAccount
			)
		) {
			const err = error as FirebaseError;
			const email = err.customData?.email;

			throw new AuthenticationError(
				`You have already used this account (${email}) with another provider. Please log in using the original provider.`,
				err.code,
				err.customData
			);
		} else {
			throw new Error(`Login failed: ${error}`);
		}
	}
}

export { getGithubIdToken, getGoogleIdToken };
