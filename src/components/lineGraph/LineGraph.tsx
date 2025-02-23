import styles from './LineGraph.module.css';
import { Line } from 'react-chartjs-2';
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

const LineGraph = () => {
    const { likes, dislikes, views } = useChartData();
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
            },
        },
    };

    return (
        <div className={styles.lineGraph}>
            <Line data={lineData} options={lineOptions} />
        </div>
    );
};

export default LineGraph;
