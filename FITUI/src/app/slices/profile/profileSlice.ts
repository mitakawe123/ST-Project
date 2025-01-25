import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 
 
type Exercise = {
	name: string;
	reps: number;
	sets: number;
};
 
type Photo = {
	thumb:string;
	highres:string;
};
 
type FoodEntry = {
  id: string;
  name: string;
  brand?: string | null;
  servingQty: number;
  servingWeightGrams: number;
  calories: number;
  totalFat: number;
  saturatedFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbohydrate: number;
  dietaryFiber: number;
  sugars: number;
  protein: number;
  potassium: number;
  photo: Photo;
};
 
 
type FluidEntry = {
	id: number;
	amount: number;
	type: number;
};
 
type SleepEntry = {
	id: number;
	hours: number;
	type: number;
};
 
export type WorkoutEntry = {
    id:number, 
    workoutName: string, 
    workoutDescription: string, 
    exercises: Exercise[];
};
 
interface State {
	foodEntries: FoodEntry[];
	fluidEntries: FluidEntry[];
	sleepEntries: SleepEntry[];
    workoutEntries: WorkoutEntry[];
}
 
const initialState: State = {
	fluidEntries: [],
	foodEntries: [],
	sleepEntries: [],
     workoutEntries: []
};
 
const profileSlice = createSlice({
	name: "profileSlice",
	initialState,
	reducers: {
		addFoodEntriesDate(state, action: PayloadAction<FoodEntry[]>) {
			state.foodEntries = action.payload;
		},
		addFluidsEntriesDate(state, action: PayloadAction<FluidEntry[]>) {
			state.fluidEntries = action.payload;
		},
		addSleepEntriesDate(state, action: PayloadAction<SleepEntry[]>) {
			state.sleepEntries = action.payload;
		},
        addWorkoutEntriesDate(state, action: PayloadAction<WorkoutEntry[]>) {
            state.workoutEntries = action.payload;
        },
	},
});
 
export const { addFoodEntriesDate, addFluidsEntriesDate, addSleepEntriesDate,addWorkoutEntriesDate  } =
	profileSlice.actions;
 
export default profileSlice.reducer;