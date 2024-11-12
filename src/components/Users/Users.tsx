import React from 'react';
import styles from './Users.module.css';
import imgUserPhoto from '../../assets/user.png';
import {FC} from 'react';
import {ItemResponseType} from './UsersContainer';

type PropsType = {
    totalCount: number
    count: number
    page: number
    items: ItemResponseType[]
    setPageHandler: (page: number) => void
    changeFollow: (useId: number, followed: boolean) => void
}

export const Users: FC<PropsType> = ({totalCount, count, page, items, setPageHandler, changeFollow}) => {
    const pageCount = Math.ceil(totalCount / count);

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return <div className={styles.Users}>
        {pages.map((el, index) => {
            return <span key={index} className={`${styles.Page} ${page === el ? styles.Active : ''}`}
                         onClick={() => setPageHandler(el)}>{el}</span>;
        })}
        {items.map(el => {
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
