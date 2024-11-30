export interface CreateWorkoutRequest {
	email: string;
	workoutName: string;
	description: string;
	exercises: Exercise[];
}

interface Exercise {
	name: string;
	reps: number;
	sets: number;
}
