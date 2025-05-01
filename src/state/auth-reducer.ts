import {authAPI, DataType, LoginParamsType} from '../api/api';
import {getProfileTC} from './profile-reducer';
import {ThunkActionType, ThunkDispatchType} from './store-redux';

export type AuthType = {
    data: null | DataType
    isAuth: boolean
    avatar: string
    isFetchingLogin: boolean
    // isLoggedIn: boolean
}

const initialState: AuthType = {
    data: null,
    isAuth: false,
    avatar: '',
    isFetchingLogin: true,
    // isLoggedIn: false
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
            // return {...state, isLoggedIn: action.isLoggedIn, isAuth: action.isAuth}; // todo isAuth: action.isAuth тут временный костыль
        case 'TOGGLE-IS-AUTH':
            return {...state, isAuth: action.isAuth};
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

// Promise
// export const getAuthTC = (): ThunkActionType => (dispatch: ThunkDispatchType) => {
//     const isAuth = true;
//     authAPI.getAuth()
//         .then((data) => {
//             if (data.resultCode === 0) {
//                 dispatch(setAuth(data.data));
//                 dispatch(getProfileTC(data.data.id, isAuth));
//             }
//         })
//         .catch(e => console.error((e as Error).message))
//         .finally(() => {
//             dispatch(toggleIsFetchingLogin(false));
//         });
// };

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
    try {
        const res = await authAPI.login(loginParams);
        if (res.resultCode === 0) {
            dispatch(toggleIsAuth(true))
            // dispatch(setAuth(res.data))
            // dispatch(setIsLoggedIn(true, true));
        }
        return res.data;
        // todo делай тут запрос за профилем в хэдэре наверное как выше/это не точно)
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
            dispatch(toggleIsAuth(false))
            // dispatch(setIsLoggedIn(false, false));
        }
    } catch (e) {
        console.error((e as Error).message);
    } finally {
        dispatch(toggleIsFetchingLogin(false));
    }
}