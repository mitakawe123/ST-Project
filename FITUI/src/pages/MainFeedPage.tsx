import {
	ChangeEvent,
	FormEvent,
	KeyboardEvent,
	MouseEvent,
	SyntheticEvent,
	useRef,
	useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
	ThumbsUp,
	MessageCircle,
	Share2,
	Send,
	ImageIcon,
	X,
	ChevronUp,
	ChevronDown,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	useAllMyPostsQuery,
	useAllPostsQuery,
	useCreatePostMutation,
	useLikePostMutation,
} from "@/app/api/posts/postsApi";
import { convertToBase64, formatSocialMediaDate, getUser } from "@/utils/utils";
import { useCreateCommentMutation } from "@/app/api/comments/commentsApi";
import useToast from "@/app/hooks/useToast";
import { Label } from "@/components/ui/label";

export default function MainFeed() {
	const user = getUser();
	const { showToast } = useToast();

	const { data: posts } = useAllPostsQuery(
		{
			Email: user.Email,
		},
		{
			pollingInterval: 5000,
			refetchOnMountOrArgChange: true,
			skip: false,
		}
	);

	const { data: myPosts } = useAllMyPostsQuery(
		{ Email: user.Email },
		{
			pollingInterval: 10000,
			refetchOnMountOrArgChange: true,
			skip: false,
		}
	);

	const [newPost, setNewPost] = useState("");
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [commentInputs, setCommentInputs] = useState<Record<number, string>>(
		{}
	);
	const [isExpanded, setIsExpanded] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [createPost] = useCreatePostMutation();
	const [commentOnPost] = useCreateCommentMutation();
	const [likePost] = useLikePostMutation();

	const handlePost = async (event: FormEvent) => {
		event.preventDefault();

		try {
			let imageBase64 = null;

			if (selectedImage) {
				imageBase64 = await convertToBase64(selectedImage);
			}

			await createPost({
				content: newPost,
				email: user.Email,
				image: imageBase64,
			});

			setNewPost("");
			setSelectedImage(null);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
			showToast("Go to My Posts to see your new post", "success");
		} catch (error) {
			showToast("Error creating post. Please try again later.", "error");
		}
	};

	const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setSelectedImage(event.target.files[0]);
		}
	};

	const handleRemoveImage = () => {
		setSelectedImage(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	async function handleComment(
		event: SyntheticEvent,
		postId: number,
		content: string
	) {
		event.preventDefault();

		await commentOnPost({
			email: user.Email,
			postId: postId,
			content: content,
		});

		showToast("Succesfully comment on post", "success");
	}

	async function handleLikePost(postId: number) {
		await likePost({
			postId: postId,
		});
	}

	const submitComment = (e: KeyboardEvent | MouseEvent, postId: number) => {
		if (e.type === "click" || (e as KeyboardEvent).key === "Enter") {
			const content = commentInputs[postId]?.trim();
			if (content) {
				handleComment(e, postId, content);
				setCommentInputs((prev) => ({ ...prev, [postId]: "" })); // Clear input field
			}
		}
	};

	return (
		<div className="container mx-auto p-4">
			<Tabs defaultValue="feed">
				<TabsList className="mb-4">
					<TabsTrigger value="feed">Feed</TabsTrigger>
					<TabsTrigger value="my-posts">My Posts</TabsTrigger>
				</TabsList>
				<TabsContent value="my-posts">
					<div className="max-w-2xl mx-auto p-4">
						{myPosts?.map((post) => {
							const commentsToShow = isExpanded
								? post.comments
								: post.comments.slice(0, 1);

							return (
								<div
									key={post.id}
									className="bg-white rounded-lg shadow-md mb-6 p-4"
								>
									<div className="flex items-center mb-4">
										<Avatar className="h-10 w-10 mr-3">
											<AvatarImage src={post.avatarImg} alt="avatar-image" />
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
										{commentsToShow.map((comment) => (
											<div
												key={comment.id}
												className="flex items-start space-x-3"
											>
												<Avatar className="h-8 w-8">
													<AvatarImage
														src={comment.avatarImg}
														alt="User that comments"
													/>
													<AvatarFallback />
												</Avatar>
												<div className="flex-1 bg-gray-100 rounded-lg p-3">
													<h4 className="font-semibold">{comment.username}</h4>
													<p>{comment.content}</p>
												</div>
											</div>
										))}
									</div>
									{post.comments.length > 1 && (
										<Button
											variant="ghost"
											className="w-full justify-center"
											onClick={() => setIsExpanded(!isExpanded)}
										>
											{isExpanded ? (
												<>
													<ChevronUp className="mr-2 h-4 w-4" />
													Show less
												</>
											) : (
												<>
													<ChevronDown className="mr-2 h-4 w-4" />
													Show {post.comments.length - 1} more comments
												</>
											)}
										</Button>
									)}
								</div>
							);
						})}
					</div>
				</TabsContent>
				<TabsContent value="feed">
					<div className="max-w-2xl mx-auto p-4">
						<form onSubmit={handlePost} className="space-y-4">
							<Textarea
								value={newPost}
								onChange={(e) => setNewPost(e.target.value)}
								placeholder="What's on your mind?"
								className="min-h-[100px]"
							/>
							<div className="flex items-center space-x-2">
								<Input
									type="file"
									accept="image/*"
									onChange={handleImageSelect}
									ref={fileInputRef}
									className="hidden"
									id="image-upload"
								/>
								<Label htmlFor="image-upload" className="cursor-pointer">
									<div className="flex items-center space-x-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md">
										<ImageIcon size={18} />
										<span>Add Photo</span>
									</div>
								</Label>
								{selectedImage && (
									<div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-3 py-1 rounded-md">
										<span className="text-sm truncate max-w-[150px]">
											{selectedImage.name}
										</span>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="h-8 w-8"
											onClick={handleRemoveImage}
										>
											<X size={16} />
										</Button>
									</div>
								)}
							</div>
							<Button type="submit">Post</Button>
						</form>
						{posts?.map((post) => {
							const commentsToShow = isExpanded
								? post.comments
								: post.comments.slice(0, 1);

							return (
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
											onClick={() => handleLikePost(post.id)}
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
										{commentsToShow.map((comment) => (
											<div
												key={comment.id}
												className="flex items-start space-x-3"
											>
												<Avatar className="h-8 w-8">
													<AvatarImage
														src={comment.avatarImg}
														alt="User that comments"
													/>
													<AvatarFallback />
												</Avatar>
												<div className="flex-1 bg-gray-100 rounded-lg p-3">
													<h4 className="font-semibold">{comment.username}</h4>
													<p>{comment.content}</p>
												</div>
											</div>
										))}
									</div>
									{post.comments.length > 1 && (
										<Button
											variant="ghost"
											className="w-full justify-center"
											onClick={() => setIsExpanded(!isExpanded)}
										>
											{isExpanded ? (
												<>
													<ChevronUp className="mr-2 h-4 w-4" />
													Show less
												</>
											) : (
												<>
													<ChevronDown className="mr-2 h-4 w-4" />
													Show {post.comments.length - 1} more comments
												</>
											)}
										</Button>
									)}
									<div className="mt-4 flex items-center space-x-2">
										<Avatar className="h-8 w-8">
											<AvatarImage src={""} alt="Current User" />
											<AvatarFallback />
										</Avatar>
										<Input
											value={commentInputs[post.id] || ""}
											placeholder="Write a comment..."
											className="flex-1"
											onChange={(e) =>
												setCommentInputs((prev) => ({
													...prev,
													[post.id]: e.target.value,
												}))
											}
											onKeyPress={(e) => submitComment(e, post.id)}
										/>
										<Button
											size="icon"
											onClick={(e) => submitComment(e, post.id)}
										>
											<Send className="h-4 w-4" />
										</Button>
									</div>
								</div>
							);
						})}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
