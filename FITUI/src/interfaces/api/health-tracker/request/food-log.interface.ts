import { Food } from "../response/food-search.interface";

export interface SaveFoodLogRequest {
	email: string;
	foods: Food[];
}
