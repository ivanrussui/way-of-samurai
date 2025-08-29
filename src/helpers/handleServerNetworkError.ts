import {Dispatch} from 'redux';
import {setGlobalError, SetGlobalErrorACType} from '../state/app-reducer';

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch<SetGlobalErrorACType>) => {
    dispatch(setGlobalError((e as Error).message));
};
