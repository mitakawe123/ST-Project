import { Exercise } from "../shared/exercise.interface";

export interface MyWorkoutsResponse {
	id: number;
	workoutName: string;
	workoutDescription: string;
	exercises: Exercise[];
}
