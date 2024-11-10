import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiUrl } from "@/constants/Constants";
import { HttpMethod, SessionStorageKeys } from "@/constants/Enumerations";

interface LoginRequest {
	email: string;
	password: string;
}

interface LoginResponse {
	accessToken: string;
}

interface RegisterRequest {
	username: string;
	email: string;
	password: string;
}

interface RegisterResponse {
	accessToken: string;
}

export const fitApi = createApi({
	reducerPath: "fitApi",
	baseQuery: fetchBaseQuery({
		baseUrl: ApiUrl,
		prepareHeaders: (headers) => {
			const token = sessionStorage.getItem(
				SessionStorageKeys.AUTH_TOKEN.toString()
			);
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["Auth"],
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (body: LoginRequest) => ({
				url: "/login",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
			transformResponse: (response: LoginResponse) => {
				if (response.accessToken) {
					sessionStorage.setItem(
						SessionStorageKeys.AUTH_TOKEN.toString(),
						response.accessToken
					);
				}
				return response;
			},
		}),
		register: builder.mutation<RegisterResponse, RegisterRequest>({
			query: (body: RegisterRequest) => ({
				url: "/register",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
			transformResponse: (response: RegisterResponse) => {
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

export const { useLoginMutation, useRegisterMutation } = fitApi;
