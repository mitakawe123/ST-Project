import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiUrl } from "@/constants/Constants";
import { HttpMethod } from "@/constants/Enumerations";

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

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: ApiUrl }),
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
					sessionStorage.setItem("authToken", response.accessToken);
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
					sessionStorage.setItem("authToken", response.accessToken);
				}
				return response;
			},
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
