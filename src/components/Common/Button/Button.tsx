import React from 'react';
import styles from './Button.module.css';

type PropsType = {
    name: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    onClick?: () => void
}

export const Button = ({name, type, onClick, disabled}: PropsType) => {
    return (
        <button type={type} disabled={disabled} className={styles.Button} onClick={onClick}>{name}</button>
    );
};

