import {useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../state/store-redux';
import {setGlobalError} from '../../../state/app-reducer';

export const GlobalError = () => {
    const globalError = useSelector<AppRootStateType, null | string>(state => state.app.globalError);
    const dispatch = useDispatch();

    useEffect(() => {
        if (globalError) {
            toast.error(globalError);
            dispatch(setGlobalError(null));
        }
    }, [dispatch, globalError]);

    return <ToastContainer theme="dark" autoClose={3000}/>;
};
