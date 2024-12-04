import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getUser } from "@/utils/utils";
import { useLoaderContext } from "@/app/context/LoaderContext";
import useToast from "@/app/hooks/useToast";
import { useDispatch } from "react-redux";
import {
	useAddSleepMutation,
	useLoggedSleepQuery,
} from "@/app/api/health-tracker/healthTrackerApi";
import * as Select from "@radix-ui/react-select";
import { addSleepEntries } from "@/app/slices/health-tracker/foodSlice";
import {
	LoggedSleepResponse,
	SleepData,
} from "@/interfaces/api/health-tracker/response/logged-sleep.interface";

enum SleepType {
	Awake = 0,
	Light = 1,
	Deep = 2,
	REM = 4,
}

const SleepSection = () => {
	const [sleepHours, setSleepHours] = useState("");
	const [sleepType, setSleepType] = useState<SleepType>(SleepType.Awake);

	const user = getUser();
	const { startLoading, stopLoading } = useLoaderContext();
	const { showToast } = useToast();

	const dispatch = useDispatch();
	const [addSleep] = useAddSleepMutation();
	const { data: loggedSleep } = useLoggedSleepQuery(
		{
			Email: user.Email,
		},
		{
			refetchOnMountOrArgChange: true,
		}
	);

	const handleAddSleep = async (e: FormEvent) => {
		e.preventDefault();
		startLoading();

		await addSleep({
			email: user.Email,
			hours: parseFloat(sleepHours),
			sleepTypeId: Number(sleepType),
		});

		showToast("Sleep added to log", "success");

		stopLoading();
	};

	useEffect(() => {
		if (!loggedSleep) return;

		// Get today's date (set time to 00:00:00 for comparison)
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Filter entries for today
		const todaySleepEntries = loggedSleep
			.filter((entry) => {
				const loggedDate = new Date(entry.loggedAt);
				loggedDate.setHours(0, 0, 0, 0);
				return loggedDate.getTime() === today.getTime();
			})
			.flatMap((entry) =>
				entry.sleep.map((sleep) => ({
					id: sleep.id,
					type: sleep.sleepTypeId,
					hours: sleep.hours,
				}))
			);

		dispatch(addSleepEntries(todaySleepEntries));
	}, [dispatch, loggedSleep]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Track Sleep</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleAddSleep} className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="sleep-type">Sleep Type</Label>
						<Select.Root
							value={sleepType.toString()}
							onValueChange={(value) =>
								setSleepType(Number(value) as SleepType)
							}
						>
							<Select.Trigger
								id="sleep-type"
								className="inline-flex items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								<Select.Value placeholder="Select a sleep type" />
							</Select.Trigger>
							<Select.Content className="rounded-md border bg-white shadow-lg">
								<Select.Viewport className="p-2">
									{Object.entries(SleepType)
										.filter(([key]) => isNaN(Number(key)))
										.map(([key, value]) => (
											<Select.Item
												key={value}
												value={value.toString()}
												className="flex items-center p-2 hover:bg-blue-100 focus:bg-blue-100 rounded-md cursor-pointer"
											>
												<Select.ItemText>{key}</Select.ItemText>
											</Select.Item>
										))}
								</Select.Viewport>
							</Select.Content>
						</Select.Root>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="sleep-amount">Sleep (hours)</Label>
						<Input
							id="sleep-hours"
							type="number"
							value={sleepHours}
							onChange={(e) => setSleepHours(e.target.value)}
							placeholder="e.g., 250"
							required
						/>
					</div>

					<Button type="submit" className="w-full">
						Add Sleep
					</Button>
				</form>

				<div className="mt-4">
					<h3 className="font-semibold mb-2">Today's Sleep Log</h3>
					<ul className="space-y-4">
						{loggedSleep && loggedSleep.length > 0 ? (
							loggedSleep.map((log: LoggedSleepResponse) => (
								<li key={log.loggedAt.toString()} className="space-y-2">
									<div className="text-sm font-semibold text-gray-600">
										{new Date(log.loggedAt).toLocaleDateString()}
									</div>
									<ul className="space-y-2">
										{log.sleep.map((sleep: SleepData) => (
											<li
												key={sleep.id}
												className="flex justify-between items-center rounded-md border border-gray-200 bg-gray-50 p-3 shadow-sm"
											>
												<div className="flex flex-col">
													<span className="text-sm font-medium">
														{SleepType[sleep.sleepTypeId]}
													</span>
												</div>
												<div className="text-sm font-semibold">
													{sleep.hours} hours
												</div>
											</li>
										))}
									</ul>
								</li>
							))
						) : (
							<p className="text-gray-500 text-sm">No sleep logged yet.</p>
						)}
					</ul>
				</div>
			</CardContent>
		</Card>
	);
};

export default SleepSection;
