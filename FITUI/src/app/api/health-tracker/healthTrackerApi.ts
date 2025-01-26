import { HttpMethod } from "@/constants/Enumerations";
import { fitApi } from "../auth/authApi";
import { FoodSearchResponse } from "@/interfaces/api/health-tracker/response/food-search.interface";
import { FoodSearchRequest } from "@/interfaces/api/health-tracker/request/food-search.interface";
import { SaveFoodLogRequest } from "@/interfaces/api/health-tracker/request/food-log.interface";
import { LoggedFoodResponse } from "@/interfaces/api/health-tracker/response/logged-food.interface";
import { LoggedFoodRequest } from "@/interfaces/api/health-tracker/request/logged-food.interface";
import { AddFluidsRequest } from "@/interfaces/api/health-tracker/request/add-fluids.interface";
import { LoggedFluidsResponse } from "@/interfaces/api/health-tracker/response/logged-fluids.interface";
import { LoggedFluidsRequest } from "@/interfaces/api/health-tracker/request/logged-fluids.interface";
import { LoggedFluidsByDateRequest } from "@/interfaces/api/health-tracker/request/logged-fluids-date.interface";
import { AddSleepRequest } from "@/interfaces/api/health-tracker/request/add-sleep.interface";
import { LoggedSleepRequest } from "@/interfaces/api/health-tracker/request/logged-sleep.interface";
import { LoggedSleepResponse } from "@/interfaces/api/health-tracker/response/logged-sleep.interface";
import { LoggedSleepByDateRequest } from "@/interfaces/api/health-tracker/request/logged-sleep-date.interface";
import { LoggedFoodByDateRequest } from "@/interfaces/api/health-tracker/request/logged-food-date.interface";
 
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
		loggedFoodByDate: build.query<LoggedFoodResponse[], LoggedFoodByDateRequest>({
			query: ({ Email, date }) => {
			const queryParams = new URLSearchParams({ Email });
			if (date) {
				const localDate = new Date(date);
				localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
				queryParams.append("Date", localDate.toISOString().split("T")[0]);
			}
			return `/logged-food-by-date?${queryParams.toString()}`;
			},
		}),
		loggedFluids: build.query<LoggedFluidsResponse[], LoggedFluidsRequest>({
			query: ({ Email }) => `/logged-fluids?Email=${Email}`,
			providesTags: ["Fluids"],
		}),
		loggedFluidsByDate: build.query<LoggedFluidsResponse[], LoggedFluidsByDateRequest>({
			query: ({ Email, date }) => {
			const queryParams = new URLSearchParams({ Email });
			if (date) {
				const localDate = new Date(date);
				localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
				queryParams.append("Date", localDate.toISOString().split("T")[0]);
			}
			return `/logged-fluids-by-date?${queryParams.toString()}`;
			},
    		providesTags: ["Fluids"],
		}),
		addFluids: build.mutation<void, AddFluidsRequest>({
			query: (body) => ({
				url: "/add-fluids",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
			invalidatesTags: ["Fluids"],
		}),
		loggedSleep: build.query<LoggedSleepResponse[], LoggedSleepRequest>({
			query: ({ Email }) => `/logged-sleep?Email=${Email}`,
			providesTags: ["Sleep"],
		}),
		loggedSleepByDate: build.query<LoggedSleepResponse[], LoggedSleepByDateRequest>({
			query: ({ Email, date }) => {
			const queryParams = new URLSearchParams({ Email });
			if (date) {
				const localDate = new Date(date);
				localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
				queryParams.append("Date", localDate.toISOString().split("T")[0]);
			}
			return `/logged-sleep-by-date?${queryParams.toString()}`;
			},
    		providesTags: ["Sleep"],
		}),
		addSleep: build.mutation<void, AddSleepRequest>({
			query: (body) => ({
				url: "/add-sleep",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
			invalidatesTags: ["Sleep"],
		}),
	}),
});
 
export const {
	useLoggedFoodQuery,
	useSearchFoodMutation,
	useFoodLogMutation,
	useAddFluidsMutation,
	useLoggedFluidsQuery,
	useAddSleepMutation,
	useLoggedSleepQuery,
	useLoggedFluidsByDateQuery,
	useLoggedSleepByDateQuery,
	useLoggedFoodByDateQuery,
} = healthTrackerApi;
