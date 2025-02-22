import LineGraph from '../../components/lineGraph/LineGraph.tsx';
import PieGraph from '../../components/pieGraph/PieGraph.tsx';
import BarGraph from '../../components/barGraph/BarGraph.tsx';
import styles from './AnalyticsPage.module.css';

const AnalyticsPage = () => {
    return (
        <div className={styles['analytics-page']}>
            <LineGraph />
            <hr className={styles['analytics-page__line']} />
            <PieGraph />
            <hr className={styles['analytics-page__line']} />
            <BarGraph />
        </div>
    );
};

export default AnalyticsPage;
