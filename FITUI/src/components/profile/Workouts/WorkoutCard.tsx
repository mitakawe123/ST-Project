import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { EditWorkoutModal } from "@/components/workout/EditWorkoutModal";
import { Pencil, Trash2, Dumbbell } from "lucide-react";
import { WorkoutEntry } from "../../../app/slices/profile/profileSlice";
import { useDeleteMyWorkoutMutation, useEditWorkoutMutation } from "@/app/api/workouts/workoutApi";
import { useLoaderContext } from "@/app/context/LoaderContext";
import { MyWorkoutsResponse } from "@/interfaces/api/workouts/response/my-workouts.interface";
import { FC, useState } from "react";
import useToast from "@/app/hooks/useToast";


interface WorkoutCardProps {
    workout: WorkoutEntry;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
    const [isEditingWorkout, setIsEditingWorkout] = useState<number | null>(null);
    const [deleteMyWorkout] = useDeleteMyWorkoutMutation();
    const [editWorkout] = useEditWorkoutMutation();
    const { startLoading, stopLoading } = useLoaderContext();
    const { showToast } = useToast();

    const handleWorkoutDelete = async (id: number) => {
        startLoading();

        await deleteMyWorkout({
            id: id,
        }).unwrap();

        showToast("Successfully deleted workout", "success");
        stopLoading();
    };

    const handleWorkoutEdit = async (workout: MyWorkoutsResponse) => {
        startLoading();

        await editWorkout({
            Id: workout.id,
            Title: workout.workoutName,
            Description: workout.workoutDescription,
            Exercises: workout.exercises,
        });

        showToast("Successfully edited workout", "success");

        stopLoading();
    };

    return (
        <Card>
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
                            onClick={() => setIsEditingWorkout(workout.id)}
                        >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleWorkoutDelete(workout.id)}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                    <EditWorkoutModal
                        isOpen={isEditingWorkout === workout.id}
                        onClose={() => setIsEditingWorkout(null)}
                        onEdit={handleWorkoutEdit}
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
        </Card >
    );
}
export default WorkoutCard;