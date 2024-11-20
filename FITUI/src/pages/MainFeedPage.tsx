import { SyntheticEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageCircle, Share2, Send } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	useAllMyPostsQuery,
	useAllPostsQuery,
	useCreatePostMutation,
} from "@/app/api/posts/postsApi";
import { formatSocialMediaDate, getUser } from "@/utils/utils";
import useToast from "@/app/hooks/useToast";

export default function MainFeed() {
	const user = getUser();
	const { showToast } = useToast();

	const [newPost, setNewPost] = useState("");

	const { data: posts } = useAllPostsQuery(undefined, {
		pollingInterval: 5000,
		refetchOnMountOrArgChange: true,
		skip: false,
	});

	const { data: myPosts } = useAllMyPostsQuery(
		{ Email: user.Email },
		{
			pollingInterval: 10000,
			refetchOnMountOrArgChange: true,
			skip: false,
		}
	);

	const [createPost, { isSuccess, isError }] = useCreatePostMutation();

	async function handlePost(event: SyntheticEvent) {
		event.preventDefault();

		await createPost({
			content: newPost,
			email: user.Email,
		});

		setNewPost("");
		if (isSuccess) showToast("Succesfully created post", "success");
		else if (isError)
			showToast("Error creating post please try again later", "error");
	}

	async function handleComment(
		event: SyntheticEvent,
		postId: number,
		email: string,
		content: string
	) {
		event.preventDefault();
	}

	return (
		<div className="container mx-auto p-4">
			<Tabs defaultValue="feed">
				<TabsList className="mb-4">
					<TabsTrigger value="feed">Feed</TabsTrigger>
					<TabsTrigger value="my-posts">My Posts</TabsTrigger>
				</TabsList>
				<TabsContent value="my-posts">
					<div className="max-w-2xl mx-auto p-4">
						{myPosts?.map((post) => (
							<div
								key={post.id}
								className="bg-white rounded-lg shadow-md mb-6 p-4"
							>
								<div className="flex items-center mb-4">
									<Avatar className="h-10 w-10 mr-3">
										<AvatarImage src={post.avatarImg} alt="avatar-image" />
										<AvatarFallback />
									</Avatar>
									<div>
										<h3 className="font-semibold">{user.Email}</h3>
										<p className="text-sm text-gray-500">
											{formatSocialMediaDate(post.createdAt)}
										</p>
									</div>
								</div>
								<p className="mb-4">{post.content}</p>
								{post.image && (
									<img
										src={post.image}
										alt="Post content"
										className="w-full rounded-md mb-4"
									/>
								)}
								<div className="flex justify-between items-center mb-4">
									<Button
										variant="ghost"
										onClick={() =>
											showToast("Cannot like you own post", "info")
										}	
									>
										<ThumbsUp className="mr-2 h-4 w-4" /> {post.likes}
									</Button>
									<Button variant="ghost">
										<MessageCircle className="mr-2 h-4 w-4" />
										{post.comments.length}
									</Button>
									<Button variant="ghost">
										<Share2 className="mr-2 h-4 w-4" /> Share
									</Button>
								</div>
								<div className="space-y-4">
									{post.comments.map((comment) => (
										<div
											key={comment.id}
											className="flex items-start space-x-3"
										>
											<Avatar className="h-8 w-8">
												<AvatarImage src={""} alt={""} />
												<AvatarFallback>{""}</AvatarFallback>
											</Avatar>
											<div className="flex-1 bg-gray-100 rounded-lg p-3">
												<h4 className="font-semibold">{""}</h4>
												<p>{comment.content}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</TabsContent>
				<TabsContent value="feed">
					<div className="max-w-2xl mx-auto p-4">
						<form className="mb-8">
							<Textarea
								value={newPost}
								onChange={(e) => setNewPost(e.target.value)}
								placeholder="What's on your mind?"
								className="mb-2"
							/>
							<Button type="submit" onClick={handlePost}>
								Post
							</Button>
						</form>
						{posts?.map((post) => (
							<div
								key={post.id}
								className="bg-white rounded-lg shadow-md mb-6 p-4"
							>
								<div className="flex items-center mb-4">
									<Avatar className="h-10 w-10 mr-3">
										<AvatarImage src={post.avatarImg} alt="avatar-image" />
										<AvatarFallback>{""}</AvatarFallback>
									</Avatar>
									<div>
										<h3 className="font-semibold">{user.Email}</h3>
										<p className="text-sm text-gray-500">
											{formatSocialMediaDate(post.createdAt)}
										</p>
									</div>
								</div>
								<p className="mb-4">{post.content}</p>
								{post.image && (
									<img
										src={post.image}
										alt="Post content"
										className="w-full rounded-md mb-4"
									/>
								)}
								<div className="flex justify-between items-center mb-4">
									<Button variant="ghost" onClick={() => {}}>
										<ThumbsUp className="mr-2 h-4 w-4" /> {post.likes}
									</Button>
									<Button variant="ghost">
										<MessageCircle className="mr-2 h-4 w-4" />
										{post.comments.length}
									</Button>
									<Button variant="ghost">
										<Share2 className="mr-2 h-4 w-4" /> Share
									</Button>
								</div>
								<div className="space-y-4">
									{post.comments.map((comment) => (
										<div
											key={comment.id}
											className="flex items-start space-x-3"
										>
											<Avatar className="h-8 w-8">
												<AvatarImage
													src="https://i.pravatar.cc/150?img=5"
													alt="User that comments"
												/>
												<AvatarFallback>{""}</AvatarFallback>
											</Avatar>
											<div className="flex-1 bg-gray-100 rounded-lg p-3">
												<h4 className="font-semibold">{""}</h4>
												<p>{comment.content}</p>
											</div>
										</div>
									))}
								</div>
								<div className="mt-4 flex items-center space-x-2">
									<Avatar className="h-8 w-8">
										<AvatarImage
											src="https://i.pravatar.cc/150?img=5"
											alt="Current User"
										/>
										<AvatarFallback>CU</AvatarFallback>
									</Avatar>
									<Input
										placeholder="Write a comment..."
										className="flex-1"
										onKeyPress={(e) => {
											if (e.key === "Enter") {
												// handleComment(
												// 	post.id,
												// 	(e.target as HTMLInputElement).value
												// );
												// (e.target as HTMLInputElement).value = "";
											}
										}}
									/>
									<Button size="icon">
										<Send className="h-4 w-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
