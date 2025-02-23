import { Pie } from 'react-chartjs-2';
import styles from './PieGraph.module.css';
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

const PieGraph = () => {
    const { likes, dislikes, views } = useChartData();

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
            },
        },
    };

    return (
        <div className={styles['pie-graph']}>
            <Pie data={pieData} options={pieOptions} />
        </div>
    );
};

export default PieGraph;
