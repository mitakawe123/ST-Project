import {
	ChangeEvent,
	FormEvent,
	SyntheticEvent,
	useEffect,
	useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Dumbbell } from "lucide-react";
import { useExerciseSearchQuery } from "@/app/api/workouts/workoutApi";

interface Exercise {
	name: string;
	sets: number;
	reps: number;
}

export default function WorkoutPage() {
	const [workoutName, setWorkoutName] = useState("");
	const [workoutDescription, setWorkoutDescription] = useState("");
	const [exerciseName, setExerciseName] = useState("");
	const [sets, setSets] = useState("");
	const [reps, setReps] = useState("");
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [filteredExercises, setFilteredExercises] = useState<string[]>([]);
	const [showDropdown, setShowDropdown] = useState(false);

	const { data: exerciseSearch, isLoading } = useExerciseSearchQuery({
		Term: exerciseName,
	});

	const handleAddExercise = (e: SyntheticEvent) => {
		e.preventDefault();
		if (exerciseName && sets && reps) {
			setExercises([
				...exercises,
				{ name: exerciseName, sets: Number(sets), reps: Number(reps) },
			]);
			setExerciseName("");
			setSets("");
			setReps("");
		}
	};

	const handleCreateWorkout = (e: FormEvent) => {
		e.preventDefault();
		// Here you would typically send the workout data to your backend
		console.log("Creating workout:", {
			workoutName,
			workoutDescription,
			exercises,
		});
		// Reset the form after creating the workout
		setWorkoutName("");
		setWorkoutDescription("");
		setExercises([]);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!(event.target as Element).closest(".exercise-dropdown")) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Handle the filtering when data is available
	useEffect(() => {
		if (exerciseSearch) {
			const exerciseToLower = exerciseName.toLowerCase();
			const filtered = exerciseSearch.filter((exercise) =>
				exercise.toLowerCase().includes(exerciseToLower)
			);

			console.log(exerciseToLower, filtered[0]?.toLowerCase());
			console.log(filtered);
			if (exerciseToLower !== filtered[0]?.toLowerCase()) {
				setFilteredExercises(filtered);
				setShowDropdown(filtered.length > 0);
			}
		}
	}, [exerciseSearch, exerciseName]);

	const handleExerciseNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setExerciseName(value);

		if (value.length > 0) {
			setShowDropdown(true);
		} else {
			setFilteredExercises([]);
			setShowDropdown(false);
		}
	};

	const handleSelectExercise = (exercise: string) => {
		setExerciseName(exercise);
		setShowDropdown(false);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">My Workouts</h1>
			<Tabs defaultValue="create">
				<TabsList className="mb-4">
					<TabsTrigger value="create">Create Workout</TabsTrigger>
					<TabsTrigger value="your-workouts">View Your Workouts</TabsTrigger>
					<TabsTrigger value="view">View Workouts</TabsTrigger>
				</TabsList>
				<TabsContent value="create">
					<Card>
						<CardHeader>
							<CardTitle>Create a New Workout</CardTitle>
							<CardDescription>
								Design your custom workout routine
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleCreateWorkout} className="space-y-4">
								<div>
									<Label htmlFor="workout-name">Workout Name</Label>
									<Input
										id="workout-name"
										value={workoutName}
										onChange={(e) => setWorkoutName(e.target.value)}
										placeholder="e.g., Full Body Blast"
										required
									/>
								</div>
								<div>
									<Label htmlFor="workout-description">Description</Label>
									<Textarea
										id="workout-description"
										value={workoutDescription}
										onChange={(e) => setWorkoutDescription(e.target.value)}
										placeholder="Describe your workout..."
									/>
								</div>
								<div className="border-t pt-4">
									<h3 className="text-lg font-semibold mb-2">Exercises</h3>
									<form className="mt-4 space-y-2">
										<div className="relative">
											<Input
												value={exerciseName}
												onChange={handleExerciseNameChange}
												placeholder="Exercise name"
												required
											/>
											{showDropdown && (
												<div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg exercise-dropdown">
													{isLoading ? (
														<div className="px-4 py-2">Loading...</div>
													) : (
														filteredExercises.map((exercise, index) => (
															<div
																key={index}
																className="px-4 py-2 cursor-pointer hover:bg-gray-100"
																onClick={() => handleSelectExercise(exercise)}
															>
																{exercise}
															</div>
														))
													)}
												</div>
											)}
										</div>
										<div className="flex space-x-2">
											<Input
												type="number"
												value={sets}
												onChange={(e) => setSets(e.target.value)}
												placeholder="Sets"
												required
											/>
											<Input
												type="number"
												value={reps}
												onChange={(e) => setReps(e.target.value)}
												placeholder="Reps"
												required
											/>
										</div>
										<Button
											type="submit"
											variant="outline"
											onClick={handleAddExercise}
										>
											<PlusCircle className="w-4 h-4 mr-2" />
											Add Exercise
										</Button>
									</form>
								</div>
								{exercises.length > 0 && (
									<div className="mt-4">
										<h4 className="font-semibold mb-2">Added Exercises:</h4>
										<ul className="space-y-1">
											{exercises.map((exercise, index) => (
												<li key={index} className="flex items-center text-sm">
													<Dumbbell className="w-4 h-4 mr-2" />
													<span>{exercise.name} - </span>
													<span className="ml-1">
														{exercise.sets} sets x {exercise.reps} reps
													</span>
												</li>
											))}
										</ul>
									</div>
								)}
								<Button type="submit" className="w-full">
									Create Workout
								</Button>
							</form>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="your-workouts"></TabsContent>
				<TabsContent value="view">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{/* {workouts.map((workout) => (
							<Card key={workout.id}>
								<CardHeader>
									<CardTitle className="flex items-center justify-between">
										<span>{workout.name}</span>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => handleDeleteWorkout(workout.id)}
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</CardTitle>
									<CardDescription>{workout.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<h4 className="font-semibold mb-2">Exercises:</h4>
									<ul className="space-y-1">
										{workout.exercises.map((exercise) => (
											<li
												key={exercise.id}
												className="flex items-center text-sm"
											>
												<Dumbbell className="w-4 h-4 mr-2" />
												<span>{exercise.name} - </span>
												<span className="ml-1">
													{exercise.sets} sets x {exercise.reps} reps
												</span>
											</li>
										))}
									</ul>
									<div className="mt-4 flex items-center text-sm text-muted-foreground">
										<Clock className="w-4 h-4 mr-1" />
										<span>
											Estimated time: {workout.exercises.length * 5} mins
										</span>
									</div>
								</CardContent>
							</Card>
						))} */}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
