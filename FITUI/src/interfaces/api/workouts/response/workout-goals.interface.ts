import { WorkoutGoal } from "../shared/workout-goals.interface";

export interface MyWorkoutGoalResponse {
	id: number;
	workoutGoalOwnerName: string;
	workoutName: string;
	workoutGoal: WorkoutGoal[];
}
