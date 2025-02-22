import { AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { useStore } from "../../store/store";
import styles from './DislikeButton.module.css'

type DislikeButtonProps = {
    postId: number;
};

const DislikeButton = ({ postId }: DislikeButtonProps) => {
    const { posts, dislikePost } = useStore();
    const post = posts.find((p) => p.id === postId);

    if (!post) return null;

    return (
        <button onClick={() => dislikePost(postId)} className={styles.dislikeButton}>
            {post.disliked ? <AiFillDislike className={styles.active} /> : <AiOutlineDislike />}
            {post.reactions.dislikes}
        </button>
    );
};

export default DislikeButton;
