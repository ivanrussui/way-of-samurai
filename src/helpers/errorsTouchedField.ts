import styles from '../components/Common/TextForm/TextForm.module.css';

type ErrorsTouchedParams = {
    errors: string | undefined
    touched: boolean | undefined
}

export const errorsTouchedField = (params: ErrorsTouchedParams): string => {
    const {errors, touched} = params;
    return errors && touched ? styles.InputError : '';
};