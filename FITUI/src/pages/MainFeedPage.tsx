import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageCircle, Share2, Send } from "lucide-react";

// Define types for our data structures
type Comment = {
	id: number;
	user: string;
	avatar: string;
	content: string;
	likes: number;
};

type Post = {
	id: number;
	user: string;
	avatar: string;
	content: string;
	image?: string;
	likes: number;
	comments: Comment[];
};

// Mock data for initial posts
const initialPosts: Post[] = [
	{
		id: 1,
		user: "Jane Doe",
		avatar: "https://i.pravatar.cc/150?img=1",
		content:
			"Just finished my morning run! 🏃‍♀️ Feeling energized and ready to tackle the day. #FitnessGoals",
		image:
			"https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80",
		likes: 15,
		comments: [
			{
				id: 1,
				user: "John Smith",
				avatar: "https://i.pravatar.cc/150?img=2",
				content: "Great job! Keep it up!",
				likes: 2,
			},
		],
	},
	{
		id: 2,
		user: "Alex Johnson",
		avatar: "https://i.pravatar.cc/150?img=3",
		content:
			"New personal best at the gym today! 💪 Remember, every rep counts. What's your fitness goal this week?",
		likes: 32,
		comments: [],
	},
];

export default function MainFeed() {
	const [posts, setPosts] = useState<Post[]>(initialPosts);
	const [newPost, setNewPost] = useState("");

	const handlePostSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (newPost.trim()) {
			const post: Post = {
				id: posts.length + 1,
				user: "Current User",
				avatar: "https://i.pravatar.cc/150?img=5",
				content: newPost,
				likes: 0,
				comments: [],
			};
			setPosts([post, ...posts]);
			setNewPost("");
		}
	};

	const handleLike = (postId: number) => {
		setPosts(
			posts.map((post) =>
				post.id === postId ? { ...post, likes: post.likes + 1 } : post
			)
		);
	};

	const handleComment = (postId: number, comment: string) => {
		setPosts(
			posts.map((post) =>
				post.id === postId
					? {
							...post,
							comments: [
								...post.comments,
								{
									id: post.comments.length + 1,
									user: "Current User",
									avatar: "https://i.pravatar.cc/150?img=5",
									content: comment,
									likes: 0,
								},
							],
					  }
					: post
			)
		);
	};

	return (
		<div className="max-w-2xl mx-auto p-4">
			<form onSubmit={handlePostSubmit} className="mb-8">
				<Textarea
					value={newPost}
					onChange={(e) => setNewPost(e.target.value)}
					placeholder="What's on your mind?"
					className="mb-2"
				/>
				<Button type="submit">Post</Button>
			</form>

			{posts.map((post) => (
				<div key={post.id} className="bg-white rounded-lg shadow-md mb-6 p-4">
					<div className="flex items-center mb-4">
						<Avatar className="h-10 w-10 mr-3">
							<AvatarImage src={post.avatar} alt={post.user} />
							<AvatarFallback>{post.user[0]}</AvatarFallback>
						</Avatar>
						<div>
							<h3 className="font-semibold">{post.user}</h3>
							<p className="text-sm text-gray-500">Just now</p>
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
						<Button variant="ghost" onClick={() => handleLike(post.id)}>
							<ThumbsUp className="mr-2 h-4 w-4" /> {post.likes}
						</Button>
						<Button variant="ghost">
							<MessageCircle className="mr-2 h-4 w-4" /> {post.comments.length}
						</Button>
						<Button variant="ghost">
							<Share2 className="mr-2 h-4 w-4" /> Share
						</Button>
					</div>
					<div className="space-y-4">
						{post.comments.map((comment) => (
							<div key={comment.id} className="flex items-start space-x-3">
								<Avatar className="h-8 w-8">
									<AvatarImage src={comment.avatar} alt={comment.user} />
									<AvatarFallback>{comment.user[0]}</AvatarFallback>
								</Avatar>
								<div className="flex-1 bg-gray-100 rounded-lg p-3">
									<h4 className="font-semibold">{comment.user}</h4>
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
									handleComment(post.id, (e.target as HTMLInputElement).value);
									(e.target as HTMLInputElement).value = "";
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
	);
}
