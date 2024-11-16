export class AuthenticationError extends Error {
	code: string;
	details?: any;

	constructor(message: string, code: string, details?: any) {
		super(message);
		this.code = code;
		this.details = details;
		this.name = "AuthenticationError";
	}
}
