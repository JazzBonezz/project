import styles from './Post.module.css';
import { GoCommentDiscussion } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../shared/likeButton/LikeButton.tsx";
import DislikeButton from "../../shared/dislikeButton/DislikeButton.tsx";


type PostCardProps = {
    title: string;
    body: string;
    views: number;
    likes: number;
    dislikes: number;
    id: number;
};

const PostCard = (props: PostCardProps) => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.postCard}>
                <div className={styles.postCard__bodyWrapper}>
                    <h2 className={styles.postCard__title}>{props.title}</h2>
                    <div className={styles.postCard__body}>{props.body}</div>
                </div>

                <div className={styles.postCard__bottomSection}>
                    <div className={styles.postCard__reactions}>
                        <LikeButton postId={props.id} />
                        <DislikeButton postId={props.id} />
                        <button className={styles.postCard__reactionButton} onClick={() => navigate(`/post/${props.id}`)}>
                            <GoCommentDiscussion />
                        </button>
                        <div className={styles.postCard__views}>views: {props.views}</div>
                    </div>
                </div>
            </div>
            <hr className={styles.postCard__divider} />
        </>
    );
};

export default PostCard;
