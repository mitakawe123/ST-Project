import { useLoggedSleepByDateQuery } from "@/app/api/health-tracker/healthTrackerApi";
import { addSleepEntriesDate } from "@/app/slices/profile/profileSlice";
import { RootState } from "@/app/store";
import { getUser } from "@/utils/utils";
import { Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useEffect } from "react";

enum SleepType {
    Awake = 0,
    Light = 1,
    Deep = 2,
    REM = 4,
}

interface SleepCardProps {
    selectedDate: Date;
}

const SleepCard: React.FC<SleepCardProps> = ({ selectedDate }) => {
    const user = getUser();
    const dispatch = useDispatch();
    const { data: loggedSleep } = useLoggedSleepByDateQuery(
        {
            Email: user.Email,
            date: selectedDate
        },
        { refetchOnMountOrArgChange: true }
    );
    useEffect(() => {
        if (loggedSleep) {

            const sleepEntries = loggedSleep.flatMap((entry) =>
                entry.sleep.map((sleep) => ({
                    id: sleep.id,
                    type: sleep.sleepTypeId,
                    hours: sleep.hours,
                }))
            );
            dispatch(addSleepEntriesDate(sleepEntries));
        }
    }, [loggedSleep, selectedDate, dispatch]);
    const sleepEntries = useSelector((state: RootState) => state.profileSlice.sleepEntries);

    const totalSleep = sleepEntries.reduce(
        (acc, sleep) => {
            switch (sleep.type) {
                case SleepType.Awake:
                    acc.awake += sleep.hours;
                    break;
                case SleepType.Light:
                    acc.light += sleep.hours;
                    break;
                case SleepType.Deep:
                    acc.deep += sleep.hours;
                    break;
                case SleepType.REM:
                    acc.rem += sleep.hours;
                    break;
                default:
                    break;
            }
            acc.total += sleep.hours;
            return acc;
        },
        { total: 0, awake: 0, light: 0, deep: 0, rem: 0 }
    );

    return (<Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep (hours)</CardTitle>
            <Moon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{totalSleep.total}</div>
            <p>Awake: {totalSleep.awake} hours</p>
            <p>Light Sleep: {totalSleep.light} hours</p>
            <p>Deep Sleep: {totalSleep.deep} hours</p>
            <p>REM Sleep: {totalSleep.rem} hours</p>
        </CardContent>
    </Card>);
}

export default SleepCard;