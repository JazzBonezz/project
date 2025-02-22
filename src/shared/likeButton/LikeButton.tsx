import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useStore } from "../../store/store";
import styles from "./LikeButton.module.css"

type LikeButtonProps = {
    postId: number;
};

const LikeButton = ({ postId }: LikeButtonProps) => {
    const { posts, likePost } = useStore();
    const post = posts.find((p) => p.id === postId);

    if (!post) return null;

    return (
        <button onClick={() => likePost(postId)} className={styles.likeButton}>
            {post.liked ? <AiFillLike className={styles.active} /> : <AiOutlineLike />}
            {post.reactions.likes}
        </button>
    );
};

export default LikeButton;
