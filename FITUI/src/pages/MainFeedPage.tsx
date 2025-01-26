import {
	ChangeEvent,
	FormEvent,
	useRef,
	useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	ImageIcon,
	X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	useCreatePostMutation,
} from "@/app/api/posts/postsApi";
import { convertToBase64, getUser } from "@/utils/utils";
import useToast from "@/app/hooks/useToast";
import { Label } from "@/components/ui/label";
import MyPosts from "@/components/post/post-lists/MyPosts";
import PostsList from "@/components/post/post-lists/PostsList";

export default function MainFeed() {
	const user = getUser();
	const { showToast } = useToast();

	const [newPost, setNewPost] = useState("");
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [createPost] = useCreatePostMutation();

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

	return (
		<div className="container mx-auto p-4">
			<Tabs defaultValue="feed">
				<TabsList className="mb-4">
					<TabsTrigger value="feed">Feed</TabsTrigger>
					<TabsTrigger value="my-posts">My Posts</TabsTrigger>
				</TabsList>
				<TabsContent value="my-posts">
					<MyPosts />
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
						<PostsList />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}