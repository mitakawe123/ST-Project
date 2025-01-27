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
import { PlusCircle, Dumbbell, Pencil, Trash2, Star } from "lucide-react";
import {
	useCreateWorkoutGoalMutation,
	useCreateWorkoutMutation,
	useDeleteMyWorkoutMutation,
	useEditWorkoutMutation,
	useExerciseSearchQuery,
	useMyWorkoutsQuery,
	useTopWorkoutsQuery,
	useMyGoalsQuery,
	useTopGoalsQuery,
	useGoalSearchQuery,
} from "@/app/api/workouts/workoutApi";
import { getUser } from "@/utils/utils";
import useToast from "@/app/hooks/useToast";
import { useLoaderContext } from "@/app/context/LoaderContext";
import { EditWorkoutModal } from "@/components/workout/EditWorkoutModal";
import { MyWorkoutsResponse } from "@/interfaces/api/workouts/response/my-workouts.interface";

interface Exercise {
	name: string;
	sets: number;
	reps: number;
}

interface WorkoutGoal {
	goalName: string;
	goalDescription: string;
	exerciseName: string;
	goalSets: number;
	goalReps: number;
	goalWeight: number;
}

export default function WorkoutPage() {
	const [workoutName, setWorkoutName] = useState("");
	const [workoutDescription, setWorkoutDescription] = useState("");
	const [exerciseName, setExerciseName] = useState("");
	const [sets, setSets] = useState("");
	const [reps, setReps] = useState("");
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [filteredExercises, setFilteredExercises] = useState<string[]>([]);
	const [filteredGoals, setFilteredGoals] = useState<string[]>([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const [isEditingWorkout, setIsEditingWorkout] = useState(false);

	const [workoutGoals, setWorkoutGoals] = useState<WorkoutGoal[]>([]);
	const [workoutGoalName, setWorkoutGoalName] = useState("");
	const [goalDescription, setWorkoutGoalDescription] = useState("");
	const [goalWeight, setGoalWeight] = useState("");

	const user = getUser();
	const { startLoading, stopLoading } = useLoaderContext();
	const { showToast } = useToast();

	const [createWorkout] = useCreateWorkoutMutation();
	const [createWorkoutGoal] = useCreateWorkoutGoalMutation();

	const [editWorkout] = useEditWorkoutMutation();
	const [deleteMyWorkout] = useDeleteMyWorkoutMutation();

	const { data: exerciseSearch, isLoading } = useExerciseSearchQuery({
		Term: exerciseName,
	});
	const { data: goalSearch } = useGoalSearchQuery({
		Term: workoutGoalName,
	});
	const { data: myWorkouts } = useMyWorkoutsQuery({
		Email: user.Email,
	});
	const { data: topWorkouts } = useTopWorkoutsQuery({
		Email: user.Email,
	});

	const { data: myWorkoutGoals } = useMyGoalsQuery({
		Email: user.Email,
	});
	const { data: topGoals } = useTopGoalsQuery({
		Email: user.Email,
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

	const handleCreateWorkout = async (e: FormEvent) => {
		e.preventDefault();
		startLoading();

		if (exercises.length === 0) {
			showToast("Please add at least one exercise to your workout", "info");
			stopLoading();
			return;
		}

		await createWorkout({
			email: user.Email,
			description: workoutDescription,
			workoutName: workoutName,
			exercises: exercises,
		});

		showToast("Successfully created your workout", "success");

		// Reset the form after creating the workout
		setWorkoutName("");
		setWorkoutDescription("");
		setExercises([]);
		stopLoading();
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

	const handleGoalNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setWorkoutGoalName(value);

		if (value.length > 0) {
			setShowDropdown(true);
		} else {
			setFilteredGoals([]);
			setShowDropdown(false);
		}
	};

	const handleSelectExercise = (exercise: string) => {
		setExerciseName(exercise);
		setShowDropdown(false);
	};

	const handleSelectGoal = (goal: string) => {
		setWorkoutGoalName(goal);
		setShowDropdown(false);
	};

	const handleDelete = async (id: number) => {
		startLoading();

		await deleteMyWorkout({
			id: id,
		}).unwrap();

		showToast("Successfully delete workout", "success");
		stopLoading();
	};

	const handleEdit = async (workout: MyWorkoutsResponse) => {
		startLoading();

		await editWorkout({
			Id: workout.id,
			Title: workout.workoutName,
			Description: workout.workoutDescription,
			Exercises: workout.exercises,
		});

		showToast("Successfully edit workout", "success");

		stopLoading();
	};

	const [starredWorkouts, setStarredWorkouts] = useState<number[]>([]);

	const handleStarWorkout = (workoutId: number) => {
		setStarredWorkouts((prev) =>
			prev.includes(workoutId)
				? prev.filter((id) => id !== workoutId)
				: [...prev, workoutId]
		);
	};

	const handleCreateWorkoutGoal = async (e: FormEvent) => {
		e.preventDefault();
		startLoading();

		if (workoutGoals.length === 0) {
			showToast(
				"Please add at least one goal. We know you can achieve it!",
				"info"
			);
			stopLoading();
			return;
		}

		await createWorkoutGoal({
			Email: user.Email,
			goals: workoutGoals,
		});
	};
	//Handle goal features
	const handleAddWorkoutGoal = (e: SyntheticEvent) => {
		e.preventDefault();
		if (workoutDescription && exerciseName && sets && reps) {
			setWorkoutGoals([
				...workoutGoals,
				{
					goalName: workoutGoalName,
					goalDescription: goalDescription,
					exerciseName: exerciseName,
					goalSets: Number(sets),
					goalReps: Number(reps),
					goalWeight: Number(goalWeight),
				},
			]);

			setWorkoutGoalName("");
			setWorkoutGoalDescription("");
			setExerciseName("");
			setSets("");
			setReps("");
			setGoalWeight("");
		}
	};

	const handleCreateGoal = async (e: FormEvent) => {
		e.preventDefault();
		startLoading();

		if (workoutGoals.length === 0) {
			showToast("Please add at least one goal to your workout", "info");
			stopLoading();
			return;
		}

		await createWorkoutGoal({
			Email: user.Email,
			goals: workoutGoals,
		});

		showToast("Successfully created your goal", "success");

		// Reset the form after creating the goal
		setWorkoutGoals([]);
		stopLoading();
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Workouts</h1>
			<Tabs defaultValue="create">
				<TabsList className="mb-4">
					<TabsTrigger value="create">Create Workout</TabsTrigger>
					<TabsTrigger value="my-workouts">View Your Workouts</TabsTrigger>
					<TabsTrigger value="top-workouts">
						View Community Workouts
					</TabsTrigger>
					<TabsTrigger value="create-goal">Create Goal</TabsTrigger>
					<TabsTrigger value="my-goals">View your Goals</TabsTrigger>
					<TabsTrigger value="workout-goals">View Community Goals</TabsTrigger>
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
										required
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
				<TabsContent value="my-workouts">
					<h2 className="text-2xl font-bold mb-4">Your Workouts</h2>
					{myWorkouts?.length === 0 ? (
						<p>You haven't created any workouts yet.</p>
					) : (
						<div className="space-y-4">
							{myWorkouts?.map((workout) => (
								<Card key={workout.id}>
									<CardHeader>
										<div className="flex justify-between items-start">
											<div>
												<CardTitle>{workout.workoutName}</CardTitle>
												<CardDescription>
													{workout.workoutDescription}
												</CardDescription>
											</div>
											<div className="flex space-x-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => setIsEditingWorkout(true)}
												>
													<Pencil className="w-4 h-4 mr-2" />
													Edit
												</Button>
												<Button
													variant="destructive"
													size="sm"
													onClick={() => handleDelete(workout.id)}
												>
													<Trash2 className="w-4 h-4 mr-2" />
													Delete
												</Button>
											</div>
											<EditWorkoutModal
												isOpen={isEditingWorkout}
												onClose={() => setIsEditingWorkout(false)}
												onEdit={handleEdit}
												workout={workout}
											/>
										</div>
									</CardHeader>
									<CardContent>
										<h3 className="font-semibold mb-2">Exercises:</h3>
										<ul className="space-y-2">
											{workout.exercises.map((exercise, index) => (
												<li key={index} className="flex items-center">
													<Dumbbell className="w-4 h-4 mr-2 text-muted-foreground" />
													<span>
														{exercise.name} - {exercise.sets} sets of{" "}
														{exercise.reps} reps
													</span>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</TabsContent>
				<TabsContent value="top-workouts">
					<h2 className="text-2xl font-bold mb-4">Top Workouts</h2>
					{topWorkouts?.length === 0 ? (
						<p>No top workouts available at the moment.</p>
					) : (
						<div className="space-y-4">
							{topWorkouts?.map((workout) => (
								<Card key={workout.id}>
									<CardHeader>
										<div className="flex justify-between items-start">
											<div>
												<CardTitle>{workout.workoutName}</CardTitle>
												<CardDescription>
													{workout.workoutDescription}
												</CardDescription>
												<p className="text-sm text-muted-foreground mt-1">
													Created by: {workout.workoutOwnerName}
												</p>
											</div>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => handleStarWorkout(workout.id)}
											>
												<Star
													className={`h-5 w-5 ${
														starredWorkouts.includes(workout.id)
															? "fill-yellow-400 text-yellow-400"
															: "text-muted-foreground"
													}`}
												/>
											</Button>
										</div>
									</CardHeader>
									<CardContent>
										<h3 className="font-semibold mb-2">Exercises:</h3>
										<ul className="space-y-2">
											{workout.exercises.map((exercise, index) => (
												<li key={index} className="flex items-center">
													<Dumbbell className="w-4 h-4 mr-2 text-muted-foreground" />
													<span>
														{exercise.name} - {exercise.sets} sets of
														{exercise.reps} reps
													</span>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</TabsContent>
				<TabsContent value="create-goal">
					<Card>
						<CardHeader>
							<CardTitle>Set Your Goal</CardTitle>
							<CardDescription>
								Design your custom
								<span className="font-bold"> goals </span> in order never to
								lose
								<span className="font-bold"> motivation </span>
								and always to be in <span className="font-bold"> shape </span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleAddWorkoutGoal} className="space-y-4">
								<div>
									<Label htmlFor="goal-name">Goal Name</Label>
									<Input
										id="goal-name"
										value={workoutGoalName}
										onChange={(e) => setWorkoutGoalName(e.target.value)}
										placeholder="e.g., Lose Body Fat"
										required
									/>
								</div>
								<div>
									<Label htmlFor="goal-description">Description</Label>
									<Textarea
										id="goal-description"
										value={goalDescription}
										onChange={(e) => setWorkoutGoalDescription(e.target.value)}
										placeholder="Describe what you want to achive..."
										required
									/>
								</div>
								<div className="border-t pt-4">
									<h3 className="text-lg font-semibold mb-2">Goals</h3>
									<form className="mt-4 space-y-2">
										<div className="relative space-y-2">
											<Input
												value={workoutGoalName}
												onChange={handleGoalNameChange}
												placeholder="Goal name"
												required
											/>
											<Input
												value={exerciseName}
												onChange={handleExerciseNameChange}
												placeholder="Excercise imrovment name"
												required
											/>

											{showDropdown && (
												<div className="absolute z-10 w-full mt-1 bg-lime-50 border border-gray-300 rounded-md shadow-lg exercise-dropdown">
													{isLoading ? (
														<div className="px-4 py-2">Loading...</div>
													) : (
														filteredGoals.map((goal, index) => (
															<div
																key={index}
																className="px-4 py-2 cursor-pointer hover:bg-gray-100"
																onClick={() => handleSelectGoal(goal)}
															>
																{goal}
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
											<Input
												type="number"
												value={goalWeight}
												onChange={(e) => setGoalWeight(e.target.value)}
												placeholder="Desired Weigth"
												required
											/>
										</div>
										<Button
											type="submit"
											variant="outline"
											onClick={handleAddWorkoutGoal}
										>
											<PlusCircle className="w-4 h-4 mr-2" />
											Add Goal
										</Button>
									</form>
								</div>
								{workoutGoals.length > 0 && (
									<div className="mt-4">
										<h4 className="font-semibold mb-2">Added Goals:</h4>
										<ul className="space-y-1">
											{workoutGoals.map((goal, index) => (
												<li key={index} className="flex items-center text-sm">
													<Dumbbell className="w-4 h-4 mr-2" />
													<span>{goal.goalName} - </span>
													<span className="ml-1">
														{goal.goalSets} sets x {goal.goalReps} reps -{" "}
														{goal.goalWeight} kg
													</span>
												</li>
											))}
										</ul>
									</div>
								)}
								<Button type="submit" className="w-full">
									Set Goals
								</Button>
							</form>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="my-goals">
					<h2 className="text-2xl font-bold mb-4">Your Goals</h2>
					<Card>
						<CardHeader>
							<CardTitle> </CardTitle>
							<CardDescription></CardDescription>
						</CardHeader>
						<CardContent></CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
