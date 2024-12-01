import { FC, useEffect, useMemo } from "react";
import { useLoggedFoodQuery } from "@/app/api/health-tracker/healthTrackerApi";
import { getUser } from "@/utils/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Food } from "@/interfaces/api/health-tracker/shared/food.interface";
import { useDispatch } from "react-redux";
import { addFoodEntries } from "@/app/slices/health-tracker/foodSlice";

const LoggedFoodSection: FC = () => {
	const dispatch = useDispatch();
	const user = getUser();
	const {
		data: loggedFood,
		isLoading,
		error,
	} = useLoggedFoodQuery(
		{
			Email: user.Email,
		},
		{
			refetchOnMountOrArgChange: true,
		}
	);

	const groupedFoods = useMemo(() => {
		if (!loggedFood) return {};

		return loggedFood.reduce((acc: { [key: string]: Food[] }, entry) => {
			const date = new Date(entry.loggedAt).toLocaleDateString();
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(...entry.foods);
			return acc;
		}, {});
	}, [loggedFood]);

	useEffect(() => {
		if (!loggedFood) return;

		const newFoodEntries = loggedFood.flatMap((entry) =>
			entry.foods.map((food) => ({
				id: crypto.randomUUID(),
				name: food.food_name,
				calories: food.nf_calories,
			}))
		);

		dispatch(addFoodEntries(newFoodEntries));
	}, [loggedFood, dispatch]);

	const calculateDailyTotals = (foods: Food[]) => {
		return foods.reduce(
			(totals, food) => ({
				calories: totals.calories + food.nf_calories,
				protein: totals.protein + food.nf_protein,
				carbs: totals.carbs + food.nf_total_carbohydrate,
				fat: totals.fat + food.nf_total_fat,
				fiber: totals.fiber + food.nf_dietary_fiber,
			}),
			{ calories: 0, protein: 0, carbs: 0, fiber: 0, fat: 0 }
		);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error loading food log</div>;
	}

	return (
		<div className="w-full max-w-4xl mx-auto space-y-6">
			<h2 className="text-2xl font-bold mb-4">Food Log History</h2>
			{Object.entries(groupedFoods).map(([date, foods]) => {
				const dailyTotals = calculateDailyTotals(foods);
				return (
					<Card key={date} className="w-full">
						<CardHeader>
							<CardTitle>{date}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="mb-4">
								<h3 className="font-semibold">Daily Totals:</h3>
								<p>Calories: {dailyTotals.calories.toFixed(1)}</p>
								<p>Protein: {dailyTotals.protein.toFixed(1)}g</p>
								<p>Carbs: {dailyTotals.carbs.toFixed(1)}g</p>
								<p>Fiber: {dailyTotals.fiber.toFixed(1)}</p>
								<p>Fat: {dailyTotals.fat.toFixed(1)}g</p>
							</div>
							<ScrollArea className="h-[300px]">
								<ul className="space-y-2">
									{foods.map((food, index) => (
										<li
											key={index}
											className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded"
										>
											<img
												src={food.photo.thumb}
												alt={food.food_name}
												className="w-12 h-12 object-cover rounded"
											/>
											<div className="flex-grow">
												<h4 className="font-medium">{food.food_name}</h4>
												<p className="text-sm text-gray-600">
													{food.serving_qty} serving (
													{food.serving_weight_grams}g)
												</p>
											</div>
											<div className="text-right">
												<p className="font-medium">
													{food.nf_calories.toFixed(1)} cal
												</p>
												<p className="text-sm text-gray-600">
													P: {food.nf_protein.toFixed(1)}g | C:{" "}
													{food.nf_total_carbohydrate.toFixed(1)}g | F:{" "}
													{food.nf_total_fat.toFixed(1)}g
												</p>
											</div>
										</li>
									))}
								</ul>
							</ScrollArea>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
};

export default LoggedFoodSection;
