import { WorkoutGoal } from "../shared/workout-goals.interface";
export interface CreateWorkoutGoalRequest {
	Email: string;
	goals: WorkoutGoal[];
}
