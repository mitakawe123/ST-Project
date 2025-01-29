import { WorkoutGoal } from "../shared/workout-goals.interface";
import { Exercise } from "../shared/exercise.interface";

export interface MyWorkoutGoalResponse {
	id: number;
	workoutGoalName: string;
	workoutGoalOwnerName: string;
	workoutGoalDescrtiption: string;
	workoutName: string;
	workoutGoal: WorkoutGoal[];
	workoutExercises: Exercise[];
	
}
