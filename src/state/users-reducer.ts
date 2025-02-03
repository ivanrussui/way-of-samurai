import {ItemResponseType, UsersResponseType} from '../api/api';

export type UsersPageType = {
    users: UsersResponseType
    page: number
    count: number
    isFetching: boolean
    followingInProgress: number[]
}

const initialState: UsersPageType = {
    users: {
        items: [],
        totalCount: 0,
        error: ''
    },
    page: 1,
    count: 10,
    isFetching: false,
    followingInProgress: []
};

export const usersReducer = (state: UsersPageType = initialState, action: ActionsUsersTypes): UsersPageType => {
    switch (action.type) {
        case 'FOLLOW-UNFOLLOW':
            return {
                ...state, users: {
                    ...state.users, items: state.users.items
                        .map(el => el.id === action.useId ? {...el, followed: action.followed} : el)
                }
            };
        case 'SET-USERS':
            // return {...state, users: {...state.users, items: action.items}};
            return { // добавил каждому isFetchingUser для Preloader, теперь похоже и для disabled
                ...state, users: {
                    ...state.users, items: action.items.map(el => ({...el, isFetchingUser: false}))
                }
            };
        case 'SET-PAGE':
            return {...state, page: action.page};
        case 'SET-TOTAL-COUNT':
            return {...state, users: {...state.users, totalCount: action.totalCount}};
        case 'TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching};

        // 'TOGGLE-IS-FETCHING-USER' у каждого юзера преобразованы данные, добавлено поле isFetchingUser
        // тут реализовано 2 поведения при клике на follow\unfollow
        // 1 я делал прелоадер и ставил его при изменении isFetchingUser
        // 2 дизэйбл кнопки при изменении isFetchingUser
        case 'TOGGLE-IS-FETCHING-USER':
            return { // добавил каждому isFetchingUser для Preloader, теперь похоже и для disabled
                ...state, users: {
                    ...state.users, items: state.users.items
                        .map(el => el.id === action.useId ? {...el, isFetchingUser: action.isFetchingUser} : el)
                }
            };
        // 'TOGGLE-FOLLOWING-IN-PROGRESS' это альтернатива 'TOGGLE-IS-FETCHING-USER'
        // тут реализован дизейбл кнопки, но уже через добавление useId в массив followingInProgress
        // альтернатива преобразования данных у юзера как в 'TOGGLE-IS-FETCHING-USER'
        case 'TOGGLE-FOLLOWING-IN-PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.useId]
                    : state.followingInProgress.filter(el => el !== action.useId)
            };
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
    | ReturnType<typeof toggleIsFetchingUser>
    | ReturnType<typeof toggleFollowingInProgress>

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
export const toggleIsFetchingUser = (useId: number, isFetchingUser: boolean) => ({
    type: 'TOGGLE-IS-FETCHING-USER', useId, isFetchingUser
} as const);
export const toggleFollowingInProgress = (useId: number, isFetching: boolean) => ({
    type: 'TOGGLE-FOLLOWING-IN-PROGRESS', useId, isFetching
} as const);
