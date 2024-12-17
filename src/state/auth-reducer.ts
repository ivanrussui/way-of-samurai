import {DataType} from '../components/Header/HeaderContainer';

export type AuthType = {
    data: null | DataType
    isAuth: boolean
}

const initialState: AuthType = {
    data: null,
    isAuth: false
};

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsAuthTypes): InitialStateType => {
    switch (action.type) {
        case 'SET-AUTH':
            return {
                ...state, data: {...action.data}, isAuth: true
            };
        default:
            return state;
    }
};

export type ActionsAuthTypes = ReturnType<typeof setAuth>

export const setAuth = (data: DataType) => ({type: 'SET-AUTH', data}) as const;
