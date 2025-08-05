import React, {ChangeEvent} from 'react';
import styles from '../TextForm/TextForm.module.css';
import {ErrorMessage, Field, FieldProps} from 'formik';
import {tagIsInput} from '../../../helpers/tagIsInput';

type CreateFieldProps = {
    name: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    captcha?: string
    as?: string
    className?: string
    labelOn?: boolean
}

export const CreateField = ({name, as = 'input', className, ...props}: CreateFieldProps) => {
    const {onChange, captcha, labelOn = true} = props;
    const Tag = as === 'textarea' ? 'textarea' : 'input';
    const cleanName = name.split('.').pop() || name;

    return (
        <div className={styles.Field}>
            {captcha && <img src={captcha} alt="captcha" className={styles.Captcha}/>}
            <Field name={name}>
                {({field}: FieldProps) => (
                    <Tag
                        {...field}
                        id={name}
                        type={tagIsInput({tag: Tag, value: name})}
                        placeholder={tagIsInput({tag: Tag, value: `Enter ${cleanName}`})}
                        className={className}
                        onChange={(e) => {
                            field.onChange(e); // Стандартный обработчик Formik
                            if (Tag === 'input' && onChange) {
                                onChange(e as ChangeEvent<HTMLInputElement>); // Кастомный обработчик (если передан)
                            }
                        }}
                    />
                )}
            </Field>
            {!captcha && labelOn && <label className={styles.Label} htmlFor={name}>
                {tagIsInput({tag: Tag, value: name})}
            </label>}
            <ErrorMessage name={name}
                          component={'div'}
                          className={styles.ErrorMessage}/>
        </div>
    );
};
