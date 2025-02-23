import { useEffect, useState } from 'react';
import { useStore } from '../store/store.ts';

export const useChartData = () => {
    const { posts } = useStore();
    const [likes, setLikes] = useState<number[]>([]);
    const [dislikes, setDislikes] = useState<number[]>([]);
    const [views, setViews] = useState<number[]>([]);

    // Вообще не понял что делать с тем, что ниже
    useEffect(() => {
        setLikes(posts.map((post) => post.reactions.likes));
        setDislikes(posts.map((post) => post.reactions.dislikes));
        setViews(posts.map((post) => post.views));
    }, [posts]);

    return { likes, dislikes, views };
};
