import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

type PricingTier = {
	name: string;
	price: number;
	description: string;
	features: string[];
	highlighted?: boolean;
};

const pricingTiers: PricingTier[] = [
	{
		name: "Basic",
		price: 9.99,
		description: "Essential features for individuals",
		features: ["1 user", "5 projects", "5GB storage", "Basic support"],
	},
	{
		name: "Pro",
		price: 19.99,
		description: "Advanced features for professionals",
		features: [
			"5 users",
			"20 projects",
			"20GB storage",
			"Priority support",
			"Advanced analytics",
		],
		highlighted: true,
	},
	{
		name: "Enterprise",
		price: 49.99,
		description: "Complete solution for teams",
		features: [
			"Unlimited users",
			"Unlimited projects",
			"100GB storage",
			"24/7 dedicated support",
			"Custom integrations",
			"Advanced security",
		],
	},
];

export default function PricingPage() {
	return (
		<div className="container mx-auto py-12 px-4">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
				<p className="text-xl text-muted-foreground">
					Select the perfect plan for your needs. Upgrade or downgrade at any
					time.
				</p>
			</div>
			<div className="grid md:grid-cols-3 gap-8">
				{pricingTiers.map((tier) => (
					<Card
						key={tier.name}
						className={tier.highlighted ? "border-primary shadow-lg" : ""}
					>
						<CardHeader>
							<CardTitle className="flex justify-between items-baseline">
								{tier.name}
								{tier.highlighted && <Badge variant="secondary">Popular</Badge>}
							</CardTitle>
							<CardDescription>{tier.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold mb-4">
								${tier.price}
								<span className="text-lg font-normal text-muted-foreground">
									/month
								</span>
							</div>
							<ul className="space-y-2">
								{tier.features.map((feature) => (
									<li key={feature} className="flex items-center">
										<Check className="h-5 w-5 text-green-500 mr-2" />
										{feature}
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter>
							<Button
								className="w-full"
								variant={tier.highlighted ? "default" : "outline"}
							>
								Choose {tier.name}
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
			<div className="mt-12 text-center">
				<h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
				<div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
					<div>
						<h3 className="font-semibold mb-2">Can I change my plan later?</h3>
						<p className="text-muted-foreground">
							Yes, you can upgrade or downgrade your plan at any time.
						</p>
					</div>
					<div>
						<h3 className="font-semibold mb-2">
							What payment methods do you accept?
						</h3>
						<p className="text-muted-foreground">
							We accept all major credit cards and PayPal.
						</p>
					</div>
					<div>
						<h3 className="font-semibold mb-2">Is there a free trial?</h3>
						<p className="text-muted-foreground">
							Yes, we offer a 14-day free trial for all plans.
						</p>
					</div>
					<div>
						<h3 className="font-semibold mb-2">Do you offer refunds?</h3>
						<p className="text-muted-foreground">
							We offer a 30-day money-back guarantee for all plans.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
