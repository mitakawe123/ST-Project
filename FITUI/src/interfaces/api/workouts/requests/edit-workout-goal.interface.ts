import { Exercise } from "../shared/exercise.interface";

export interface EditWorkoutGoalRequest {
	Id: number;
	GoalTitle?: string;
	GoalDescription?: string;
	Exercises?: Exercise[];
}
