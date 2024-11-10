import { HttpMethod } from "@/constants/Enumerations";
import { useState, useCallback } from "react";

interface FetchState<T> {
	data: T | null;
	error: string | null;
	loading: boolean;
	statusCode: number;
}

function useFetch<T>(): [
	(url: string, method: HttpMethod, body?: any) => void,
	FetchState<T>
] {
	const [state, setState] = useState<FetchState<T>>({
		data: null,
		error: null,
		loading: false,
		statusCode: 0,
	});

	const fetchData = useCallback(
		async (url: string, method: HttpMethod = HttpMethod.GET, body?: any) => {
			setState({ data: null, error: null, loading: true, statusCode: 0 });
			try {
				const options: RequestInit = {
					method,
					headers: {
						"Content-Type": "application/json",
					},
					body: body ? JSON.stringify(body) : undefined,
				};

				const response = await fetch(url, options);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setState({
					data,
					error: null,
					loading: false,
					statusCode: response.status,
				});
			} catch (error: any) {
				setState({
					data: null,
					error: error.message,
					loading: false,
					statusCode: 500,
				});
			}
		},
		[]
	);

	return [fetchData, state];
}

export default useFetch;
