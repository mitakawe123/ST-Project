import React, { useState, useEffect } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Food } from "@/interfaces/api/health-tracker/response/food-search.interface";
import {
	useFoodLogMutation,
	useSearchFoodMutation,
} from "@/app/api/health-tracker/healthTrackerApi";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import useToast from "@/app/hooks/useToast";
import { ScrollArea } from "../ui/scroll-area";
import { getUser } from "@/utils/utils";
import { useLoaderContext } from "@/app/context/LoaderContext";

const FoodSection: React.FC = () => {
	const [foodName, setFoodName] = useState("");
	const [foods, setFoods] = useState<Food[]>([]);
	const [selectedFood, setSelectedFood] = useState<Food | null>(null);
	const [foodLog, setFoodLog] = useState<Food[]>([]);

	const [searchFood] = useSearchFoodMutation();
	const [saveFoodLog] = useFoodLogMutation();

	const user = getUser();
	const { showToast } = useToast();
	const { startLoading, stopLoading } = useLoaderContext();

	useEffect(() => {
		if (foodName.length > 2) {
			const delayDebounceFn = setTimeout(() => {
				handleFoodSearch();
			}, 300);

			return () => clearTimeout(delayDebounceFn);
		}
	}, [foodName]);

	const handleFoodSearch = async () => {
		try {
			const result = await searchFood({ query: foodName }).unwrap();
			setFoods(result.foods);
			setSelectedFood(null);
		} catch (error) {
			showToast("Please write a valid food", "error");
		}
	};

	const handleFoodSelect = (value: string) => {
		const food = foods.find((f) => f.food_name === value);
		if (food) {
			setSelectedFood(food);
			setFoodName("");
		}
	};

	const handleAddToLog = () => {
		if (selectedFood) {
			setFoodLog((prevLog) => [...prevLog, selectedFood]);
			setSelectedFood(null);
			setFoods([]);
			showToast("Food added to log", "success");
		}
	};

	const handleSaveFoodLog = async () => {
		if (foodLog.length === 0) {
			showToast("No foods to save", "error");
			return;
		}

		startLoading();

		try {
			await saveFoodLog({
				email: user.Email,
				foods: foodLog,
			});

			showToast("Food log saved successfully", "success");
			setFoodLog([]);
		} catch (error) {
			showToast("Failed to save food log", "error");
		} finally {
			stopLoading();
		}
	};

	return (
		<div className="w-full max-w-4xl mx-auto space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Track Food</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="grid gap-2">
							<Label htmlFor="food-name">Food Name</Label>
							<Input
								id="food-name"
								value={foodName}
								onChange={(e) => setFoodName(e.target.value)}
								placeholder="Start typing to search for a food..."
							/>
						</div>
						{foods.length > 0 && (
							<Select onValueChange={handleFoodSelect}>
								<SelectTrigger>
									<SelectValue placeholder="Select a food" />
								</SelectTrigger>
								<SelectContent>
									{foods.map((food) => (
										<SelectItem key={food.food_name} value={food.food_name}>
											{food.food_name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
						{selectedFood && (
							<div className="mt-4 p-4 bg-secondary rounded-lg">
								<h3 className="font-semibold mb-2 text-lg">
									{selectedFood.food_name}
								</h3>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<p>
											Serving: {selectedFood.serving_qty} (
											{selectedFood.serving_weight_grams}g)
										</p>
										<p>Calories: {selectedFood.nf_calories.toFixed(1)}</p>
										<p>Fat: {selectedFood.nf_total_fat.toFixed(1)}g</p>
										<p>
											Saturated Fat: {selectedFood.nf_saturated_fat.toFixed(1)}g
										</p>
										<p>Cholesterol: {selectedFood.nf_cholesterol}mg</p>
										<p>Sodium: {selectedFood.nf_sodium.toFixed(1)}mg</p>
										<p>
											Carbs: {selectedFood.nf_total_carbohydrate.toFixed(1)}g
										</p>
										<p>
											Dietary Fiber: {selectedFood.nf_dietary_fiber.toFixed(1)}g
										</p>
										<p>Sugars: {selectedFood.nf_sugars.toFixed(1)}g</p>
										<p>Protein: {selectedFood.nf_protein.toFixed(1)}g</p>
										<p>Potassium: {selectedFood.nf_potassium.toFixed(1)}mg</p>
									</div>
									<div className="flex justify-end">
										{selectedFood.photo && (
											<img
												src={selectedFood.photo.thumb}
												alt={selectedFood.food_name}
												className="w-24 h-24 object-cover rounded-md"
											/>
										)}
									</div>
								</div>
								<Button className="mt-4 w-full" onClick={handleAddToLog}>
									Add to Food Log
								</Button>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Food Log</CardTitle>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[300px] w-full rounded-md border p-4">
						{foodLog.length === 0 ? (
							<p className="text-center text-muted-foreground">
								No foods logged yet.
							</p>
						) : (
							<ul className="space-y-2">
								{foodLog.map((food, index) => (
									<li
										key={index}
										className="flex justify-between items-center p-2 hover:bg-secondary rounded-md"
									>
										<div>
											<span className="font-medium">{food.food_name}</span>
											<span className="text-sm text-muted-foreground ml-2">
												({food.serving_qty} serving, {food.serving_weight_grams}
												g)
											</span>
										</div>
										<div className="text-sm">
											<span className="font-medium">
												{food.nf_calories.toFixed(1)} cal
											</span>
											<span className="text-muted-foreground ml-2">
												P: {food.nf_protein.toFixed(1)}g | C:{" "}
												{food.nf_total_carbohydrate.toFixed(1)}g | F:{" "}
												{food.nf_total_fat.toFixed(1)}g
											</span>
										</div>
									</li>
								))}
							</ul>
						)}
					</ScrollArea>
					<Button
						className="mt-4 w-full"
						onClick={handleSaveFoodLog}
						disabled={foodLog.length === 0}
					>
						Save Today's Food Log
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default FoodSection;
