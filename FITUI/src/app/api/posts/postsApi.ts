import { Post } from "@/interfaces/api/posts/response/posts.interface";
import { fitApi } from "../auth/authApi";
import { HttpMethod } from "@/constants/Enumerations";
import { CreatePostRequest } from "@/interfaces/api/posts/requests/create-post.interface";
import { UpdatePostRequest } from "@/interfaces/api/posts/requests/update-post.interface";
import { DeletePostRequest } from "@/interfaces/api/posts/requests/delete-post.interface";
import { MyPostsRequest } from "@/interfaces/api/posts/requests/my-posts.interface";
import { AllPostsRequest } from "@/interfaces/api/posts/requests/all-posts.interface";
import { LikePostRequest } from "@/interfaces/api/posts/requests/like-post.interface";

const postsApi = fitApi.injectEndpoints({
	endpoints: (build) => ({
		allPosts: build.query<Post[], AllPostsRequest>({
			query: ({ Email }) => `/posts?Email=${encodeURIComponent(Email)}`,
			providesTags: ["Posts"],
		}),
		allMyPosts: build.query<Post[], MyPostsRequest>({
			query: ({ Email }) => `/my-posts?Email=${encodeURIComponent(Email)}`,
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
		likePost: build.mutation<void, LikePostRequest>({
			query: (body) => ({
				url: "/like-post",
				method: HttpMethod.PATCH.toString(),
				headers: {
					"Content-Type": "application/json",
				},
				body: body,
			}),
			invalidatesTags: ["Posts"],
		}),
	}),
});

export const {
	useAllPostsQuery,
	useAllMyPostsQuery,
	useCreatePostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
	useLikePostMutation,
} = postsApi;
