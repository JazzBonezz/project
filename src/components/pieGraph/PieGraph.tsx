import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchPosts } from '../../api/api.ts';
import styles from './PieGraph.module.css'

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

const PieGraph = () => {
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

    const pieData = {
        labels: ['Likes', 'Dislikes', 'Views'],
        datasets: [
            {
                data: [
                    likes.reduce((a, b) => a + b, 0),
                    dislikes.reduce((a, b) => a + b, 0),
                    views.reduce((a, b) => a + b, 0),
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                ],
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            }
        }
    }

    return (
        <div className={styles["pie-graph"]}>

                    <Pie data={pieData} options={pieOptions} />

        </div>
    );
};

export default PieGraph;
