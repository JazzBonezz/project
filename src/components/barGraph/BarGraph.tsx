import styles from './BarGraph.module.css';
import { Bar } from 'react-chartjs-2';
import { useChartData } from '../../hooks/useChartData.ts';

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
import { useMemo } from 'react';

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

const BarGraph = () => {
    const { likes, dislikes, views } = useChartData();

    const labels = useMemo(() => {
        return likes.map((_, index) => `Post ${index + 1}`);
    }, [likes]);

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
            },
        },
    };

    return (
        <div className={styles.barGraph}>
            <Bar data={barData} options={barOptions} />
        </div>
    );
};

export default BarGraph;
