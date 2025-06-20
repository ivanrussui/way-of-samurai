import React from 'react';
import styles from './Paginator.module.css';
import {UsersProps} from '../../Users/Users';

type PaginatorProps = Omit<UsersProps, 'items' | 'changeFollow' | 'followingInProgress'>

export const Paginator = ({totalCount, count, page, setPageHandler}: PaginatorProps,) => {
    // todo тут временно хардкод, убери потом при пагинации
    // const pageCount = Math.ceil(totalCount / count);
    const pageCount = 10;

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    return <>
        {pages.map((el, index) => {
            return <span key={index} className={`${styles.Page} ${page === el ? styles.Active : ''}`}
                         onClick={() => setPageHandler(el)}>{el}</span>;
        })}
    </>;
};
