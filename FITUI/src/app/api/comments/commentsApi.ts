import { CreateComment } from "@/interfaces/api/comments/requests/create-comment.interface";
import { fitApi } from "../auth/authApi";
import { HttpMethod } from "@/constants/Enumerations";

const commentsAPi = fitApi.injectEndpoints({
	endpoints: (build) => ({
		createComment: build.mutation<void, CreateComment>({
			query: (body) => ({
				url: "/comment",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
		}),
	}),
});

export const { useCreateCommentMutation } = commentsAPi;
