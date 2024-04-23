import React, {FC} from 'react';
import styles from '../Dialogs.module.css';

type PropsType = {
    title: string
}

export const Message: FC<PropsType> = ({title}) => <div className={styles.Message}>{title}</div>;