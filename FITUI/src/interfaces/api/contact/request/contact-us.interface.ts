export interface ContactUsRequest {
	firstName: string;
	lastName: string;
	email?: string;
	subject: string;
	message: string;
}
