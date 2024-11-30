import { Exercise } from "../shared/exercise.interface";

export interface TopWorkoutsResponse {
	id: number;
	workoutOwnerName: string;
	workoutName: string;
	workoutDescription: string;
	exercises: Exercise[];
}
