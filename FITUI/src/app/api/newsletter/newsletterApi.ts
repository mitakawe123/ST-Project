import { HttpMethod } from "@/constants/Enumerations";
import { fitApi } from "../auth/authApi";

interface NewsletterResponse {}

interface NewsletterRequest {
	email: string;
}

const newsletterApi = fitApi.injectEndpoints({
	endpoints: (build) => ({
		newsletter: build.mutation<NewsletterResponse, NewsletterRequest>({
			query: (body) => ({
				url: "/newsletter-email-sender",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
		}),
	}),
});

export const { useNewsletterMutation } = newsletterApi;
