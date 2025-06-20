import React from 'react';
import {Form, Formik, FormikErrors} from 'formik';
import {Button} from '../Button/Button';
import {CreateField} from '../CreateField/CreateField';
import {errorsTouchedField} from '../../../helpers/errorsTouchedField';

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
                <CreateField name={'text'} as={'textarea'}
                             className={errorsTouchedField({errors: errors.text, touched: touched.text})}/>
                <Button type="submit" name={buttonText}/>
            </Form>
        )}
    </Formik>;
};
