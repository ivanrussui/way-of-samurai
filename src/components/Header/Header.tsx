import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import {FC} from 'react';
import {NavLink} from 'react-router-dom';

type HeaderPropsType = {
    login: string | undefined,
    isAuth: boolean
}

export const Header: FC<HeaderPropsType> = ({login, isAuth}) => {
    // debugger
    return (
        <div className={styles.Header}>
            <img className={styles.Image} src={logo} alt="logo"/>
            <div>
                {isAuth
                    ? <div>{login}</div>
                    : <NavLink to={'login'}>Login</NavLink>
                }
            </div>
        </div>
    );
};