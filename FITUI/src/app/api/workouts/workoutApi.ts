import { ExerciseSearchRequest } from "@/interfaces/api/workouts/requests/exercise-search.interface";
import { fitApi } from "../auth/authApi";

const workoutApi = fitApi.injectEndpoints({
	endpoints: (build) => ({
		exerciseSearch: build.query<string[], ExerciseSearchRequest>({
			query: ({ Term }) => `/exercise-search?Term=${encodeURIComponent(Term)}`,
		}),
	}),
});

export const { useExerciseSearchQuery } = workoutApi;
