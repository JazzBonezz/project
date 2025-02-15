import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../api/api.ts"; // Если данные доступны глобально, использовать контекст
import styles from './PostDetail.module.css';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

type PostType = {
    id: number;
    title: string;
    body: string;
    views: number;
    reactions: {
        likes: number;
        dislikes: number;
    };
};

const PostDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<PostType | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loadPost = async () => {
            try {
                const posts = await fetchPosts();
                const selectedPost = posts.find((p: PostType) => p.id === Number(id));
                setPost(selectedPost || null);
            } catch (error) {
                console.error("Error loading post details", error);
            }
        };
        loadPost();
    }, [id]);

    if (!post) return <p>Post not found</p>;

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
