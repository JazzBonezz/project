import PostCard from '../../components/post/PostCard.tsx';
import { useEffect } from 'react';
import { useStore } from '../../store/store.ts';
import { Spin } from 'antd';

const PostList = () => {
    const { fetchPosts, posts, isLoading, error } = useStore();

    useEffect(() => {
        const loadPosts = async () => {
            try {
                await fetchPosts();
            } catch (err) {
                console.error('Ошибка при загрузке постов:', err);
            }
        };

        loadPosts().catch(console.error);
    }, [fetchPosts]);

    if (isLoading) return <Spin style={{ color: 'red' }} />;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <PostCard
                        id={post.id}
                        title={post.title}
                        body={post.body}
                        views={post.views}
                        likes={post.reactions.likes}
                        dislikes={post.reactions.dislikes}
                    />
                </div>
            ))}
        </div>
    );
};

export default PostList;
