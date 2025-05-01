import React, {FC} from 'react';
import {Preloader} from '../../Common/Preloader/Preloader';
import styles from './Me.module.css';
import {Navigate, NavLink} from 'react-router-dom';
import {HeaderUserPropsType} from '../Header';

export const Me: FC<HeaderUserPropsType> = ({isAuth, avatar, login, isFetchingLogin, isFetchingProfile, logoutTC}) => {
    // if (isFetchingLogin || isFetchingProfile) {
    if (isFetchingLogin) {
        return <Preloader width="90px" position="right"/>;
    }

    return (
        <div className={styles.Me}>
            <>
                {isAuth
                    ? <>
                        <img className={styles.Avatar} src={avatar} alt="avatar"/>
                        {/*<div className={styles.Login}>{login}</div>*/}
                        <div onClick={logoutTC}>Logout</div>
                    </>
                    : <NavLink to={'login'}>Login</NavLink>
                }
            </>
        </div>
    );
};
