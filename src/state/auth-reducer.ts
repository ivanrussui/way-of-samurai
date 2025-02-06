import {authAPI, DataType, profileAPI} from '../api/api';
import {getProfileTC} from './profile-reducer';
import {ThunkActionType, ThunkDispatchType} from './store-redux';

export type AuthType = {
    data: null | DataType
    isAuth: boolean
    avatar: string
    isFetchingLogin: boolean
}

const initialState: AuthType = {
    data: null,
    isAuth: false,
    avatar: '',
    isFetchingLogin: true
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
        default:
            return state;
    }
};

export type ActionsAuthTypes =
    | ReturnType<typeof setAuth>
    | SetAvatarACType
    | ReturnType<typeof toggleIsFetchingLogin>

export type SetAvatarACType = ReturnType<typeof setAvatar>

export const setAuth = (data: DataType) => ({type: 'SET-AUTH', data}) as const;
export const setAvatar = (avatar: string) => ({type: 'SET-AVATAR', avatar}) as const;

export const toggleIsFetchingLogin = (isFetchingLogin: boolean) => ({
    type: 'TOGGLE-IS-FETCHING-LOGIN', isFetchingLogin
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