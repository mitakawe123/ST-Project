import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Utensils, Droplet, Moon, Activity } from "lucide-react";
import FoodSection from "@/components/health-tracker/FoodSection";
import LoggedFoodSection from "@/components/health-tracker/LoggedFoodSection";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import WaterSection from "@/components/health-tracker/WaterSection";

type SleepEntry = {
	id: string;
	hours: number;
	timestamp: Date;
};

type ExerciseEntry = {
	id: string;
	name: string;
	duration: number;
	caloriesBurned: number;
	timestamp: Date;
};

export default function HealthTracker() {
	const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([]);
	const [exerciseEntries, setExerciseEntries] = useState<ExerciseEntry[]>([]);
	const [waterEntries, setWaterEntries] = useState([]);

	const [waterAmount, setWaterAmount] = useState("");
	const [sleepHours, setSleepHours] = useState("");
	const [exerciseName, setExerciseName] = useState("");
	const [exerciseDuration, setExerciseDuration] = useState("");
	const [exerciseCaloriesBurned, setExerciseCaloriesBurned] = useState("");

	const foodEntries = useSelector(
		(state: RootState) => state.foodSlice.entries
	);

	const handleAddSleep = (e: FormEvent) => {
		e.preventDefault();
		if (sleepHours) {
			const newSleep: SleepEntry = {
				id: Date.now().toString(),
				hours: parseFloat(sleepHours),
				timestamp: new Date(),
			};
			setSleepEntries([...sleepEntries, newSleep]);
			setSleepHours("");
		}
	};

	const handleAddExercise = (e: FormEvent) => {
		e.preventDefault();
		if (exerciseName && exerciseDuration && exerciseCaloriesBurned) {
			const newExercise: ExerciseEntry = {
				id: Date.now().toString(),
				name: exerciseName,
				duration: parseInt(exerciseDuration),
				caloriesBurned: parseInt(exerciseCaloriesBurned),
				timestamp: new Date(),
			};
			setExerciseEntries([...exerciseEntries, newExercise]);
			setExerciseName("");
			setExerciseDuration("");
			setExerciseCaloriesBurned("");
		}
	};

	const totalCaloriesConsumed = foodEntries.reduce(
		(sum, entry) => sum + entry.calories,
		0
	);

	const totalWaterConsumed = waterEntries.reduce(
		(sum, entry) => sum + entry.amount,
		0
	);

	const totalSleepHours = sleepEntries.reduce(
		(sum, entry) => sum + entry.hours,
		0
	);

	const totalCaloriesBurned = exerciseEntries.reduce(
		(sum, entry) => sum + entry.caloriesBurned,
		0
	);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Health Tracker</h1>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Calories Consumed
						</CardTitle>
						<Utensils className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{totalCaloriesConsumed.toFixed(0)}
						</div>
						<Progress
							value={(totalCaloriesConsumed / 2000) * 100}
							className="mt-2"
						/>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Water (ml)</CardTitle>
						<Droplet className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{totalWaterConsumed}</div>
						<Progress
							value={(totalWaterConsumed / 2000) * 100}
							className="mt-2"
						/>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Sleep (hours)</CardTitle>
						<Moon className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{totalSleepHours.toFixed(1)}
						</div>
						<Progress value={(totalSleepHours / 8) * 100} className="mt-2" />
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Calories Burned
						</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{totalCaloriesBurned}</div>
					</CardContent>
				</Card>
			</div>
			<Tabs defaultValue="food">
				<TabsList className="mb-4">
					<TabsTrigger value="food">Food</TabsTrigger>
					<TabsTrigger value="logged-food">Logged Food</TabsTrigger>
					<TabsTrigger value="water">Water</TabsTrigger>
					<TabsTrigger value="sleep">Sleep</TabsTrigger>
					<TabsTrigger value="exercise">Cardio</TabsTrigger>
				</TabsList>
				<TabsContent value="food">
					<FoodSection />
				</TabsContent>
				<TabsContent value="logged-food">
					<LoggedFoodSection />
				</TabsContent>
				<TabsContent value="water">
					<WaterSection />
				</TabsContent>
				<TabsContent value="sleep">
					<Card>
						<CardHeader>
							<CardTitle>Track Sleep</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleAddSleep} className="space-y-4">
								<div className="grid gap-2">
									<Label htmlFor="sleep-hours">Sleep Duration (hours)</Label>
									<Input
										id="sleep-hours"
										type="number"
										step="0.1"
										value={sleepHours}
										onChange={(e) => setSleepHours(e.target.value)}
										placeholder="e.g., 7.5"
										required
									/>
								</div>
								<Button type="submit">Add Sleep</Button>
							</form>
							<div className="mt-4">
								<h3 className="font-semibold mb-2">Sleep Log</h3>
								<ul className="space-y-2">
									{sleepEntries.map((entry) => (
										<li
											key={entry.id}
											className="flex justify-between items-center"
										>
											<span>{entry.hours} hours</span>
											<span>{entry.timestamp.toLocaleDateString()}</span>
										</li>
									))}
								</ul>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="exercise">
					<Card>
						<CardHeader>
							<CardTitle>Track Exercise</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleAddExercise} className="space-y-4">
								<div className="grid gap-2">
									<Label htmlFor="exercise-name">Exercise Name</Label>
									<Input
										id="exercise-name"
										value={exerciseName}
										onChange={(e) => setExerciseName(e.target.value)}
										placeholder="e.g., Running"
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="exercise-duration">Duration (minutes)</Label>
									<Input
										id="exercise-duration"
										type="number"
										value={exerciseDuration}
										onChange={(e) => setExerciseDuration(e.target.value)}
										placeholder="e.g., 30"
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="exercise-calories">Calories Burned</Label>
									<Input
										id="exercise-calories"
										type="number"
										value={exerciseCaloriesBurned}
										onChange={(e) => setExerciseCaloriesBurned(e.target.value)}
										placeholder="e.g., 300"
										required
									/>
								</div>
								<Button type="submit">Add Exercise</Button>
							</form>
							<div className="mt-4">
								<h3 className="font-semibold mb-2">Exercise Log</h3>
								<ul className="space-y-2">
									{exerciseEntries.map((entry) => (
										<li
											key={entry.id}
											className="flex justify-between items-center"
										>
											<span>
												{entry.name} - {entry.duration} min
											</span>
											<span>{entry.caloriesBurned} cal</span>
										</li>
									))}
								</ul>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
