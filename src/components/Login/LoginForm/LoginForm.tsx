import {ErrorMessage, Field, Form, Formik, FormikErrors} from 'formik';
import styles from '../../Common/TextForm/TextForm.module.css';
import React from 'react';
import {CheckboxCustom} from '../../Common/CheckboxCustom/CheckboxCustom';

type ValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginFormPropsType = {
    loginTC: (values: ValuesType) => void
    toggleIsFetchingLogin: (isFetchingLogin: boolean) => void

}

export const LoginForm = ({loginTC, toggleIsFetchingLogin}: LoginFormPropsType) => {
    return <Formik
        initialValues={{email: '', password: '', rememberMe: false}}
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
            return errors;
        }}
        onSubmit={async (values, {setSubmitting, resetForm}) => {
            // dispatch(toggleIsFetchingLogin(true))
            toggleIsFetchingLogin(true);

            // const res = await dispatch(loginTC(values));
           const res = await loginTC(values);

            // console.log(res);
            setSubmitting(false);

            // @ts-ignore
            // if (res) {
            //     resetForm();
            // }

        }}
    >
        {({isSubmitting, values}) => (
            <Form>
                <div className={styles.Field}>
                    <Field id={'email'} name="email" type="email"/>
                    <label className={styles.Label} htmlFor="email">email</label>
                    <ErrorMessage
                        name="email"
                        component="div"
                        className={styles.ErrorMessage}
                    />
                </div>
                <div className={styles.Field} >
                    <Field id={'password'} name="password" type="password"/>
                    <label className={styles.Label} htmlFor="password">password</label>
                    <ErrorMessage name="password"
                                  component="div"
                                  className={styles.ErrorMessage}
                    />
                </div>
                <div className={styles.Field} >
                    <CheckboxCustom rememberMe={values.rememberMe}/>
                </div>
                <button type="submit" disabled={isSubmitting} className={styles.Button}>
                    {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
            </Form>
        )}
    </Formik>
}
