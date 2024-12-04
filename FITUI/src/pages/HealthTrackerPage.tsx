import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Utensils, Droplet, Moon, Activity } from "lucide-react";
import FoodSection from "@/components/health-tracker/FoodSection";
import LoggedFoodSection from "@/components/health-tracker/LoggedFoodSection";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import FluidsSection from "@/components/health-tracker/FluidsSection";
import SleepSection from "@/components/health-tracker/SleepSection";

export default function HealthTracker() {
	const foodEntries = useSelector(
		(state: RootState) => state.foodSlice.foodEntries
	);

	const fluidEntries = useSelector(
		(state: RootState) => state.foodSlice.fluidEntries
	);

	const sleepEntries = useSelector(
		(state: RootState) => state.foodSlice.sleepEntries
	);

	const totalCaloriesConsumed = foodEntries.reduce(
		(sum, entry) => sum + entry.calories,
		0
	);

	const totalFluidsConsumed = fluidEntries.reduce(
		(sum, entry) => sum + entry.amount,
		0
	);

	const totalSleepHours = sleepEntries.reduce(
		(sum, entry) => sum + entry.hours,
		0
	);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Health Tracker</h1>
			<div className="grid gap-4 lg:grid-cols-3 mb-8">
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
						<div className="text-2xl font-bold">{totalFluidsConsumed}</div>
						<Progress
							value={(totalFluidsConsumed / 2000) * 100}
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
			</div>
			<Tabs defaultValue="food">
				<TabsList className="mb-4">
					<TabsTrigger value="food">Food</TabsTrigger>
					<TabsTrigger value="logged-food">Logged Food</TabsTrigger>
					<TabsTrigger value="fluids">Fluids</TabsTrigger>
					<TabsTrigger value="sleep">Sleep</TabsTrigger>
				</TabsList>
				<TabsContent value="food">
					<FoodSection />
				</TabsContent>
				<TabsContent value="logged-food">
					<LoggedFoodSection />
				</TabsContent>
				<TabsContent value="fluids">
					<FluidsSection />
				</TabsContent>
				<TabsContent value="sleep">
					<SleepSection />
				</TabsContent>
			</Tabs>
		</div>
	);
}
