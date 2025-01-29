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
import { MyWorkoutGoalResponse } from "@/interfaces/api/workouts/response/workout-goals.interface";
import useToast from "@/app/hooks/useToast";

interface Goals {
	goalName: string;
	goalDescription: string;
	goalSets: number;
	goalReps: number;
	goalWeight: number;
}

interface EditGoalModalProps {
	isOpen: boolean;
	onClose: () => void;
	onEdit: (goal: MyWorkoutGoalResponse) => void;
	goal: MyWorkoutGoalResponse;
}

export function EditGoalModal({
	isOpen,
	onClose,
	onEdit,
	goal,
}: EditGoalModalProps) {
	const { showToast } = useToast();

	const [editedWorkoutGoal, setEditedWorkoutGoals] =
		useState<MyWorkoutGoalResponse>(goal);

	useEffect(() => {
		setEditedWorkoutGoals(goal);
	}, [goal]);

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setEditedWorkoutGoals((prev) => ({ ...prev, [name]: value }));
	};

	const handleExerciseChange = (
		index: number,
		field: keyof Goals,
		value: string | number
	) => {
		const updatedExercises = [...editedWorkoutGoal.workoutExercises];
		if (
			field === "goalSets" ||
			field === "goalReps" ||
			field === "goalWeight"
		) {
			value = Math.max(1, Number(value));
		}
		updatedExercises[index] = { ...updatedExercises[index], [field]: value };
		setEditedWorkoutGoals((prev) => ({ ...prev, exercises: updatedExercises }));
	};

	const handleAddExerciseGoal = () => {
		setEditedWorkoutGoals((prev) => ({
			...prev,
			exercises: [
				...prev.workoutExercises,
				{
					id: Date.now().toString(),
					name: "",
					sets: 1,
					reps: 1,
					goalWeight: 40,
				},
			],
		}));
	};

	const handleRemoveExerciseGoal = (index: number) => {
		setEditedWorkoutGoals((prev) => ({
			...prev,
			exercises: prev.workoutExercises.filter((_, i) => i !== index),
		}));
	};

	const handleSubmit = () => {
		const validationErrors: string[] = [];

		if (!editedWorkoutGoal.workoutGoalName.trim()) {
			validationErrors.push("Please provide a workout goal name.");
		}
		if (!editedWorkoutGoal.workoutGoalDescrtiption.trim()) {
			validationErrors.push("Please provide a workout goal description.");
		}
		if (editedWorkoutGoal.workoutExercises.length === 0) {
			validationErrors.push(
				"Please include at least one exercise in the workout goal."
			);
		}

		editedWorkoutGoal.workoutGoal.forEach((goal, idx) => {
			if (!goal.goalName?.trim()) {
				validationErrors.push(`Goal ${idx + 1} is missing a name.`);
			}

			if (goal.goalReps !== undefined && goal.goalReps < 1) {
				validationErrors.push(
					`Goal exercise ${idx + 1} should have at least 1 rep.`
				);
			}

			if (goal.goalSets !== undefined && goal.goalSets < 1) {
				validationErrors.push(
					`Goal exercise ${idx + 1} should have at least 1 set.`
				);
			}
			if (goal.goalWeight !== undefined && goal.goalWeight < 1) {
				validationErrors.push(`Goal weight ${idx + 1} should exist.`);
			}
		});

		if (validationErrors.length > 0) {
			validationErrors.forEach((error) => showToast(error, "info"));
			return;
		}

		onEdit(editedWorkoutGoal);
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{goal.id ? "Edit Workout Goal" : "Add New Workout Goal"}
					</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="workoutName" className="text-right">
							Goal Name
						</Label>
						<Input
							id="workoutGoalName"
							name="workoutGoalName"
							value={editedWorkoutGoal.workoutGoalName}
							onChange={handleInputChange}
							className="col-span-3"
							required
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="workoutGoalDescription" className="text-right">
							Goal Description
						</Label>
						<Textarea
							id="workoutGoalDescription"
							name="workoutGoalDescription"
							value={editedWorkoutGoal.workoutGoalDescrtiption}
							onChange={handleInputChange}
							className="col-span-3"
						/>
					</div>
					<div className="grid gap-4">
						<Label>Goal exercise</Label>
						{editedWorkoutGoal.workoutGoal.map((goal, index) => (
							<div
								key={goal.goalName}
								className="grid grid-cols-4 gap-2 items-center"
							>
								<Input
									value={goal.goalName}
									onChange={(e) =>
										handleExerciseChange(index, "goalName", e.target.value)
									}
									placeholder="Goal Name"
									required
								/>
								<Input
									type="number"
									value={goal.goalSets}
									onChange={(e) =>
										handleExerciseChange(
											index,
											"goalSets",
											Math.max(1, parseInt(e.target.value))
										)
									}
									placeholder="Sets"
									required
									min="1"
								/>
								<Input
									type="number"
									value={goal.goalReps}
									onChange={(e) =>
										handleExerciseChange(
											index,
											"goalReps",
											Math.max(1, parseInt(e.target.value))
										)
									}
									placeholder="Reps"
									required
									min="1"
								/>
								<Input
									type="number"
									value={goal.goalWeight}
									onChange={(e) =>
										handleExerciseChange(
											index,
											"goalWeight",
											Math.max(1, parseInt(e.target.value))
										)
									}
									placeholder="Goal Weight"
									required
									min="1"
								/>
								<Button
									type="button"
									variant="destructive"
									size="icon"
									onClick={() => handleRemoveExerciseGoal(index)}
								>
									<Minus className="h-4 w-4" />
								</Button>
								Remove Goal Exercise
							</div>
						))}
						<Button
							type="button"
							variant="outline"
							onClick={handleAddExerciseGoal}
						>
							<Plus className="h-4 w-4 mr-2" />
							Add Goal Exercise
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
