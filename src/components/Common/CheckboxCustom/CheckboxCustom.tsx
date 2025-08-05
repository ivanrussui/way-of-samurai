import React from 'react';
import {Field, FieldProps} from 'formik';
import styles from './CheckboxCustom.module.css';

type CheckboxCustomPropsType = {
    name: string; // имя поля Formik обязательное
    rememberMe?: boolean; // необязательный текст или индикатор
};

export const CheckboxCustom = ({ name, rememberMe }: CheckboxCustomPropsType) => {
    return (
        <label className={styles.CheckboxContainer}>
            <Field name={name}>
                {({ field }: FieldProps) => (
                    <>
                        <input
                            type="checkbox"
                            {...field}
                            checked={!!field.value} // бинарное значение для безопасности
                            onChange={field.onChange}
                        />
                        <span className={styles.CheckboxCustom} />
                        {rememberMe !== undefined && (
                            <span>{rememberMe ? 'You were remembered' : 'Remember me'}</span>
                        )}
                    </>
                )}
            </Field>
        </label>
    );
};
