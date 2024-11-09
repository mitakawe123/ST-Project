import { createContext, FC, ReactNode, useContext, useState } from "react";

interface LoaderContextType {
	loading: boolean;
	startLoading: () => void;
	stopLoading: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoaderContext = (): LoaderContextType => {
	const context = useContext(LoaderContext);
	if (!context) {
		throw new Error("useLoaderContext must be used within a LoaderProvider");
	}
	return context;
};

interface LoaderProviderProps {
	children: ReactNode;
}

export const LoaderProvider: FC<LoaderProviderProps> = ({ children }) => {
	const [loading, setLoading] = useState<boolean>(false);

	const startLoading = () => setLoading(true);
	const stopLoading = () => setLoading(false);

	return (
		<LoaderContext.Provider value={{ loading, startLoading, stopLoading }}>
			{children}
		</LoaderContext.Provider>
	);
};
