import { useEffect, useState } from 'react';
import styles from './BarGraph.module.css'
import { Bar } from 'react-chartjs-2';
import { fetchPosts } from '../../api/api.ts';

import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    ArcElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    LineElement,
    BarElement,
    ArcElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

type PostData = {
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
};

const BarGraph = () => {
    const [likes, setLikes] = useState<number[]>([]);
    const [dislikes, setDislikes] = useState<number[]>([]);
    const [views, setViews] = useState<number[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const posts: PostData[] = await fetchPosts();

                setLikes(posts.map(post => post.reactions.likes));
                setDislikes(posts.map(post => post.reactions.dislikes));
                setViews(posts.map(post => post.views));
            } catch (error) {
                console.error('Ошибка загрузки данных для аналитики:', error);
            }
        };

        loadData().catch(error => console.error('loadData error:', error));
    }, []);

    const labels = likes.map((_, index) => `Post ${index + 1}`);

    const barData = {
        labels,
        datasets: [
            {
                label: 'Likes',
                data: likes,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Dislikes',
                data: dislikes,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Views',
                data: views,
                backgroundColor: 'rgba(255, 205, 86, 0.6)',
            },
        ],
    };


    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            }
        }
    }

    return (
        <div className={styles["bar-graph"]}>
                    <Bar data={barData} options={barOptions} />

        </div>
    );
};

export default BarGraph;
