import React, {FC} from 'react';
import styles from '../Dialogs.module.css';

export type MessageType = {
    title: string
}

export const Message: FC<MessageType> = ({title}) => <div className={styles.Message}>{title}</div>;