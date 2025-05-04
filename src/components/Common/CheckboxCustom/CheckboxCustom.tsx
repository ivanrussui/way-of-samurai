import React from 'react';
import {Field} from 'formik'
import styles from './CheckboxCustom.module.css';

export const CheckboxCustom = ({rememberMe}: {rememberMe: boolean}) => {
    return (
        <label className={styles.CheckboxContainer}>
            <Field type="checkbox" name="rememberMe"/>
            <span className={styles.CheckboxCustom}/>
            {rememberMe ? 'You were remembered' : 'Remember me'}
        </label>
    );
};
