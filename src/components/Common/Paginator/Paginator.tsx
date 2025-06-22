import React, {useMemo} from 'react';
import styles from './Paginator.module.css';
import {UsersProps} from '../../Users/Users';
import {Button} from '../Button/Button';

type PaginatorProps = Omit<UsersProps, 'items' | 'changeFollow' | 'followingInProgress'>

export const Paginator = ({totalCount, count, page, setPageHandler}: PaginatorProps,) => {
    const portionSize = 10; // Размер "окна" страниц
    const pageCount = Math.ceil(totalCount / count); // Общее количество страниц
    const portionNumber = Math.ceil(page / portionSize); // Расчет текущей порции страниц
    const leftBoundary = Math.max(1, (portionNumber - 1) * portionSize + 1);  // Левая граница текущего "окна"
    const rightBoundary = Math.min(pageCount, portionNumber * portionSize); // Правая граница текущего "окна"

    // Генерация видимых страниц
    const visibleItems = useMemo(() => {
        let pages: number[] = [];
        for (let i = leftBoundary; i <= rightBoundary; i++) {
            pages.push(i);
        }
        return pages;
    }, [leftBoundary, rightBoundary]);

    // Обработчики навигации
    const prevPortionHandler = () => setPageHandler(Math.max(1, leftBoundary - portionSize));
    const nextPortionHandler = () => setPageHandler(Math.min(pageCount, rightBoundary + 1));

    return <div className={styles.Paginator}>
        <Button name={'PREV'} onClick={prevPortionHandler} disabled={portionNumber === 1}/>
        {visibleItems.map((el, index) => {
            return <span key={index} className={`${styles.Page} ${page === el ? styles.Active : ''}`}
                         data-testid="page-span"
                         onClick={() => setPageHandler(el)}>{el}</span>;
        })}
        <Button name={'NEXT'} onClick={nextPortionHandler}
                disabled={portionNumber === Math.ceil(pageCount / portionSize)}/>
    </div>;
};
