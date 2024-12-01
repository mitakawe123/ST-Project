import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FoodEntry = {
	id: string;
	name: string;
	calories: number;
};

interface FoodState {
	entries: FoodEntry[];
}

const initialState: FoodState = {
	entries: [],
};

const foodSlice = createSlice({
	name: "foodSlice",
	initialState,
	reducers: {
		addFoodEntries(state, action: PayloadAction<FoodEntry[]>) {
			state.entries = action.payload;
		},
	},
});

export const { addFoodEntries } = foodSlice.actions;

export default foodSlice.reducer;
