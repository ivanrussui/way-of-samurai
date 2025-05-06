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
        case 'SET-AUTH':
            return {...state, data: {...action.data}, isAuth: true};
        case 'SET-AVATAR':
            return {...state, avatar: action.avatar};
        case 'TOGGLE-IS-FETCHING-LOGIN':
            return {...state, isFetchingLogin: action.isFetchingLogin};
        // case 'SET-IS-LOGGED-IN':
        // return {...state, isLoggedIn: action.isLoggedIn, isAuth: action.isAuth};
        case 'TOGGLE-IS-AUTH':
            return {...state, isAuth: action.isAuth};
        case 'GET-CAPTCHA':
            return {...state, captcha: action.captcha};
        case 'GET-ERROR':
            return {...state, error: action.error};
        default:
            return state;
    }
};

export type ActionsAuthTypes =
    | ReturnType<typeof setAuth>
    | SetAvatarACType
    | ReturnType<typeof toggleIsFetchingLogin>
    // | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof toggleIsAuth>
    | ReturnType<typeof getCaptcha>
    | ReturnType<typeof getError>

export type SetAvatarACType = ReturnType<typeof setAvatar>

export const setAuth = (data: DataType) => ({type: 'SET-AUTH', data}) as const;
export const setAvatar = (avatar: string) => ({type: 'SET-AVATAR', avatar}) as const;
export const toggleIsFetchingLogin = (isFetchingLogin: boolean) => ({
    type: 'TOGGLE-IS-FETCHING-LOGIN', isFetchingLogin
} as const);
// export const setIsLoggedIn = (isLoggedIn: boolean, isAuth: boolean) => ({
//     type: 'SET-IS-LOGGED-IN', isLoggedIn, isAuth
// } as const);
export const toggleIsAuth = (isAuth: boolean) => ({
    type: 'TOGGLE-IS-AUTH', isAuth
} as const);
export const getCaptcha = (captcha: null | string) => ({
    type: 'GET-CAPTCHA', captcha
} as const);
export const getError = (error: null | string) => ({
    type: 'GET-ERROR', error
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
// todo сделай тут обработку ошибки
        if (res.resultCode === 0) {
            dispatch(toggleIsAuth(true));
            dispatch(getCaptcha(null));
            dispatch(getError(null));
            // return res.data;
        } else {
            if (res.resultCode === 10) {
                // const captchaURL = await securityAPI.getCaptchaURL();
                // dispatch(getCaptcha(captchaURL.url));
                dispatch(getError(null));
                dispatch(getCaptchaURLTC());
                // console.log(captchaURL);
            }
            const error = (res.messages.length > 0) ? res.messages[0] : 'Some error';
            dispatch(getError(error));
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
// todo сделай тут обработку ошибки
};