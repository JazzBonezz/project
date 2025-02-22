import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/api.ts';

type PostData = {
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
};

export const usePostsData = () => {
    const [likes, setLikes] = useState<number[]>([]);
    const [dislikes, setDislikes] = useState<number[]>([]);
    const [views, setViews] = useState<number[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const posts: PostData[] = await fetchPosts();
                setLikes(posts.map((post) => post.reactions.likes));
                setDislikes(posts.map((post) => post.reactions.dislikes));
                setViews(posts.map((post) => post.views));
            } catch (error) {
                console.error('Chart loading error:', error);
            }
        };

        loadData().catch((error) => console.error('loadData error:', error));
    }, []);

    return { likes, dislikes, views };
};
