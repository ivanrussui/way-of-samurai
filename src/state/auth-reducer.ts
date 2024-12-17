import {DataType} from '../components/Header/HeaderContainer';

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
    isFetchingLogin: false
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
    | ReturnType<typeof setAvatar>
    | ReturnType<typeof toggleIsFetchingLogin>

export const setAuth = (data: DataType) => ({type: 'SET-AUTH', data}) as const;
export const setAvatar = (avatar: string) => ({type: 'SET-AVATAR', avatar}) as const;
export const toggleIsFetchingLogin = (isFetchingLogin: boolean) => ({
    type: 'TOGGLE-IS-FETCHING-LOGIN', isFetchingLogin
} as const);
