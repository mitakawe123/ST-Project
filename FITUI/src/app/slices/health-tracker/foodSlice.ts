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
		addFoods(state, action: PayloadAction<FoodEntry[]>) {
			state.entries = [...state.entries, ...action.payload];
		},
	},
});

export const { addFoods } = foodSlice.actions;

export default foodSlice.reducer;
