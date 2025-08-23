import {ResponseType} from '../api/api';
import {Dispatch} from 'redux';
import {SetGlobalErrorACType} from '../state/app-reducer';
import {SetErrorACType} from '../state/auth-reducer';

type SetErrors = SetErrorACType | SetGlobalErrorACType
type ErrorActionCreator = (error: string | null) => SetErrors;

export const handleServerAppError = <T>(
    data: ResponseType<T>, dispatch: Dispatch<SetErrors>, actionCreator: ErrorActionCreator
) => {
    const error = (data.messages.length > 0) ? data.messages[0] : 'Some error';
    dispatch(actionCreator(error));
};
