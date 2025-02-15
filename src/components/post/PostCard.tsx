import styles from './Post.module.css';
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
    const localStorageKey = `post-${props.id}-reactions`;

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem(localStorageKey);
        if (storedData) {
            const { liked, disliked } = JSON.parse(storedData);
            setLiked(liked);
            setDisliked(disliked);
        }
    }, [localStorageKey]);

    const saveToLocalStorage = (liked: boolean, disliked: boolean) => {
        localStorage.setItem(localStorageKey, JSON.stringify({ liked, disliked }));
    };

    const handleLike = () => {
        const newLiked = !liked;
        const newDisliked = newLiked ? false : disliked;
        setLiked(newLiked);
        setDisliked(newDisliked);
        saveToLocalStorage(newLiked, newDisliked);
    };

    const handleDislike = () => {
        const newDisliked = !disliked;
        const newLiked = newDisliked ? false : liked;
        setDisliked(newDisliked);
        setLiked(newLiked);
        saveToLocalStorage(newLiked, newDisliked);
    };

    return (
        <>
            <div className={styles.postCard}>
                <div className={styles.postCard__bodyWrapper}>
                    <h2 className={styles.postCard__title}>{props.title}</h2>
                    <div className={styles.postCard__body}>{props.body}</div>
                </div>

                <div className={styles.postCard__bottomSection}>
                    <div className={styles.postCard__reactions}>
                        <button className={styles.postCard__reactionButton} onClick={handleLike}>
                            {liked ? <AiFillLike style={{ marginRight: '8px', color: 'white' }} /> : <AiOutlineLike style={{ marginRight: '8px' }} />}
                            {liked ? (props.likes + 1) : props.likes }
                        </button>
                        <button className={styles.postCard__reactionButton} onClick={handleDislike}>
                            {disliked ? <AiFillDislike style={{ marginRight: '8px', color: 'red' }} /> : <AiOutlineDislike style={{ marginRight: '8px' }} />}
                            {disliked ? (props.dislikes + 1) : props.dislikes }
                        </button>
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
