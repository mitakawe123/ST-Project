import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import MainFeed from "./pages/MainFeedPage.tsx";
import WorkoutPage from "./pages/WorkoutPage.tsx";
import "./styles/index.scss";
import HealthTracker from "./pages/HealthTrackerPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";

const router = createBrowserRouter([
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
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
