import React, {FC} from 'react';
import styles from './Friends.module.css';
import {Friend} from './Friend/Friend';
import {FriendsType} from '../../types/types';

type PropsType = {
    friends: FriendsType[]
    changeFriendName: (id: string, name: string) => void
}

export const Friends: FC<PropsType> = ({friends, changeFriendName}) => {
    return (
        <div className={styles.Friends}>
            <h3 className={styles.Title}>Friends</h3>
            <div className={styles.Blocks}>
                {friends.map(el => <Friend key={el.id} name={el.name} id={el.id}
                                           changeFriendName={changeFriendName}
                />)}
            </div>
        </div>
    );
};

