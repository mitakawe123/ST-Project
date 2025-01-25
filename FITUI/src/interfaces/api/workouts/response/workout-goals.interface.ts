import { WorkoutGoal } from "../shared/workout-goals.interface";

export interface MyWorkoutGoalResponse {
	id: number;
	workoutOwnerName: string;
	workoutName: string;
	workoutGoal: WorkoutGoal[];
}
