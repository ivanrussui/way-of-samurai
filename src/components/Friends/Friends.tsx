import React, {FC} from 'react';
import styles from './Friends.module.css';
import {Friend} from './Friend/Friend';
import {FriendsPropsType} from './FriendsContainer';

export const Friends: FC<FriendsPropsType> = ({friends, changeFriend}) => {
    return (
        <div className={styles.Friends}>
            <h3 className={styles.Title}>Friends</h3>
            <div className={styles.Blocks}>
                {friends.map(el =>
                    <Friend key={el.id} name={el.name} id={el.id} changeFriendName={changeFriend}/>)}
            </div>
        </div>
    );
};

