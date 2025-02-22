import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from './PostDetail.module.css';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useStore} from "../../store/store.ts";


const PostDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { posts, fetchPosts, isLoading, error } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (posts.length === 0) {
            fetchPosts();
        }
    }, [posts, fetchPosts]);

    const post = posts.find(p => p.id === Number(id)); // Тут чат помог

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!post) return <p>Пост не найден</p>;

    return (
        <>
            <div className={styles['post-details']}>
                <button
                    className={styles['post-details__back-button']}
                    onClick={() => navigate('/feed')}
                >
                    <FaArrowLeft />
                </button>
                <h1 className={styles['post-details__title']}>{post.title}</h1>
                <p className={styles['post-details__body']}>{post.body}</p>

                <div className={styles['post-details__reactions']}>
                    <button className={styles['post-details__likes']}>
                        <AiOutlineLike /> {post.reactions.likes}
                    </button>
                    <button className={styles['post-details__dislikes']}>
                        <AiOutlineDislike /> {post.reactions.dislikes}
                    </button>
                </div>
                <p className={styles['post-details__views']}>Views: {post.views}</p>
            </div>
            <hr className={styles['post-details__divider']} />
            <div className={styles['comment-section']}>
                <p className={styles['comment-section__no-comments']}>No comments</p>
                <div className={styles['comment-section__input-container']}>
                    <textarea className={styles['comment-section__textarea']}></textarea>
                    <button className={styles['comment-section__submit-button']}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default PostDetails;
