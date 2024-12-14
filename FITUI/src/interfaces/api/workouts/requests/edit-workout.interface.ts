import { Exercise } from "../shared/exercise.interface";

export interface EditWorkoutRequest {
	Id: number;
	Title?: string;
	Description?: string;
	Exercises?: Exercise[];
}
