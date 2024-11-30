import { fitApi } from "../auth/authApi";
import { HttpMethod } from "@/constants/Enumerations";
import { ContactUsRequest } from "@/interfaces/api/contact/request/contact-us.interface";

const contactApi = fitApi.injectEndpoints({
	endpoints: (build) => ({
		contactUs: build.mutation<void, ContactUsRequest>({
			query: (body) => ({
				url: "/contact-us",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
		}),
	}),
});

export const { useContactUsMutation } = contactApi;
