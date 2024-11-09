import React, { useState } from "react";
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
import { PlusCircle, Dumbbell, Clock, Trash2 } from "lucide-react";

type Exercise = {
	id: string;
	name: string;
	sets: number;
	reps: number;
};

type Workout = {
	id: string;
	name: string;
	description: string;
	exercises: Exercise[];
};

export default function WorkoutPage() {
	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const [workoutName, setWorkoutName] = useState("");
	const [workoutDescription, setWorkoutDescription] = useState("");
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [exerciseName, setExerciseName] = useState("");
	const [sets, setSets] = useState("");
	const [reps, setReps] = useState("");

	const handleAddExercise = (e: React.FormEvent) => {
		e.preventDefault();
		if (exerciseName && sets && reps) {
			const newExercise: Exercise = {
				id: Date.now().toString(),
				name: exerciseName,
				sets: parseInt(sets),
				reps: parseInt(reps),
			};
			setExercises([...exercises, newExercise]);
			setExerciseName("");
			setSets("");
			setReps("");
		}
	};

	const handleCreateWorkout = (e: React.FormEvent) => {
		e.preventDefault();
		if (workoutName && exercises.length > 0) {
			const newWorkout: Workout = {
				id: Date.now().toString(),
				name: workoutName,
				description: workoutDescription,
				exercises: exercises,
			};
			setWorkouts([...workouts, newWorkout]);
			setWorkoutName("");
			setWorkoutDescription("");
			setExercises([]);
		}
	};

	const handleDeleteWorkout = (id: string) => {
		setWorkouts(workouts.filter((workout) => workout.id !== id));
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
									{exercises.map((exercise) => (
										<div
											key={exercise.id}
											className="flex items-center justify-between py-2"
										>
											<span>{exercise.name}</span>
											<span>
												{exercise.sets} sets x {exercise.reps} reps
											</span>
										</div>
									))}
									<form onSubmit={handleAddExercise} className="mt-4 space-y-2">
										<Input
											value={exerciseName}
											onChange={(e) => setExerciseName(e.target.value)}
											placeholder="Exercise name"
											required
										/>
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
										<Button type="submit" variant="outline">
											<PlusCircle className="w-4 h-4 mr-2" />
											Add Exercise
										</Button>
									</form>
								</div>
								<Button type="submit" className="w-full">
									Create Workout
								</Button>
							</form>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="view">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{workouts.map((workout) => (
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
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
