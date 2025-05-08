import {ErrorMessage, Field, Form, Formik, FormikErrors} from 'formik';
import styles from '../../Common/TextForm/TextForm.module.css';
import React from 'react';
import {CheckboxCustom} from '../../Common/CheckboxCustom/CheckboxCustom';

type ValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

type LoginFormPropsType = {
    loginTC: (values: ValuesType) => void
    toggleIsFetchingLogin: (isFetchingLogin: boolean) => void
    captcha: null | string
    error: null | string
    setError: (error: string | null) => void
}

export const LoginForm = ({loginTC, toggleIsFetchingLogin, captcha, error, setError}: LoginFormPropsType) => {
    return <Formik
        initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}

        validate={values => {
            const errors: FormikErrors<ValuesType> = {};
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
        {({isSubmitting, values, handleChange}) => {
            const handleChangeWithCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
                setError(null); // зануляем ошибку из Redux
                handleChange(e); // стандартное поведение Field в Formik на onChange
            };
            return (
                <Form>
                    <div className={styles.Field}>
                        <Field id={'email'} name="email" type="email" placeholder={'Enter email'}
                               onChange={handleChangeWithCustom}/>
                        <label className={styles.Label} htmlFor="email">email</label>
                        <ErrorMessage name="email"
                                      component="div"
                                      className={styles.ErrorMessage}/>
                    </div>
                    <div className={styles.Field}>
                        <Field id={'password'} name="password" type="password" placeholder={'Enter password'}
                               onChange={handleChangeWithCustom}/>
                        <label className={styles.Label} htmlFor="password">password</label>
                        <ErrorMessage name="password"
                                      component="div"
                                      className={styles.ErrorMessage}/>
                    </div>
                    <div className={styles.Field}>
                        <CheckboxCustom rememberMe={values.rememberMe}/>
                    </div>
                    {error && <div className={`${styles.Error} ${styles.ErrorMessage} `}>{error}</div>}
                    {captcha && <div className={styles.Field}>
                        <img src={captcha} alt="captcha" className={styles.Captcha}/>
                        <Field id={'captcha'} name="captcha" type="captcha" placeholder={'Enter captcha'}/>
                        <ErrorMessage name="captcha"
                                      component="div"
                                      className={styles.ErrorMessage}/>
                    </div>}
                    <button type="submit" disabled={isSubmitting} className={styles.Button}>
                        {isSubmitting ? 'Sending...' : 'Submit'}
                    </button>
                </Form>
            );
        }}
    </Formik>;
};
