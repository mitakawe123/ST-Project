import { useAllPostsQuery } from "@/app/api/posts/postsApi";
import { getUser } from "@/utils/utils";
import Post from "../Post";

const PostsList: React.FC = () => {
    const user = getUser();
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
    return (<div className="max-w-2xl mx-auto p-4">
        {posts?.map((post) => (
            <Post key={post.id} post={post} isMine={false} />
        ))}
    </div>)
}

export default PostsList;