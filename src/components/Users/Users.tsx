import React, {FC} from 'react';
import styles from './Users.module.css';
import {UsersPropsType} from './UsersContainer';
import imgUserPhoto from '../../assets/user.png';

export const Users: FC<UsersPropsType> = ({users, setUsers, followUnfollow}) => {

    if (users.length === 0) {
        setUsers([
            {
                id: 1,
                name: 'Ivan',
                status: 'JS Forever',
                photos: {
                    small: '',
                    large: ''
                },
                followed: true
            },
            {
                id: 2,
                name: 'Anna',
                status: 'JS Forever',
                photos: {
                    small: '',
                    large: ''
                },
                followed: false
            }
        ]);
    }

    const changeFollow = (useId: number, followed: boolean) => {
        followUnfollow(useId, !followed);
    };

    return <div className={styles.Users}>
        {users.map(el => {
            return <div className={styles.User} key={el.id}>
                <div className={styles.UserPhoto}>
                    <img src={el.photos.small ? el.photos.small : imgUserPhoto} alt="avatar"/>
                </div>
                <h3>{el.name}</h3>
                <div>{el.status}</div>
                <button onClick={() => changeFollow(el.id, el.followed)}
                        className={styles.UserButton}>{el.followed ? 'UNFOLLOW' : 'FOLLOW'}</button>
            </div>;
        })}

    </div>;
};
