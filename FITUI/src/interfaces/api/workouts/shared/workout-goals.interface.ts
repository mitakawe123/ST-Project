import { Exercise } from "./exercise.interface";
export interface WorkoutGoal extends Exercise {
	goalName: string;
	description: string;
}
