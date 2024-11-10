import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Github, Loader2, Mail } from "lucide-react";

const Icons = {
	gitHub: Github,
	google: Mail,
	spinner: Loader2,
};

export default function RegisterPage() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// const { startLoading, stopLoading } = useLoaderContext();

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		startLoading();
	// 		try {
	// 			const response = await axios.get("/api/feed");
	// 			console.log(response.data);
	// 		} catch (error) {
	// 			console.error("Error fetching data", error);
	// 		} finally {
	// 			stopLoading();
	// 		}
	// 	};

	// 	fetchData();
	// }, [startLoading, stopLoading]);

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}

	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center">
			<Card className="w-[350px]">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Create an account</CardTitle>
					<CardDescription>
						Enter your email below to create your account
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="grid grid-cols-2 gap-6">
						<Button variant="outline">
							<Icons.gitHub className="mr-2 h-4 w-4" />
							Github
						</Button>
						<Button variant="outline">
							<Icons.google className="mr-2 h-4 w-4" />
							Google
						</Button>
					</div>
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>
					<form onSubmit={onSubmit}>
						<div className="grid gap-2">
							<Label htmlFor="name">UserName</Label>
							<Input id="name" type="text" placeholder="John Doe" required />
						</div>
						<div className="grid gap-2 mt-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						<div className="grid gap-2 mt-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" required />
						</div>
						<Button className="w-full mt-4" type="submit" disabled={isLoading}>
							{isLoading && (
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
							)}
							Create Account
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<div className="text-sm text-muted-foreground">
						Already have an account?
						<Link
							to="/login"
							className="underline underline-offset-4 hover:text-primary"
						>
							Sign in
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}