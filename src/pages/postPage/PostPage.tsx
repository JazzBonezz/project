import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './PostPage.module.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useStore } from '../../store/store.ts';
import LikeButton from '../../shared/likeButton/LikeButton.tsx';
import DislikeButton from '../../shared/dislikeButton/DislikeButton.tsx';

const PostDetails = () => {
    const { id } = useParams<{
        id: string;
    }>();
    const { posts, fetchPosts, isLoading, error } = useStore();
    const navigate = useNavigate();

    // Скролл постоянно опускается при открытии страницы. В интернете нашёл такое решение.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (posts.length === 0) {
            fetchPosts();
        }
    }, [posts, fetchPosts]);

    const post = posts.find((p) => p.id === Number(id));

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!post) return <p>Пост не найден</p>;

    return (
        <>
            <div className={styles.postDetails}>
                <button className={styles.backButton} onClick={() => navigate('/feed')}>
                    <FaArrowLeft />
                    Back to posts
                </button>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.body}>{post.body}</p>

                <div className={styles.bottomSection}>
                    <div className={styles.reactions}>
                        <LikeButton postId={post.id} />
                        <DislikeButton postId={post.id} />
                    </div>
                    <p className={styles.views}>Views: {post.views}</p>
                </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.commentSection}>
                <p className={styles.noComments}>No comments</p>
                <div className={styles.inputContainer}>
                    <input className={styles.textarea}></input>
                    <button className={styles.submitButton}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default PostDetails;
