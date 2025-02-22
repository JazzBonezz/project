import { Outlet } from 'react-router-dom';
import NavBar from '../../components/navBar/NavBar.tsx';
import styles from './MainLayout.module.css';

function MainLayout() {
    return (
        <div>
            <NavBar />
            <div className={styles['app-outlet']}>
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
