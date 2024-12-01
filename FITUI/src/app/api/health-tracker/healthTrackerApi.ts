import { HttpMethod } from "@/constants/Enumerations";
import { fitApi } from "../auth/authApi";
import { FoodSearchResponse } from "@/interfaces/api/health-tracker/response/food-search.interface";
import { FoodSearchRequest } from "@/interfaces/api/health-tracker/request/food-search.interface";
import { SaveFoodLogRequest } from "@/interfaces/api/health-tracker/request/food-log.interface";
import { LoggedFoodResponse } from "@/interfaces/api/health-tracker/response/logged-food.interface";
import { LoggedFoodRequest } from "@/interfaces/api/health-tracker/request/logged-food.interface";

const healthTrackerApi = fitApi.injectEndpoints({
	endpoints: (build) => ({
		searchFood: build.mutation<FoodSearchResponse, FoodSearchRequest>({
			query: (body) => ({
				url: "/food-search",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
		}),
		foodLog: build.mutation<void, SaveFoodLogRequest>({
			query: (body) => ({
				url: "/food-log",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
		}),
		loggedFood: build.query<LoggedFoodResponse[], LoggedFoodRequest>({
			query: ({ Email }) => `/logged-food?Email=${Email}`,
		}),
	}),
});

export const { useLoggedFoodQuery, useSearchFoodMutation, useFoodLogMutation } =
	healthTrackerApi;
