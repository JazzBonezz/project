import { Outlet } from 'react-router-dom';
import NavBar from '../../components/navBar/NavBar.tsx';
import styles from './MainPage.module.css';

function MainPage() {
    return (
        <div>
            <NavBar />
            <div className={styles.appOutlet}>
                <Outlet />
            </div>
        </div>
    );
}

export default MainPage;
