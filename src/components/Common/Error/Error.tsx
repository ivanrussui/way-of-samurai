import styles from './Error.module.css';
import React from 'react';

type ErrorPropsType = {
    error: null | string
}

export const Error = ({error}: ErrorPropsType) => {
  return <div className={`${styles.Error} ${styles.ErrorMessage}`}>{error}</div>
}