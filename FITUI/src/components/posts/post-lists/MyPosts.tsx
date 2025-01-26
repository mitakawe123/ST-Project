import { useAllMyPostsQuery } from "@/app/api/posts/postsApi";
import Post from "../Post";
import { getUser } from "@/utils/utils";
 
const MyPosts: React.FC = () => {
    const user = getUser();
 
    const { data: myPosts } = useAllMyPostsQuery(
        { Email: user.Email },
        {
            pollingInterval: 10000,
            refetchOnMountOrArgChange: true,
            skip: false,
        }
    );
    return (<div className="max-w-2xl mx-auto p-4">
        {myPosts?.map((post) => (
            <Post key={post.id} post={post} isMine={true} />
        ))}
    </div>)
}
 
export default MyPosts;