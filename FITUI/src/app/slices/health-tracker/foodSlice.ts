import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FoodEntry = {
	id: string;
	name: string;
	calories: number;
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

interface State {
	foodEntries: FoodEntry[];
	fluidEntries: FluidEntry[];
	sleepEntries: SleepEntry[];
}

const initialState: State = {
	fluidEntries: [],
	foodEntries: [],
	sleepEntries: [],
};

const foodSlice = createSlice({
	name: "foodSlice",
	initialState,
	reducers: {
		addFoodEntries(state, action: PayloadAction<FoodEntry[]>) {
			state.foodEntries = action.payload;
		},
		addFluidsEntries(state, action: PayloadAction<FluidEntry[]>) {
			state.fluidEntries = action.payload;
		},
		addSleepEntries(state, action: PayloadAction<SleepEntry[]>) {
			state.sleepEntries = action.payload;
		},
	},
});

export const { addFoodEntries, addFluidsEntries, addSleepEntries } =
	foodSlice.actions;

export default foodSlice.reducer;
