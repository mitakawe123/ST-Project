import { useAllMyPostsQuery } from "@/app/api/posts/postsApi";
import Post from "../Post";
interface PersonList {
    email: string;
}
const PersonList: React.FC<PersonList> = ({ email }) => {

    const { data: myPosts } = useAllMyPostsQuery(
        { Email: email },
        {
            pollingInterval: 10000,
            refetchOnMountOrArgChange: true,
            skip: false,
        }
    );
    return (<div className="max-w-2xl mx-auto p-4">
        {myPosts?.map((post) => (
            <Post key={post.id} post={post} isMine={false} />
        ))}
    </div>)
}

export default PersonList;