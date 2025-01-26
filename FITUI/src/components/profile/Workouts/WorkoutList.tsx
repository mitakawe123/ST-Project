import { useMyWorkoutsByDateQuery } from "@/app/api/workouts/workoutApi";
import { addWorkoutEntriesDate, WorkoutEntry } from "@/app/slices/profile/profileSlice";
import { getUser } from "@/utils/utils";
import { RootState } from "@/app/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkoutCard from "./WorkoutCard";

interface WorkoutListProps {
    selectedDate: Date;
    email: string;
    isMine: boolean;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ selectedDate, email, isMine }) => {
    const dispatch = useDispatch();
    const { data: myWorkouts } = useMyWorkoutsByDateQuery({
        Email: email,
        date: selectedDate
    });

    useEffect(() => {
        if (myWorkouts) {
            const workoutEntries = myWorkouts.map((workout) => ({
                id: workout.id,
                workoutName: workout.workoutName,
                workoutDescription: workout.workoutDescription,
                exercises: workout.exercises.map((exercise) => ({
                    name: exercise.name,
                    reps: exercise.reps,
                    sets: exercise.sets,
                }))
            }));

            dispatch(addWorkoutEntriesDate(workoutEntries));
        }
    }, [myWorkouts, selectedDate, dispatch]);
    const workoutEntries = useSelector((state: RootState) => state.profileSlice.workoutEntries);


    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Your Workouts for {selectedDate.toDateString()}</h2>
            {myWorkouts?.length === 0 ? (
                <p>{isMine ? "You haven't created any workouts yet." : "No workouts"}</p>
            ) : (
                <div className="space-y-4">
                    {workoutEntries?.map((workout: WorkoutEntry) => (
                        <WorkoutCard key={workout.id} workout={workout} isMine={isMine} />
                    ))}
                </div>
            )}
        </>
    );
}
export default WorkoutList;