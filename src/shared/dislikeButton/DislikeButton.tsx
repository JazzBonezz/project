import { AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { useStore } from "../../store/store";

type DislikeButtonProps = {
    postId: number;
};

const DislikeButton = ({ postId }: DislikeButtonProps) => {
    const { posts, dislikePost } = useStore();
    const post = posts.find((p) => p.id === postId);

    if (!post) return null;

    return (
        <button onClick={() => dislikePost(postId)}>
            {post.disliked ? <AiFillDislike style={{ color: "red" }} /> : <AiOutlineDislike />}
            {post.reactions.dislikes}
        </button>
    );
};

export default DislikeButton;
