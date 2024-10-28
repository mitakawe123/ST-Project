import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Globe, Award } from "lucide-react";

type TeamMember = {
	name: string;
	role: string;
	image: string;
	bio: string;
};

const teamMembers: TeamMember[] = [
	{
		name: "Jane Doe",
		role: "CEO & Founder",
		image: "https://i.pravatar.cc/150?img=1",
		bio: "Jane has over 15 years of experience in the tech industry and is passionate about creating innovative solutions.",
	},
	{
		name: "John Smith",
		role: "CTO",
		image: "https://i.pravatar.cc/150?img=2",
		bio: "John is a seasoned developer with a knack for turning complex problems into elegant solutions.",
	},
	{
		name: "Emily Brown",
		role: "Head of Design",
		image: "https://i.pravatar.cc/150?img=3",
		bio: "Emily brings creativity and user-centric design to every project, ensuring our products are both beautiful and functional.",
	},
	{
		name: "Michael Chen",
		role: "Lead Developer",
		image: "https://i.pravatar.cc/150?img=4",
		bio: "Michael is a coding wizard with a passion for clean, efficient code and cutting-edge technologies.",
	},
];

export default function AboutPage() {
	return (
		<div className="container mx-auto py-12 px-4">
			{/* About Section */}
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold mb-4">About TechInnovate</h1>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					We're on a mission to revolutionize the tech industry with innovative
					solutions and cutting-edge products.
				</p>
			</div>

			{/* Mission and Values Section */}
			<div className="grid md:grid-cols-2 gap-8 mb-12">
				<Card>
					<CardHeader>
						<CardTitle>Our Mission</CardTitle>
					</CardHeader>
					<CardContent>
						<p>
							At TechInnovate, we strive to push the boundaries of what's
							possible in technology. Our goal is to create products that not
							only meet the needs of today but anticipate the challenges of
							tomorrow. We believe in the power of innovation to transform lives
							and businesses around the world.
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Our Values</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="list-disc list-inside space-y-2">
							<li>Innovation at our core</li>
							<li>Customer-centric approach</li>
							<li>Collaboration and teamwork</li>
							<li>Continuous learning and improvement</li>
							<li>Ethical and sustainable practices</li>
						</ul>
					</CardContent>
				</Card>
			</div>

			{/* Team Section */}
			<div className="mb-12">
				<h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{teamMembers.map((member) => (
						<Card key={member.name}>
							<CardHeader>
								<Avatar className="w-24 h-24 mx-auto mb-4">
									<AvatarImage src={member.image} alt={member.name} />
									<AvatarFallback>
										{member.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<CardTitle className="text-center">{member.name}</CardTitle>
								<CardDescription className="text-center">
									{member.role}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-center">{member.bio}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Company Stats Section */}
			<div className="mb-12">
				<h2 className="text-3xl font-bold mb-6 text-center">Company Stats</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{/* Individual stat cards */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Employees</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">200+</div>
							<p className="text-xs text-muted-foreground">
								Across 5 countries
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Projects Completed
							</CardTitle>
							<Briefcase className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">500+</div>
							<p className="text-xs text-muted-foreground">
								In the last 5 years
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Global Reach
							</CardTitle>
							<Globe className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">50+</div>
							<p className="text-xs text-muted-foreground">Countries served</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Awards</CardTitle>
							<Award className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">30+</div>
							<p className="text-xs text-muted-foreground">
								Industry recognitions
							</p>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Expertise Section */}
			<div>
				<h2 className="text-3xl font-bold mb-6 text-center">Our Expertise</h2>
				<div className="flex flex-wrap justify-center gap-2">
					<Badge variant="secondary">Artificial Intelligence</Badge>
					<Badge variant="secondary">Machine Learning</Badge>
					<Badge variant="secondary">Cloud Computing</Badge>
					<Badge variant="secondary">IoT Solutions</Badge>
					<Badge variant="secondary">Blockchain</Badge>
					<Badge variant="secondary">Cybersecurity</Badge>
					<Badge variant="secondary">Data Analytics</Badge>
					<Badge variant="secondary">Mobile Development</Badge>
				</div>
			</div>
		</div>
	);
}
