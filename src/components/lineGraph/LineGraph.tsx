import styles from './LineGraph.module.css'
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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

const LineGraph = () => {
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

    const lineData = {
        labels,
        datasets: [
            {
                label: 'Likes',
                data: likes,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0,
            },
            {
                label: 'Dislikes',
                data: dislikes,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0,
            },
            {
                label: 'Views',
                data: views,
                borderColor: 'rgba(255, 205, 86, 1)',
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                tension: 0,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            }
        }
    }

    return (
        <div className={styles["line-graph"]}>
            <Line data={lineData} options={lineOptions} />
        </div>
    );
};

export default LineGraph;
