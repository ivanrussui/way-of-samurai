import {ThunkActionType, ThunkDispatchType} from './store-redux';
import {getAuthTC} from './auth-reducer';
import {handleServerNetworkError} from '../helpers/handleServerNetworkError';

export type AppType = {
    isInitialized: boolean
    globalError: null | string
}

const initialState: AppType = {
    isInitialized: false,
    globalError: null
};

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsAuthTypes): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized};
        case 'APP/SET-GLOBAL-ERROR':
            return {...state, globalError: action.globalError};
        default:
            return state;
    }
};

export type ActionsAuthTypes = | ReturnType<typeof setInitialized> | SetGlobalErrorACType;
export type SetGlobalErrorACType = ReturnType<typeof setGlobalError>

export const setInitialized = (isInitialized: boolean) =>
    ({type: 'APP/SET-INITIALIZED', isInitialized}) as const;
export const setGlobalError = (globalError: string | null) =>
    ({type: 'APP/SET-GLOBAL-ERROR', globalError}) as const;


export const setInitializedTC = (): ThunkActionType => (dispatch: ThunkDispatchType) => {
    try {
        dispatch(getAuthTC);
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setInitialized(true));
    }
};
