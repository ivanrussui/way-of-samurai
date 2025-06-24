import React, {FC} from 'react';
import styles from './User.module.css';
import {NavLink} from 'react-router-dom';
import imgUserPhoto from '../../../assets/user.png';
import {ItemDomainType} from '../../../api/api';
import {Button} from '../../Common/Button/Button';

type UserType = {
    user: ItemDomainType
    changeFollow: (useId: number, followed: boolean) => void
    followingInProgress: number[] // 'TOGGLE-FOLLOWING-IN-PROGRESS'
}

export const User: FC<UserType> = ({user, changeFollow, followingInProgress}) => {

    return <div className={styles.User}>
        <div className={styles.UserPhoto}>
            <NavLink to={'/profile/' + user.id}>
                <img className={styles.UserImg} src={user.photos.small ? user.photos.small : imgUserPhoto}
                     alt="avatar"/>
            </NavLink>
        </div>
        <h3 className={styles.Name}>{user.name}</h3>
        <div>{user.status}</div>

        <Button onClick={() => changeFollow(user.id, user.followed)}
                name={user.followed ? 'UNFOLLOW' : 'FOLLOW'}
            // disabled={user.isFetchingUser} // 'TOGGLE-IS-FETCHING-USER'
                disabled={followingInProgress.some(el => el === user.id)}  // 'TOGGLE-FOLLOWING-IN-PROGRESS'
        />
    </div>;
};
