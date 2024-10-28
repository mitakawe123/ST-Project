import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log("Form submitted");
	};

	return (
		<div className="container mx-auto py-12 px-4">
			<h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

			<div className="grid md:grid-cols-2 gap-8">
				<Card>
					<CardHeader>
						<CardTitle>Send Us a Message</CardTitle>
						<CardDescription>
							We'd love to hear from you. Fill out the form below and we'll get
							back to you as soon as possible.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="firstName"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										First Name
									</label>
									<Input id="firstName" name="firstName" required />
								</div>
								<div>
									<label
										htmlFor="lastName"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Last Name
									</label>
									<Input id="lastName" name="lastName" required />
								</div>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Email
								</label>
								<Input id="email" name="email" type="email" required />
							</div>
							<div>
								<label
									htmlFor="subject"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Subject
								</label>
								<Input id="subject" name="subject" required />
							</div>
							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Message
								</label>
								<Textarea id="message" name="message" rows={4} required />
							</div>
							<Button type="submit" className="w-full">
								Send Message
							</Button>
						</form>
					</CardContent>
				</Card>

				<div className="space-y-8">
					<Card>
						<CardHeader>
							<CardTitle>Contact Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center">
								<MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
								<span>123 Tech Street, San Francisco, CA 94107</span>
							</div>
							<div className="flex items-center">
								<Phone className="h-5 w-5 mr-2 text-muted-foreground" />
								<span>+1 (555) 123-4567</span>
							</div>
							<div className="flex items-center">
								<Mail className="h-5 w-5 mr-2 text-muted-foreground" />
								<span>contact@techinnovate.com</span>
							</div>
							<div className="flex items-center">
								<Clock className="h-5 w-5 mr-2 text-muted-foreground" />
								<span>Monday - Friday: 9am - 5pm PST</span>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Our Location</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="aspect-video relative">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0968246160486!2d-122.41941708468212!3d37.77492997975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1652296246889!5m2!1sen!2sus"
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									className="absolute inset-0"
								></iframe>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
