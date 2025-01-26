import { ExerciseSearchRequest } from "@/interfaces/api/workouts/requests/exercise-search.interface";
import { fitApi } from "../auth/authApi";
import { HttpMethod } from "@/constants/Enumerations";
import { CreateWorkoutRequest } from "@/interfaces/api/workouts/requests/create-workout.interface";
import { MyWorkoutsReqeust } from "@/interfaces/api/workouts/requests/my-workouts.interface";
import { MyWorkoutsResponse } from "@/interfaces/api/workouts/response/my-workouts.interface";
import { DeleteMyWorkoutRequest } from "@/interfaces/api/workouts/requests/delete-my-workout.interface";
import { TopWorkoutsResponse } from "@/interfaces/api/workouts/response/top-workouts.interface";
import { TopWorkoutsRequest } from "@/interfaces/api/workouts/requests/top-workouts.interface";
import { EditWorkoutRequest } from "@/interfaces/api/workouts/requests/edit-workout.interface";
import { MyWorkoutsByDateRequest } from "@/interfaces/api/workouts/requests/my-workouts-date.interface";
import { CreateWorkoutGoalRequest } from "@/interfaces/api/workouts/requests/create-workout-goals.inteface";
import { MyWorkoutGoalResponse } from "@/interfaces/api/workouts/response/workout-goals.interface";
import { MyWorkoutGoalsReqeust } from "@/interfaces/api/workouts/requests/my-workout-goals.interface";
import { TopGoalsRequest } from "@/interfaces/api/workouts/requests/top-goals.interface";
import { TopGoalsResponse } from "@/interfaces/api/workouts/response/top-goals.interface";

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
		createWorkoutGoal: build.mutation<void, CreateWorkoutGoalRequest>({
			query: (body) => ({
				url: "/create-workout-goal",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
			invalidatesTags: ["Workouts"],
		}),
		myGoals: build.query<MyWorkoutGoalResponse[], MyWorkoutGoalsReqeust>({
			query: ({ Email }) =>
				`my-workout-goals?Email=${encodeURIComponent(Email)}}`,
			providesTags: ["Workouts"],
		}),
		myWorkouts: build.query<MyWorkoutsResponse[], MyWorkoutsReqeust>({
			query: ({ Email }) => `/my-workouts?Email=${encodeURIComponent(Email)}`,
			providesTags: ["Workouts"],
		}),
		myWorkoutsByDate: build.query<
			MyWorkoutsResponse[],
			MyWorkoutsByDateRequest
		>({
			query: ({ Email, date }) => {
				const queryParams = new URLSearchParams({ Email });
				if (date) {
					const localDate = new Date(date);
					localDate.setMinutes(
						localDate.getMinutes() - localDate.getTimezoneOffset()
					);
					queryParams.append("Date", localDate.toISOString().split("T")[0]);
				}
				return `/my-workouts-date?${queryParams.toString()}`;
			},
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
		topGoals: build.query<TopGoalsResponse[], TopGoalsRequest>({
			query: ({ Email }) => `/top-goals?Email=${encodeURIComponent(Email)}`,
			providesTags: ["Workouts"],
		}),
		editWorkout: build.mutation<void, EditWorkoutRequest>({
			query: (body) => ({
				url: "/edit-workout",
				method: HttpMethod.PATCH.toString(),
				body: body,
			}),
			invalidatesTags: ["Workouts"],
		}),
	}),
});

export const {
	useExerciseSearchQuery,
	useMyWorkoutsQuery,
	useTopWorkoutsQuery,
	useCreateWorkoutMutation,
	useCreateWorkoutGoalMutation,
	useMyGoalsQuery,
	useTopGoalsQuery,
	useDeleteMyWorkoutMutation,
	useEditWorkoutMutation,
	useMyWorkoutsByDateQuery,
} = workoutApi;
