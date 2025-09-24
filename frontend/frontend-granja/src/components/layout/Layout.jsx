import { Outlet } from 'react-router-dom'
import CustomNavbar from '../navbar/CustomNavbar';
import Sidebar from '../sidebar/Sidebar';
import styles from './Layout.module.css';

function Layout() {
    return (
        <div className={styles.layout}>
            <CustomNavbar />
            <div className={styles.contentWrapper}>
                <Sidebar />
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout