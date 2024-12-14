import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";
import { MyWorkoutsResponse } from "@/interfaces/api/workouts/response/my-workouts.interface";
import useToast from "@/app/hooks/useToast";

interface Exercise {
	id: string;
	name: string;
	sets: number;
	reps: number;
}

interface EditWorkoutModalProps {
	isOpen: boolean;
	onClose: () => void;
	onEdit: (workout: MyWorkoutsResponse) => void;
	workout: MyWorkoutsResponse;
}

export function EditWorkoutModal({
	isOpen,
	onClose,
	onEdit,
	workout,
}: EditWorkoutModalProps) {
	const { showToast } = useToast();

	const [editedWorkout, setEditedWorkout] =
		useState<MyWorkoutsResponse>(workout);

	useEffect(() => {
		setEditedWorkout(workout);
	}, [workout]);

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setEditedWorkout((prev) => ({ ...prev, [name]: value }));
	};

	const handleExerciseChange = (
		index: number,
		field: keyof Exercise,
		value: string | number
	) => {
		const updatedExercises = [...editedWorkout.exercises];
		if (field === "sets" || field === "reps") {
			value = Math.max(1, Number(value));
		}
		updatedExercises[index] = { ...updatedExercises[index], [field]: value };
		setEditedWorkout((prev) => ({ ...prev, exercises: updatedExercises }));
	};

	const handleAddExercise = () => {
		setEditedWorkout((prev) => ({
			...prev,
			exercises: [
				...prev.exercises,
				{ id: Date.now().toString(), name: "", sets: 1, reps: 1 },
			],
		}));
	};

	const handleRemoveExercise = (index: number) => {
		setEditedWorkout((prev) => ({
			...prev,
			exercises: prev.exercises.filter((_, i) => i !== index),
		}));
	};

	const handleSubmit = () => {
		const validationErrors: string[] = [];

		if (!editedWorkout.workoutName.trim()) {
			validationErrors.push("Please provide a workout name.");
		}
		if (!editedWorkout.workoutDescription.trim()) {
			validationErrors.push("Please provide a workout description.");
		}
		if (editedWorkout.exercises.length === 0) {
			validationErrors.push(
				"Please include at least one exercise in the workout."
			);
		}

		editedWorkout.exercises.forEach((exercise, idx) => {
			if (!exercise.name?.trim()) {
				validationErrors.push(`Exercise ${idx + 1} is missing a name.`);
			}

			if (exercise.reps !== undefined && exercise.reps < 1) {
				validationErrors.push(
					`Exercise ${idx + 1} should have at least 1 rep.`
				);
			}

			if (exercise.sets !== undefined && exercise.sets < 1) {
				validationErrors.push(
					`Exercise ${idx + 1} should have at least 1 set.`
				);
			}
		});

		if (validationErrors.length > 0) {
			validationErrors.forEach((error) => showToast(error, "info"));
			return;
		}

		onEdit(editedWorkout);
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{workout.id ? "Edit Workout" : "Add New Workout"}
					</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="workoutName" className="text-right">
							Name
						</Label>
						<Input
							id="workoutName"
							name="workoutName"
							value={editedWorkout.workoutName}
							onChange={handleInputChange}
							className="col-span-3"
							required
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="workoutDescription" className="text-right">
							Description
						</Label>
						<Textarea
							id="workoutDescription"
							name="workoutDescription"
							value={editedWorkout.workoutDescription}
							onChange={handleInputChange}
							className="col-span-3"
							required
						/>
					</div>
					<div className="grid gap-4">
						<Label>Exercises</Label>
						{editedWorkout.exercises.map((exercise, index) => (
							<div
								key={exercise.name}
								className="grid grid-cols-4 gap-2 items-center"
							>
								<Input
									value={exercise.name}
									onChange={(e) =>
										handleExerciseChange(index, "name", e.target.value)
									}
									placeholder="Name"
									required
								/>
								<Input
									type="number"
									value={exercise.sets}
									onChange={(e) =>
										handleExerciseChange(
											index,
											"sets",
											Math.max(1, parseInt(e.target.value))
										)
									}
									placeholder="Sets"
									required
									min="1"
								/>
								<Input
									type="number"
									value={exercise.reps}
									onChange={(e) =>
										handleExerciseChange(
											index,
											"reps",
											Math.max(1, parseInt(e.target.value))
										)
									}
									placeholder="Reps"
									required
									min="1"
								/>
								<Button
									type="button"
									variant="destructive"
									size="icon"
									onClick={() => handleRemoveExercise(index)}
								>
									<Minus className="h-4 w-4" />
								</Button>
							</div>
						))}
						<Button type="button" variant="outline" onClick={handleAddExercise}>
							<Plus className="h-4 w-4 mr-2" />
							Add Exercise
						</Button>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSubmit}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
