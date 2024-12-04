import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiUrl } from "@/constants/Constants";
import { HttpMethod, SessionStorageKeys } from "@/constants/Enumerations";
import { LoginRequest } from "@/interfaces/api/auth/requests/login.interface";
import { LoginResponse } from "@/interfaces/api/auth/response/login.interface";
import { RegisterResponse } from "@/interfaces/api/auth/response/register.interface";
import { RegisterRequest } from "@/interfaces/api/auth/requests/register.interface";

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
	tagTypes: ["Auth", "Workouts", "Fluids"],
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
