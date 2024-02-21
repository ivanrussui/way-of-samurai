import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import {FC} from 'react';

export const Header: FC = () => {
    return (
        <div className={styles.Header}>
            <img className={styles.Image} src={logo} alt="logo"/>
        </div>
    );
};