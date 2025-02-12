import React, {FC} from 'react';
import styles from './Users.module.css';
import {ItemDomainType} from '../../api/api';
import {User} from './User/User';

type PropsType = {
    totalCount: number
    count: number
    page: number
    items: ItemDomainType[]
    setPageHandler: (page: number) => void
    changeFollow: (useId: number, followed: boolean) => void
    followingInProgress: number[] // 'TOGGLE-FOLLOWING-IN-PROGRESS'
}

export const Users: FC<PropsType> = ({
                                         totalCount, count, page, items,
                                         setPageHandler, changeFollow, followingInProgress
                                     }) => {
    // todo тут временно хардкод, убери потом при пагинации
    // const pageCount = Math.ceil(totalCount / count);
    const pageCount = 10

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return <div className={styles.Users}>
        {pages.map((el, index) => {
            return <span key={index} className={`${styles.Page} ${page === el ? styles.Active : ''}`}
                         onClick={() => setPageHandler(el)}>{el}</span>;
        })}
        {items.map(el => <User user={el} changeFollow={changeFollow} followingInProgress={followingInProgress} key={el.id}/>)}
    </div>;
};
