import {FC} from 'react';
import avatar from '../../../assets/avatar-friends.jpg'
import styles from '../Friends.module.css';

type PropsType = {
    name: string
}

export const Friend: FC<PropsType> = ({name}) => {
    return (
        <div className={styles.Block}>
            <img src={avatar} alt="img" className={styles.Image}/>
            <span className={styles.Name}>{name}</span>
        </div>
    );
};

