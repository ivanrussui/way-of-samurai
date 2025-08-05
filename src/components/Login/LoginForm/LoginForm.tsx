import {Form, Formik, FormikErrors} from 'formik';
import styles from '../../Common/TextForm/TextForm.module.css';
import React from 'react';
import {CheckboxCustom} from '../../Common/CheckboxCustom/CheckboxCustom';
import {CreateField} from '../../Common/CreateField/CreateField';
import {Button} from '../../Common/Button/Button';
import {errorsTouchedField} from '../../../helpers/errorsTouchedField';
import {LoginParamsType} from '../../../api/api';

type LoginFormPropsType = {
    loginTC: (values: LoginParamsType) => void
    toggleIsFetchingLogin: (isFetchingLogin: boolean) => void
    captcha: null | string
    error: null | string
    setError: (error: string | null) => void
}

export const LoginForm = ({loginTC, toggleIsFetchingLogin, captcha, error, setError}: LoginFormPropsType) => {
    return <Formik
        initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}

        validate={values => {
            const errors: FormikErrors<LoginParamsType> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 4) {
                errors.password = 'Must be 4 characters or more';
            }

            if (captcha) {
                if (!values.captcha) {
                    errors.captcha = 'Required';
                }
            }
            return errors;
        }}
        onSubmit={async (values, {setSubmitting}) => {
            toggleIsFetchingLogin(true);
            await loginTC(values);
            setSubmitting(false);
        }}
    >
        {({isSubmitting, values, handleChange, errors, touched}) => {
            const handleChangeWithCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
                setError(null); // зануляем ошибку из Redux
                handleChange(e); // стандартное поведение Field в Formik на onChange
            };
            return (
                <Form>
                    <CreateField name={'email'} onChange={handleChangeWithCustom}
                                 className={errorsTouchedField({errors: errors.email, touched: touched.email})}/>
                    <CreateField name={'password'} onChange={handleChangeWithCustom}
                                 className={errorsTouchedField({errors: errors.password, touched: touched.password})}/>
                    <div className={styles.Field}>
                        <CheckboxCustom rememberMe={values.rememberMe}/>
                    </div>
                    {error && <div className={`${styles.Error} ${styles.ErrorMessage} `}>{error}</div>}
                    {captcha &&
                        <CreateField name={'captcha'} captcha={captcha}
                                     className={errorsTouchedField({
                                         errors: errors.captcha,
                                         touched: touched.captcha
                                     })}/>
                    }
                    <Button name={isSubmitting ? 'Sending...' : 'Submit'} type={'submit'} disabled={isSubmitting}/>
                </Form>
            );
        }}
    </Formik>;
};
