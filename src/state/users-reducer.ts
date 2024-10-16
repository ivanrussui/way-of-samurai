// не вижу смысла выносить в константы тк TS в case тогда не подсказывает
// const FOLLOW_UNFOLLOW = 'FOLLOW-UNFOLLOW';
// const SET_USERS = 'SET-USERS';

export type UserType = {
    id: number
    name: string
    status: string
    photos: {
        small: string,
        large: string
    }
    followed: boolean
}

export type UsersPageType = {
    users: UserType[]
}

const initialState: UsersPageType = {
    users: [
        // {
        //     id: 1,
        //     name: 'Ivan',
        //     status: 'JS Forever',
        //     photos: {
        //         small: '',
        //         large: ''
        //     },
        //     followed: true
        // },
        // {
        //     id: 2,
        //     name: 'Anna',
        //     status: 'JS Forever',
        //     photos: {
        //         small: '',
        //         large: ''
        //     },
        //     followed: false
        // }
    ],
};

export const usersReducer = (state: UsersPageType = initialState, action: ActionsUsersTypes): UsersPageType => {
    switch (action.type) {
        case 'FOLLOW-UNFOLLOW':
            return {
                ...state,
                users: state.users.map(el => el.id === action.useId ? {...el, followed: action.followed} : el)
            };
        case 'SET-USERS':
            return {...state, users: [...state.users, ...action.users]};
        default:
            return state;
    }
};

export type ActionsUsersTypes = ReturnType<typeof followUnfollowAC> | ReturnType<typeof setUsersAC>

export const followUnfollowAC = (useId: number, followed: boolean) => ({
    type: 'FOLLOW-UNFOLLOW', useId, followed
} as const);
export const setUsersAC = (users: UserType[]) => ({
    type: 'SET-USERS', users: users
} as const);
