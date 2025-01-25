import { Exercise } from "../shared/exercise.interface";

export interface TopGoalsResponse {
    id: number;
    goalOwnerName: string;
    goalName: string;
    goalDescription: string;
    exercises: Exercise[];
}
