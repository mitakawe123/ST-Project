import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { useNewsletterMutation } from "@/app/api/newsletter/newsletterApi";
import Barbbell from "../assets/barbbel.svg";
import useToast from "@/app/hooks/useToast";
import { useLoaderContext } from "@/app/context/LoaderContext";

export default function LandingPage() {
	const [email, setEmail] = useState<string>("");

	const { startLoading, stopLoading } = useLoaderContext();
	const { showToast } = useToast();

	const [newsletter, {}] = useNewsletterMutation();

	async function sendNewsletter(event: SyntheticEvent) {
		event.preventDefault();
		startLoading();

		try {
			await newsletter({
				email: email,
			});

			setEmail("");
			showToast("Succesfully send newsletter", "success");
		} catch (error) {
			setEmail("");
			showToast(
				"There is problem with email sending please try again later",
				"error"
			);
		} finally {
			stopLoading();
		}
	}

	return (
		<div className="flex flex-col min-h-screen">
			<header className="px-4 lg:px-6 h-14 flex items-center">
				<a className="flex items-center justify-center" href="#">
					<Dumbbell className="h-6 w-6" />
					<span className="sr-only">FitConnect</span>
				</a>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					<Link
						className="text-sm font-medium hover:underline underline-offset-4"
						to="/health-tracker"
					>
						Health Tracker
					</Link>
					<Link
						className="text-sm font-medium hover:underline underline-offset-4"
						to="/pricing"
					>
						Pricing
					</Link>
					<Link
						className="text-sm font-medium hover:underline underline-offset-4"
						to="/about"
					>
						About
					</Link>
					<Link
						className="text-sm font-medium hover:underline underline-offset-4"
						to="/contact"
					>
						Contact
					</Link>
					<Link
						onClick={() => sessionStorage.clear()}
						className="text-sm font-medium hover:underline underline-offset-4"
						to="/login"
					>
						Log out
					</Link>
				</nav>
			</header>
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="w-full px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
										Connect, Train, Achieve with FitConnect
									</h1>
									<p className="max-w-[600px] text-muted-foreground md:text-xl">
										Join the fitness revolution. Share your progress, challenge
										friends, and reach your goals together.
									</p>
								</div>
								<div className="flex flex-col gap-2 min-[400px]:flex-row">
									<Link
										className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
										to="/workouts"
									>
										Get Started
									</Link>
									<Link
										className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
										to="/feed"
									>
										Learn More
									</Link>
								</div>
							</div>
							<img
								alt="FitnessMan"
								className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
								height="550"
								src={Barbbell}
								width="550"
							/>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
					<div className="w-full px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
									Features
								</h2>
								<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Discover how FitConnect can transform your fitness journey
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
							<div className="flex flex-col justify-center space-y-4">
								<Users className="mx-auto h-12 w-12" />
								<h3 className="text-xl font-bold text-center">
									Connect with Friends
								</h3>
								<p className="text-muted-foreground text-center">
									Build your fitness community. Follow friends, share workouts,
									and motivate each other.
								</p>
							</div>
							<div className="flex flex-col justify-center space-y-4">
								<Dumbbell className="mx-auto h-12 w-12" />
								<h3 className="text-xl font-bold text-center">
									Personalized Workouts
								</h3>
								<p className="text-muted-foreground text-center">
									Get custom workout plans tailored to your goals, fitness
									level, and available equipment.
								</p>
							</div>
							<div className="flex flex-col justify-center space-y-4">
								<Trophy className="mx-auto h-12 w-12" />
								<h3 className="text-xl font-bold text-center">
									Challenges & Achievements
								</h3>
								<p className="text-muted-foreground text-center">
									Participate in community challenges, earn badges, and
									celebrate your fitness milestones.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="w-full px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
									Join FitConnect Today
								</h2>
								<p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Join our fitness community and stay inspired with the latest
									tips, workouts, and motivation—delivered straight to your
									inbox!
								</p>
							</div>
							<div className="w-full max-w-sm space-y-2">
								<form className="flex space-x-2" onSubmit={sendNewsletter}>
									<Input
										className="max-w-lg flex-1"
										placeholder="Enter your email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<Button type="submit">Send Newsletter</Button>
								</form>
								<p className="text-xs text-muted-foreground">
									By signing up, you agree to our
									<a className="underline underline-offset-2" href="#">
										Terms & Conditions
									</a>
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-muted-foreground">
					© 2024 FitConnect. All rights reserved.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<a className="text-xs hover:underline underline-offset-4" href="#">
						Terms of Service
					</a>
					<a className="text-xs hover:underline underline-offset-4" href="#">
						Privacy
					</a>
				</nav>
			</footer>
		</div>
	);
}
