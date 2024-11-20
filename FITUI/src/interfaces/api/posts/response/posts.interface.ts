export interface Post {
	id: number;
	content: string;
	avatarImg: string;
	image: string;
	likes: number;
	createdAt: Date;
	comments: Comment[];
}

interface Comment {
	id: number;
	userId: number;
	postId: number;
	content: string;
	createdAt: Date;
}
