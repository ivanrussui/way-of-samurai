export type ItemType = {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}

export type UsersPageType = {
    users: {
        items: ItemType[]
        totalCount: number
        error: string
    }
    page: number
    count: number
}

const initialState: UsersPageType = {
    users: {
        items: [],
        totalCount: 0,
        error: ''
    },
    page: 1,
    count: 3,
};

export const usersReducer = (state: UsersPageType = initialState, action: ActionsUsersTypes): UsersPageType => {
    switch (action.type) {
        case 'FOLLOW-UNFOLLOW':
            return {...state,
                users: {...state.users,
                    items: state.users.items
                        .map(el => el.id === action.useId ? {...el, followed: action.followed} : el)}};
        case 'SET-USERS':
            return {...state, users: {...state.users, items: action.items}};
        case 'SET-PAGE':
            return {...state, page: action.page};
        case 'SET-TOTAL-COUNT':
            return {...state, users: {...state.users, totalCount: action.totalCount}};
        default:
            return state;
    }
};

export type ActionsUsersTypes = ReturnType<typeof followUnfollowAC> | ReturnType<typeof setUsersAC> |
    ReturnType<typeof setPageAC> | ReturnType<typeof setTotalCountAC>

export const followUnfollowAC = (useId: number, followed: boolean) => ({
    type: 'FOLLOW-UNFOLLOW', useId, followed
} as const);
export const setUsersAC = (items: ItemType[]) => ({
    type: 'SET-USERS', items
} as const);
export const setPageAC = (page: number) => ({
    type: 'SET-PAGE', page
} as const);
export const setTotalCountAC = (totalCount: number) => ({
    type: 'SET-TOTAL-COUNT', totalCount
} as const);
