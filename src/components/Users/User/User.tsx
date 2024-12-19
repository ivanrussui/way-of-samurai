import React, {FC} from 'react';
import styles from '../Users.module.css';
import {NavLink} from 'react-router-dom';
import imgUserPhoto from '../../../assets/user.png';
import {Preloader} from '../../Common/Preloader/Preloader';
import {ItemDomainType} from '../../../api/api';

type UserType = {
    user: ItemDomainType
    changeFollow: (useId: number, followed: boolean) => void
}

export const User: FC<UserType> = ({user, changeFollow}) => {
    return <div className={styles.User}>
        <div className={styles.UserPhoto}>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small ? user.photos.small : imgUserPhoto} alt="avatar"/>
            </NavLink>
        </div>
        <h3>{user.name}</h3>
        <div>{user.status}</div>
        {user.isFetchingUser
            ? <Preloader width={'50px'} position={'left'}/>
            : <button onClick={() => changeFollow(user.id, user.followed)} className={styles.UserButton}>
                {user.followed ? 'UNFOLLOW' : 'FOLLOW'}
            </button>
        }
    </div>;
};
