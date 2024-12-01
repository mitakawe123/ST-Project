import { configureStore } from "@reduxjs/toolkit";
import { fitApi } from "./api/auth/authApi";
import foodReducer from "./slices/health-tracker/foodSlice";

export const store = configureStore({
	reducer: {
		foodSlice: foodReducer,
		[fitApi.reducerPath]: fitApi.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(fitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
