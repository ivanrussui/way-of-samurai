import preloader from '../../../assets/spinner.svg'
import styles from './Preloader.module.css';

export const Preloader = () => <img src={preloader} alt="Preloader" className={styles.Preloader}/>;