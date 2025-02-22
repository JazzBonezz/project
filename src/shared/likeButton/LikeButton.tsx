import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useStore } from "../../store/store";

type LikeButtonProps = {
    postId: number;
};

const LikeButton = ({ postId }: LikeButtonProps) => {
    const { posts, likePost } = useStore();
    const post = posts.find((p) => p.id === postId);

    if (!post) return null;

    return (
        <button onClick={() => likePost(postId)}>
            {post.liked ? <AiFillLike style={{ color: "white" }} /> : <AiOutlineLike />}
            {post.reactions.likes}
        </button>
    );
};

export default LikeButton;
