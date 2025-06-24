import {authAPI, DataType, LoginParamsType, securityAPI} from '../api/api';
import {getProfileTC} from './profile-reducer';
import {ThunkActionType, ThunkDispatchType} from './store-redux';

export type AuthType = {
    data: null | DataType
    isAuth: boolean
    avatar: string
    isFetchingLogin: boolean
    captcha: null | string
    error: null | string
}

const initialState: AuthType = {
    data: null,
    isAuth: false,
    avatar: '',
    isFetchingLogin: true,
    captcha: null,
    error: null
};

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsAuthTypes): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-AUTH':
            return {...state, data: {...action.data}, isAuth: true};
        case 'AUTH/SET-AVATAR':
            return {...state, avatar: action.avatar};
        case 'AUTH/TOGGLE-IS-FETCHING-LOGIN':
            return {...state, isFetchingLogin: action.isFetchingLogin};
        case 'AUTH/TOGGLE-IS-AUTH':
            return {...state, isAuth: action.isAuth};
        case 'AUTH/GET-CAPTCHA':
            return {...state, captcha: action.captcha};
        case 'AUTH/SET-ERROR':
            return {...state, error: action.error};
        default:
            return state;
    }
};

export type ActionsAuthTypes =
    | ReturnType<typeof setAuth>
    | SetAvatarACType
    | ReturnType<typeof toggleIsFetchingLogin>
    | ReturnType<typeof toggleIsAuth>
    | ReturnType<typeof getCaptcha>
    | ReturnType<typeof setError>

export type SetAvatarACType = ReturnType<typeof setAvatar>

export const setAuth = (data: DataType) => ({
    type: 'AUTH/SET-AUTH', data
}) as const;
export const setAvatar = (avatar: string) => ({
    type: 'AUTH/SET-AVATAR', avatar
}) as const;
export const toggleIsFetchingLogin = (isFetchingLogin: boolean) => ({
    type: 'AUTH/TOGGLE-IS-FETCHING-LOGIN', isFetchingLogin
} as const);
export const toggleIsAuth = (isAuth: boolean) => ({
    type: 'AUTH/TOGGLE-IS-AUTH', isAuth
} as const);
export const getCaptcha = (captcha: null | string) => ({
    type: 'AUTH/GET-CAPTCHA', captcha
} as const);
export const setError = (error: null | string) => ({
    type: 'AUTH/SET-ERROR', error
} as const);

// async await
export const getAuthTC = (): ThunkActionType => async (dispatch: ThunkDispatchType) => {
    const isAuth = true;
    try {
        const data = await authAPI.getAuth();
        if (data.resultCode === 0) {
            dispatch(setAuth(data.data));
            dispatch(getProfileTC(data.data.id, isAuth));
        }
    } catch (e) {
        console.error((e as Error).message);
    } finally {
        dispatch(toggleIsFetchingLogin(false));
    }
};

export const loginTC = (loginParams: LoginParamsType): ThunkActionType => async (dispatch: ThunkDispatchType) => {
    dispatch(toggleIsFetchingLogin(true));
    try {
        const res = await authAPI.login(loginParams);
        if (res.resultCode === 0) {
            dispatch(toggleIsAuth(true));
            dispatch(getCaptcha(null));
            dispatch(setError(null));
        } else {
            if (res.resultCode === 10) {
                dispatch(setError(null));
                dispatch(getCaptchaURLTC());
            }
            const error = (res.messages.length > 0) ? res.messages[0] : 'Some error';
            dispatch(setError(error));
        }
    } catch (e) {
        console.error((e as Error).message);
    } finally {
        dispatch(toggleIsFetchingLogin(false));
    }
};

export const logoutTC = (): ThunkActionType => async (dispatch: ThunkDispatchType) => {
    try {
        const res = await authAPI.logout();
        if (res.resultCode === 0) {
            dispatch(toggleIsAuth(false));
        }
    } catch (e) {
        console.error((e as Error).message);
    } finally {
        dispatch(toggleIsFetchingLogin(false));
    }
};

export const getCaptchaURLTC = (): ThunkActionType => async (dispatch: ThunkDispatchType) => {
    const captchaURL = await securityAPI.getCaptchaURL();
    dispatch(getCaptcha(captchaURL.url));
};