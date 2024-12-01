import { Food } from "../shared/food.interface";

export interface LoggedFoodResponse {
	loggedAt: Date;
	foods: Food[];
}
