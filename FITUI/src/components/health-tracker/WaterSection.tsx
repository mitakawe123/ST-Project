import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

type WaterEntry = {
	id: string;
	amount: number;
	timestamp: Date;
};

const WaterSection = () => {
	const [waterAmount, setWaterAmount] = useState("");
	const [waterEntries, setWaterEntries] = useState<WaterEntry[]>([]);

	const handleAddWater = (e: React.FormEvent) => {
		e.preventDefault();
		if (waterAmount) {
			const newWater: WaterEntry = {
				id: Date.now().toString(),
				amount: parseInt(waterAmount),
				timestamp: new Date(),
			};
			setWaterEntries([...waterEntries, newWater]);
			setWaterAmount("");
		}
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle>Track Water</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleAddWater} className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="water-amount">Water Amount (ml)</Label>
						<Input
							id="water-amount"
							type="number"
							value={waterAmount}
							onChange={(e) => setWaterAmount(e.target.value)}
							placeholder="e.g., 250"
							required
						/>
					</div>
					<Button type="submit">Add Water</Button>
				</form>
				<div className="mt-4">
					<h3 className="font-semibold mb-2">Today's Water Log</h3>
					<ul className="space-y-2"></ul>
				</div>
			</CardContent>
		</Card>
	);
};

export default WaterSection;
