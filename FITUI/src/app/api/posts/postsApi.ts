import { PostsResponse } from "@/interfaces/api/posts/response/posts.interface";
import { fitApi } from "../auth/authApi";
import { HttpMethod } from "@/constants/Enumerations";
import { CreatePostRequest } from "@/interfaces/api/posts/requests/create-post.interface";
import { UpdatePostRequest } from "@/interfaces/api/posts/requests/update-post.interface";
import { DeletePostRequest } from "@/interfaces/api/posts/requests/delete-post.interface";

const postsApi = fitApi.injectEndpoints({
	endpoints: (build) => ({
		allPosts: build.query<PostsResponse, void>({
			query: () => "/posts",
		}),
		allMyPosts: build.query<PostsResponse, void>({
			query: () => "/my-posts",
		}),
		createPost: build.mutation<void, CreatePostRequest>({
			query: (body) => ({
				url: "/posts",
				method: HttpMethod.POST.toString(),
				body: body,
			}),
		}),
		updatePost: build.mutation<void, UpdatePostRequest>({
			query: (body) => ({
				url: "/posts",
				method: HttpMethod.PATCH.toString(),
				body: body,
			}),
		}),
		deletePost: build.mutation<void, DeletePostRequest>({
			query: ({ id }) => ({
				url: `/posts/${id}`,
				method: HttpMethod.DELETE.toString(),
			}),
		}),
	}),
});

export const {
	useAllPostsQuery,
	useAllMyPostsQuery,
	useCreatePostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
} = postsApi;
