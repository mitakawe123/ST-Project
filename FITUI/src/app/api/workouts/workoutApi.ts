import { ExerciseSearchRequest } from "@/interfaces/api/workouts/requests/exercise-search.interface";
import { fitApi } from "../auth/authApi";
import { HttpMethod } from "@/constants/Enumerations";
import { CreateWorkoutRequest } from "@/interfaces/api/workouts/requests/create-workout.interface";

const workoutApi = fitApi.injectEndpoints({
	endpoints: (build) => ({
		exerciseSearch: build.query<string[], ExerciseSearchRequest>({
			query: ({ Term }) => `/exercise-search?Term=${encodeURIComponent(Term)}`,
		}),
		createWorkout: build.mutation<void, CreateWorkoutRequest>({
			query: (body) => ({
				url: "/create-workout",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
		}),
	}),
});

export const { useExerciseSearchQuery, useCreateWorkoutMutation } = workoutApi;
