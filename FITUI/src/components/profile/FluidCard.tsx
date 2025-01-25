import { useLoggedFluidsByDateQuery } from "@/app/api/health-tracker/healthTrackerApi";
import { addFluidsEntriesDate } from "@/app/slices/profile/profileSlice";
import {
	LoggedFluidsResponse,
	Fluid,
} from "@/interfaces/api/health-tracker/response/logged-fluids.interface";
import { Droplet } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { getUser } from "@/utils/utils";
import { RootState } from "@/app/store";

interface FluidCardProp {
	selectedDate: Date;
}
enum FluidType {
	Water = 0,
	Carbonated = 1,
}

const FluidCard: React.FC<FluidCardProp> = ({ selectedDate }) => {
	const dispatch = useDispatch();
	const user = getUser();

	const { data: fluids } = useLoggedFluidsByDateQuery(
		{
			Email: user.Email,
			date: selectedDate,
		},
		{ refetchOnMountOrArgChange: true }
	);

	useEffect(() => {
		if (fluids) {
			const fluidEntries = fluids.flatMap((entry: LoggedFluidsResponse) =>
				entry.fluids.map((fluid: Fluid) => ({
					id: fluid.id,
					type: fluid.fluidTypeId,
					amount: fluid.amount,
				}))
			);
			dispatch(addFluidsEntriesDate(fluidEntries));
		}
	}, [fluids, selectedDate, dispatch]);

	const fluidEntries = useSelector(
		(state: RootState) => state.profileSlice.fluidEntries
	);

	const totalWater = fluidEntries.reduce(
		(acc, fluid) => {
			if (fluid.type === FluidType.Water) {
				acc.water += fluid.amount;
			} else if (fluid.type === FluidType.Carbonated) {
				acc.carbonated += fluid.amount;
			}
			acc.total += fluid.amount;
			return acc;
		},
		{ total: 0, water: 0, carbonated: 0 }
	);
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-md font-bold">Total Water</CardTitle>
				<Droplet className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-small">{totalWater.total} ml.</div>
				<p>Water: {totalWater.water} ml.</p>
				<p>Carbonated: {totalWater.carbonated} ml.</p>
			</CardContent>
		</Card>
	);
};
export default FluidCard;
