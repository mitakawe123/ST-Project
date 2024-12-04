import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

enum SleepType {
	Awake = 0,
	Light = 1,
	Deep = 2,
	REM = 4,
}

const SleepSection = () => {
	const [sleepHours, setSleepHours] = useState("");
	const [sleepType, setSleepType] = useState<SleepType>(SleepType.Awake);

	const handleAddSleep = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Track Sleep</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleAddSleep} className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="sleep-hours">Sleep Duration (hours)</Label>
						<Input
							id="sleep-hours"
							type="number"
							step="0.1"
							value={sleepHours}
							onChange={(e) => setSleepHours(e.target.value)}
							placeholder="e.g., 7.5"
							required
						/>
					</div>
					<Button type="submit">Add Sleep</Button>
				</form>
				<div className="mt-4">
					<h3 className="font-semibold mb-2">Sleep Log</h3>
					<ul className="space-y-2"></ul>
				</div>
			</CardContent>
		</Card>
	);
};

export default SleepSection;
