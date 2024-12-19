import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import React, {FC} from 'react';
import {Me} from './Me/Me';

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
            <Me {...props}/>
        </div>
    );
};


