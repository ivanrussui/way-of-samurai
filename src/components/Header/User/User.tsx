import React, {FC} from 'react';
import {Preloader} from '../../Common/Preloader/Preloader';
import styles from './User.module.css';
import {NavLink} from 'react-router-dom';
import {HeaderUserPropsType} from '../Header';

export const User: FC<HeaderUserPropsType> = ({isAuth, avatar, login, isFetchingLogin}) => {
    if (isFetchingLogin) {
        return <Preloader width="90px" position="right"/>;
    }

    return (
        <div className={styles.User}>
            {isAuth
                ? <>
                    <img className={styles.Avatar} src={avatar} alt="avatar"/>
                    <div className={styles.Login}>{login}</div>
                </>
                : <NavLink to={'login'}>Login</NavLink>
            }
        </div>
    );
};
