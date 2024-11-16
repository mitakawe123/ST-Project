import { SyntheticEvent, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { Github, Loader2, Mail } from "lucide-react";
import { useLoginMutation } from "@/app/api/auth/authApi";
import { getGithubIdToken, getGoogleIdToken } from "@/components/FirebaseAuth";
import { AuthenticationError } from "@/errors/AuthenticationError";
import {
	useGithubAuthMutation,
	useGoogleAuthMutation,
} from "@/app/api/auth/firebaseApi";
import useToast from "@/app/hooks/useToast";

const Icons = {
	gitHub: Github,
	google: Mail,
	spinner: Loader2,
};

export default function LoginPage() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { showToast } = useToast();

	const [login, { isLoading }] = useLoginMutation();
	const [googleAuth] = useGoogleAuthMutation();
	const [githubAuth] = useGithubAuthMutation();

	const navigate = useNavigate();

	async function onSubmit(event: SyntheticEvent) {
		event.preventDefault();

		const response = await login({
			email: email,
			password: password,
		}).unwrap();

		if (response.accessToken) navigate("/");
	}

	async function loginWithGoogle(event: SyntheticEvent) {
		event.preventDefault();
		try {
			const idToken = await getGoogleIdToken();

			const response = await googleAuth({
				idToken: idToken,
			}).unwrap();

			if (response.accessToken) navigate("/");
		} catch (error) {
			if (error instanceof AuthenticationError) {
				showToast(
					`Authentication failed ${(error as AuthenticationError).message}`,
					"error"
				);
			} else {
				showToast(`Unknown error: ${(error as Error).message}`, "error");
			}
		}
	}

	async function loginWithGithub(event: SyntheticEvent) {
		event.preventDefault();

		try {
			const idToken = await getGithubIdToken();

			const response = await githubAuth({
				idToken: idToken,
			}).unwrap();

			if (response.accessToken) navigate("/");
		} catch (error) {
			if (error instanceof AuthenticationError) {
				showToast(
					`Authentication failed ${(error as AuthenticationError).message}`,
					"error"
				);
			} else {
				showToast(`Unknown error: ${(error as Error).message}`, "error");
			}
		}
	}

	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center">
			<Card className="w-[350px]">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Sign in</CardTitle>
					<CardDescription>
						Enter your email below to sign in to your account
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="grid grid-cols-2 gap-6">
						<Button variant="outline" onClick={loginWithGithub}>
							<Icons.gitHub className="mr-2 h-4 w-4" />
							Github
						</Button>
						<Button variant="outline" onClick={loginWithGoogle}>
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
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="grid gap-2 mt-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<Button className="w-full mt-4" type="submit" disabled={isLoading}>
							{isLoading && (
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
							)}
							Sign In
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<div className="text-sm text-muted-foreground">
						Don't have an account?
						<Link
							to="/register"
							className="underline underline-offset-4 hover:text-primary"
						>
							Sign up
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
