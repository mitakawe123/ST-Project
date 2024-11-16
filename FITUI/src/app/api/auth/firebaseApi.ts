import { HttpMethod, SessionStorageKeys } from "@/constants/Enumerations";
import { fitApi } from "./authApi";

interface FirebaseAuthResponse {
	accessToken: string;
}

interface FirebaseAuthRequest {
	idToken: string;
}

const firebaseApi = fitApi.injectEndpoints({
	endpoints: (build) => ({
		googleAuth: build.mutation<FirebaseAuthResponse, FirebaseAuthRequest>({
			query: (body) => ({
				url: "/googleauth",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
			transformResponse(response: FirebaseAuthResponse) {
				if (response.accessToken) {
					sessionStorage.setItem(
						SessionStorageKeys.AUTH_TOKEN.toString(),
						response.accessToken
					);
				}
				return response;
			},
		}),
		githubAuth: build.mutation<FirebaseAuthResponse, FirebaseAuthRequest>({
			query: (body) => ({
				url: "/githubauth",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
			transformResponse(response: FirebaseAuthResponse) {
				if (response.accessToken) {
					sessionStorage.setItem(
						SessionStorageKeys.AUTH_TOKEN.toString(),
						response.accessToken
					);
				}
				return response;
			},
		}),
	}),
});

export const { useGoogleAuthMutation, useGithubAuthMutation } = firebaseApi;
