import React, {FC} from 'react';
import styles from './Friends.module.css';
import {Friend} from './Friend/Friend';
import {ActionsTypes, FriendsType} from '../../types/types';

type PropsType = {
    friends: FriendsType[]
    dispatch: (action: ActionsTypes) => void
}

export const Friends: FC<PropsType> = ({friends, dispatch}) => {
    return (
        <div className={styles.Friends}>
            <h3 className={styles.Title}>Friends</h3>
            <div className={styles.Blocks}>
                {friends.map(el => <Friend key={el.id} name={el.name} id={el.id} dispatch={dispatch}/>)}
            </div>
        </div>
    );
};

