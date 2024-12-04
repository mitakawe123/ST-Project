import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as Select from "@radix-ui/react-select";
import { FormEvent, useEffect, useState } from "react";
import {
	useAddFluidsMutation,
	useLoggedFluidsQuery,
} from "@/app/api/health-tracker/healthTrackerApi";
import { getUser } from "@/utils/utils";
import { useLoaderContext } from "@/app/context/LoaderContext";
import useToast from "@/app/hooks/useToast";
import {
	Fluid,
	LoggedFluidsResponse,
} from "@/interfaces/api/health-tracker/response/logged-fluids.interface";
import { useDispatch } from "react-redux";
import { addFluidsEntries } from "@/app/slices/health-tracker/foodSlice";

enum FluidType {
	Water = 0,
	Carbonated = 1,
}

const FluidsSection = () => {
	const [waterAmount, setWaterAmount] = useState("");
	const [fluidType, setFluidType] = useState<FluidType>(FluidType.Water);

	const user = getUser();
	const { startLoading, stopLoading } = useLoaderContext();
	const { showToast } = useToast();

	const dispatch = useDispatch();
	const [addFluids] = useAddFluidsMutation();
	const { data: fluids } = useLoggedFluidsQuery(
		{
			Email: user.Email,
		},
		{
			refetchOnMountOrArgChange: true,
		}
	);

	const handleAddFluid = async (e: FormEvent) => {
		e.preventDefault();
		startLoading();

		await addFluids({
			email: user.Email,
			amount: parseFloat(waterAmount),
			fluidTypeId: Number(fluidType),
		});

		showToast("Fluid added to log", "success");

		stopLoading();
	};

	useEffect(() => {
		if (!fluids) return;

		// Get today's date (set time to 00:00:00 for comparison)
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Filter entries for today
		const todayFluidsEntries = fluids
			.filter((entry) => {
				const loggedDate = new Date(entry.loggedAt);
				loggedDate.setHours(0, 0, 0, 0);
				return loggedDate.getTime() === today.getTime();
			})
			.flatMap((entry) =>
				entry.fluids.map((fluid) => ({
					id: fluid.id,
					type: fluid.fluidTypeId,
					amount: fluid.amount,
				}))
			);

		dispatch(addFluidsEntries(todayFluidsEntries));
	}, [dispatch, fluids]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Track Fluids</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleAddFluid} className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="fluid-type">Fluid Type</Label>
						<Select.Root
							value={fluidType.toString()}
							onValueChange={(value) =>
								setFluidType(Number(value) as FluidType)
							}
						>
							<Select.Trigger
								id="fluid-type"
								className="inline-flex items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								<Select.Value placeholder="Select a fluid type" />
							</Select.Trigger>
							<Select.Content className="rounded-md border bg-white shadow-lg">
								<Select.Viewport className="p-2">
									{Object.entries(FluidType)
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
						<Label htmlFor="water-amount">Amount (ml)</Label>
						<Input
							id="water-amount"
							type="number"
							value={waterAmount}
							onChange={(e) => setWaterAmount(e.target.value)}
							placeholder="e.g., 250"
							required
						/>
					</div>

					<Button type="submit" className="w-full">
						Add Fluid
					</Button>
				</form>

				<div className="mt-4">
					<h3 className="font-semibold mb-2">Today's Fluid Log</h3>
					<ul className="space-y-4">
						{fluids && fluids.length > 0 ? (
							fluids.map((log: LoggedFluidsResponse) => (
								<li key={log.loggedAt.toString()} className="space-y-2">
									<div className="text-sm font-semibold text-gray-600">
										{new Date(log.loggedAt).toLocaleDateString()}
									</div>
									<ul className="space-y-2">
										{log.fluids.map((fluid: Fluid) => (
											<li
												key={fluid.id}
												className="flex justify-between items-center rounded-md border border-gray-200 bg-gray-50 p-3 shadow-sm"
											>
												<div className="flex flex-col">
													<span className="text-sm font-medium">
														{FluidType[fluid.fluidTypeId]}
													</span>
												</div>
												<div className="text-sm font-semibold">
													{fluid.amount} ml
												</div>
											</li>
										))}
									</ul>
								</li>
							))
						) : (
							<p className="text-gray-500 text-sm">No fluids logged yet.</p>
						)}
					</ul>
				</div>
			</CardContent>
		</Card>
	);
};

export default FluidsSection;
