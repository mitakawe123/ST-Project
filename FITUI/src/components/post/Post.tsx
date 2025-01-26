import {
    KeyboardEvent,
    MouseEvent,
    SyntheticEvent,
    useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    ThumbsUp,
    MessageCircle,
    Share2,
    Send,
    ChevronUp,
    ChevronDown,
} from "lucide-react";
import {
    useLikePostMutation,
} from "@/app/api/posts/postsApi";
import { formatSocialMediaDate, getUser } from "@/utils/utils";
import { useCreateCommentMutation } from "@/app/api/comments/commentsApi";
import useToast from "@/app/hooks/useToast";
import type { Post } from "@/interfaces/api/posts/response/posts.interface";
import { Link } from "react-router-dom";

interface PostProps {
    post: Post,
    isMine: boolean
}

const Post: React.FC<PostProps> = ({ post, isMine }) => {
    const user = getUser();
    const { showToast } = useToast();

    const [commentInputs, setCommentInputs] = useState<Record<number, string>>(
        {}
    );
    const [isExpanded, setIsExpanded] = useState(false);

    const [commentOnPost] = useCreateCommentMutation();
    const [likePost] = useLikePostMutation();


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

    const commentsToShow = isExpanded ? post.comments : post.comments.slice(0, 1);

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
                    <Link
                        className="font-semibold text-blue-500 hover:underline"
                        to={`/profile?email=${encodeURIComponent(post.userEmail)}`}
                    >
                        {post.username}
                    </Link>
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
                    onClick={() => {
                        if (!isMine) handleLikePost(post.id)
                        else showToast("You can't like your own post", "error")
                    }
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
            {!isMine && (
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
                </div>)}
        </div>
    );
}

export default Post;