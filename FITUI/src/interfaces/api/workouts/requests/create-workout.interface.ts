import { Exercise } from "../shared/exercise.interface";

export interface CreateWorkoutRequest {
	email: string;
	workoutName: string;
	description: string;
	exercises: Exercise[];
}
