import styles from './Navbar.module.css';

export const Navbar = () => {
    return (
            <nav className={styles.Navbar}>
                <div className={styles.Item}>Profile</div>
                <div className={styles.Item}>Dialogs</div>
                <div className={styles.Item}>Users</div>
                <div className={styles.Item}>News</div>
                <div className={styles.Item}>Music</div>
                <div className={styles.Item}>Settings</div>
            </nav>
    );
};