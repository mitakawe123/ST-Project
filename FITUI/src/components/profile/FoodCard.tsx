import { RootState } from "@/app/store";
import { Utensils } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useLoggedFoodByDateQuery } from "@/app/api/health-tracker/healthTrackerApi";
import { addFoodEntriesDate } from "@/app/slices/profile/profileSlice";
import { useEffect } from "react";
import { getUser } from "@/utils/utils";
interface FoodCardProps {
	selectedDate: Date;
}

const FoodCard: React.FC<FoodCardProps> = ({ selectedDate }) => {
	const dispatch = useDispatch();
	const user = getUser();

	const { data: loggedFood } = useLoggedFoodByDateQuery(
		{
			Email: user.Email,
			date: selectedDate,
		},
		{ refetchOnMountOrArgChange: true }
	);

	useEffect(() => {
		if (loggedFood) {
			const foodEntries = loggedFood.flatMap((entry) =>
				entry.foods.map((food) => ({
					id: crypto.randomUUID(),
					name: food.food_name,
					brand: food.brand_name,
					servingQty: food.serving_qty,
					servingWeightGrams: food.serving_weight_grams,
					calories: food.nf_calories,
					totalFat: food.nf_total_fat,
					saturatedFat: food.nf_saturated_fat,
					cholesterol: food.nf_cholesterol,
					sodium: food.nf_sodium,
					totalCarbohydrate: food.nf_total_carbohydrate,
					dietaryFiber: food.nf_dietary_fiber,
					sugars: food.nf_sugars,
					protein: food.nf_protein,
					potassium: food.nf_potassium,
					photo: {
						thumb: food.photo.thumb,
						highres: food.photo.highres,
					},
				}))
			);
			dispatch(addFoodEntriesDate(foodEntries));
		}
	}, [loggedFood, selectedDate, dispatch]);

	const foodEntries = useSelector(
		(state: RootState) => state.profileSlice.foodEntries
	);
	const totalMacros = foodEntries.reduce(
		(acc, food) => ({
			calories: acc.calories + food.calories,
			protein: acc.protein + food.protein,
			carbs: acc.carbs + food.totalCarbohydrate,
			fiber: acc.fiber + food.dietaryFiber,
			fat: acc.fat + food.totalFat,
		}),
		{ calories: 0, protein: 0, carbs: 0, fiber: 0, fat: 0 }
	);
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-md font-bold">Total Macros</CardTitle>
				<Utensils className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="mb-4">
					<p>Calories: {totalMacros.calories.toFixed(1)}</p>
					<p>Protein: {totalMacros.protein.toFixed(1)}g</p>
					<p>Carbs: {totalMacros.carbs.toFixed(1)}g</p>
					<p>Fiber: {totalMacros.fiber.toFixed(1)}</p>
					<p>Fat: {totalMacros.fat.toFixed(1)}g</p>
				</div>
			</CardContent>
		</Card>
	);
};
export default FoodCard;
