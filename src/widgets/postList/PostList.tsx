import PostCard from '../../components/post/PostCard.tsx';
import { useEffect, useState, useMemo } from 'react';
import { useStore } from '../../store/store.ts';
import { Spin } from 'antd';
import styles from './PostList.module.css';

const PostList = () => {
    const { fetchPosts, posts, isLoading, error } = useStore();
    const [activeTags, setActiveTags] = useState<string[]>([]);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                await fetchPosts();
            } catch (err) {
                console.error('Ошибка при загрузке постов:', err);
            }
        };

        loadPosts().catch(console.error);
    }, []); // Нужно ли тут в зависимости вписывать fetchPosts или лучше оставить пустым?

    const toggleTag = (tag: string) => {
        setActiveTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
    };

    const allTags = useMemo(() => {
        const tagsSet = new Set<string>();
        posts.forEach((post) => post.tags.forEach((tag: string) => tagsSet.add(tag)));
        return Array.from(tagsSet);
    }, [posts]);

    const filteredPosts = useMemo(() => {
        if (activeTags.length === 0) return posts;
        return posts.filter(({ tags }) => {
            const tagsSet = new Set(tags);
            return activeTags.every((tag) => tagsSet.has(tag));
        });
    }, [posts, activeTags]);

    if (isLoading) return <Spin />;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div>
            {/* Кнопки тегов */}
            <div className={styles.tagContainer}>
                <h2 className={styles.tagContainer__title}>Tags: </h2>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`${styles.tagButton} ${activeTags.includes(tag) ? styles.active : ''}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            {filteredPosts.length === 0 ? (
                <p>No posts</p>
            ) : (
                filteredPosts.map((post) => (
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
                ))
            )}
        </div>
    );
};

export default PostList;
