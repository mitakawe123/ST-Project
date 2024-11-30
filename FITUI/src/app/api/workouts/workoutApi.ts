import { ExerciseSearchRequest } from "@/interfaces/api/workouts/requests/exercise-search.interface";
import { fitApi } from "../auth/authApi";
import { HttpMethod } from "@/constants/Enumerations";
import { CreateWorkoutRequest } from "@/interfaces/api/workouts/requests/create-workout.interface";
import { MyWorkoutsReqeust } from "@/interfaces/api/workouts/requests/my-workouts.interface";
import { MyWorkoutsResponse } from "@/interfaces/api/workouts/response/my-workouts.interface";
import { DeleteMyWorkoutRequest } from "@/interfaces/api/workouts/requests/delete-my-workout.interface";
import { TopWorkoutsResponse } from "@/interfaces/api/workouts/response/top-workouts.interface";
import { TopWorkoutsRequest } from "@/interfaces/api/workouts/requests/top-workouts.interface";

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
			invalidatesTags: ["Workouts"],
		}),
		myWorkouts: build.query<MyWorkoutsResponse[], MyWorkoutsReqeust>({
			query: ({ Email }) => `/my-workouts?Email=${encodeURIComponent(Email)}`,
			providesTags: ["Workouts"],
		}),
		deleteMyWorkout: build.mutation<void, DeleteMyWorkoutRequest>({
			query: ({ id }) => ({
				url: `/my-workouts/${id}`,
				method: HttpMethod.DELETE.toString(),
			}),
			invalidatesTags: ["Workouts"],
		}),
		topWorkouts: build.query<TopWorkoutsResponse[], TopWorkoutsRequest>({
			query: ({ Email }) => `/top-workouts?Email=${encodeURIComponent(Email)}`,
		}),
	}),
});

export const {
	useExerciseSearchQuery,
	useMyWorkoutsQuery,
	useTopWorkoutsQuery,
	useCreateWorkoutMutation,
	useDeleteMyWorkoutMutation,
} = workoutApi;
