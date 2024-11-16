import { HttpMethod } from "@/constants/Enumerations";
import { fitApi } from "../auth/authApi";
import { NewsletterRequest } from "@/interfaces/api/newsletter/requests/newsletter.interface";

const newsletterApi = fitApi.injectEndpoints({
	endpoints: (build) => ({
		newsletter: build.mutation<void, NewsletterRequest>({
			query: (body) => ({
				url: "/newsletter-email-sender",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
		}),
	}),
});

export const { useNewsletterMutation } = newsletterApi;
