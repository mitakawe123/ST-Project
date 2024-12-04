export interface LoggedSleepResponse {
	loggedAt: Date;
	sleep: SleepData[];
}

export interface SleepData {
	id: number;
	hours: number;
	sleepTypeId: number;
}
