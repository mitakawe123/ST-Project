import { Comment } from "../../comments/response/comment.interface";

export interface Post {
	id: number;
	content: string;
	avatarImg: string;
	image: string;
	likes: number;
	createdAt: Date;
	comments: Comment[];
}
