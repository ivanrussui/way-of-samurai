import React, {FC} from 'react';
import {Preloader} from '../../Common/Preloader/Preloader';
import styles from './Me.module.css';
import {NavLink} from 'react-router-dom';
import {HeaderUserPropsType} from '../Header';

export const Me: FC<HeaderUserPropsType> = ({isAuth, avatar, login, isFetchingLogin, isFetchingProfile, logoutTC}) => {
    if (isFetchingLogin) {
        return <Preloader width="90px" position="right"/>;
    }

    return (
        <div className={styles.Me}>
            <>
                {isAuth
                    ? <>
                        <div className={styles.Blocks} onClick={logoutTC}>
                            <img className={styles.Avatar} src={avatar} alt="avatar"/>
                            <div>Logout {login}</div>
                        </div>
                    </>
                    : <NavLink to={'login'}>Login</NavLink>
                }
            </>
        </div>
    );
};
