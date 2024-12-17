import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import React, {FC} from 'react';
import {User} from './User/User';

export type HeaderUserPropsType = {
    login: string | undefined
    isAuth: boolean
    avatar: string
    isFetchingLogin: boolean
}

export const Header: FC<HeaderUserPropsType> = (props) => {
    return (
        <div className={styles.Header}>
            <img className={styles.Image} src={logo} alt="logo"/>
            <User {...props}/>
        </div>
    );
};


