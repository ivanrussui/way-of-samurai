import React from 'react';
import styles from './Users.module.css';
import {ItemDomainType} from '../../api/api';
import {User} from './User/User';
import {Paginator} from '../Common/Paginator/Paginator';

export type UsersProps = {
    totalCount: number
    count: number
    page: number
    items: ItemDomainType[]
    setPageHandler: (page: number) => void
    changeFollow: (useId: number, followed: boolean) => void
    followingInProgress: number[] // 'TOGGLE-FOLLOWING-IN-PROGRESS'
}

export const Users = ({items, changeFollow, followingInProgress, ...props}: UsersProps) => {
    return <div className={styles.Users}>
        <Paginator {...props}/>
        {items.map(el => <User user={el} changeFollow={changeFollow}
                               followingInProgress={followingInProgress} key={el.id}/>)}
    </div>;
};
