import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import MainFeed from "./pages/MainFeedPage.tsx";
import WorkoutPage from "./pages/WorkoutPage.tsx";
import HealthTracker from "./pages/HealthTrackerPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProtectedRoute from "./components/configurations/ProtectedRoute.tsx";
import { LoaderProvider } from "./app/context/LoaderContext.tsx";

import "./styles/index.scss";

const isAuthenticated = () => {
	return !!sessionStorage.getItem("authToken");
};

const router = createBrowserRouter([
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
		children: [
			{
				path: "/",
				element: <LandingPage />,
			},
			{
				path: "/feed",
				element: <MainFeed />,
			},
			{
				path: "/workouts",
				element: <WorkoutPage />,
			},
			{
				path: "/health-tracker",
				element: <HealthTracker />,
			},
			{
				path: "/pricing",
				element: <PricingPage />,
			},
			{
				path: "/about",
				element: <AboutPage />,
			},
			{
				path: "/contact",
				element: <ContactPage />,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<LoaderProvider>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</LoaderProvider>
	</StrictMode>
);
