import React from 'react';
import {ErrorMessage, Field, Form, Formik, FormikErrors} from 'formik';
import styles from './TextForm.module.css';

type TextareaFormType = {
    onClick: (text: string) => void
    buttonText: string
}

export const TextForm = ({onClick, buttonText}: TextareaFormType) => {
    return <Formik initialValues={{text: ''}}
                   validate={values => {
                       const errors: FormikErrors<{ text: string }> = {};
                       if (!values.text) {
                           errors.text = 'Required';
                       } else if (values.text.length < 1) {
                           errors.text = 'Must be 1 characters or more';
                       }
                       return errors;
                   }}
                   onSubmit={(values, {resetForm}) => {
                       if (values.text) {
                           onClick(values.text);
                           resetForm();
                       }
                   }}
    >
        {({errors, touched}) => (
            <Form>
                <div className={styles.Field}>
                    <Field id={'text'} name="text" as={'textarea'}
                           className={errors.text && touched.text ? styles.InputError : ''}/>
                    <ErrorMessage
                        name="text"
                        component="div"
                        className={styles.ErrorMessage}
                    />
                </div>
                <button type="submit" className={styles.Button}>{buttonText}</button>
            </Form>
        )}
    </Formik>;
};
