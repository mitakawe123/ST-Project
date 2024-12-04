export interface LoggedFluidsResponse {
	loggedAt: Date;
	fluids: Fluid[];
}

export interface Fluid {
	id: number;
	amount: number;
	fluidTypeId: number;
}
