import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/authApi";

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
