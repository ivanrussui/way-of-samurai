import {ItemResponseType, UsersResponseType} from '../components/Users/UsersContainer';

export type UsersPageType = {
    users: UsersResponseType
    page: number
    count: number
    isFetching: boolean
}

const initialState: UsersPageType = {
    users: {
        items: [],
        totalCount: 0,
        error: ''
    },
    page: 100,
    count: 10,
    isFetching: false
};

export const usersReducer = (state: UsersPageType = initialState, action: ActionsUsersTypes): UsersPageType => {
    switch (action.type) {
        case 'FOLLOW-UNFOLLOW':
            return {
                ...state,
                users: {
                    ...state.users,
                    items: state.users.items
                        .map(el => el.id === action.useId ? {...el, followed: action.followed} : el)
                }
            };
        case 'SET-USERS':
            return {...state, users: {...state.users, items: action.items}};
        case 'SET-PAGE':
            return {...state, page: action.page};
        case 'SET-TOTAL-COUNT':
            return {...state, users: {...state.users, totalCount: action.totalCount}};
        case 'TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching};
        default:
            return state;
    }
};

export type ActionsUsersTypes =
    | ReturnType<typeof followUnfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setTotalCount>
    | ReturnType<typeof toggleIsFetching>

export const followUnfollow = (useId: number, followed: boolean) => ({
    type: 'FOLLOW-UNFOLLOW', useId, followed
} as const);
export const setUsers = (items: ItemResponseType[]) => ({
    type: 'SET-USERS', items
} as const);
export const setPage = (page: number) => ({
    type: 'SET-PAGE', page
} as const);
export const setTotalCount = (totalCount: number) => ({
    type: 'SET-TOTAL-COUNT', totalCount
} as const);
export const toggleIsFetching = (isFetching: boolean) => ({
    type: 'TOGGLE-IS-FETCHING', isFetching
} as const);
